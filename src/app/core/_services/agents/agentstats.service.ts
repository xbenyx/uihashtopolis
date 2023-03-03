import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Params } from '@angular/router';
import { setParameter } from '../buildparams';
import { Observable, tap, catchError, throwError, Subject, take } from 'rxjs';

import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class AgentStatService {

  private endpoint = environment.config.prodApiEndpoint + '/ui/agentstats';
  private maxResults = environment.config.prodApiMaxResults;

  constructor(
    private http: HttpClient,
    private configService:ConfigService
    ) { }

/**
 * Returns all the agent stats
 * @param routerParams - to include multiple options such as Max number or results or filtering
 * @returns Raw Object
**/

  getAstats(routerParams?: Params):Observable<any> {
    let queryParams: Params = {};
    if (routerParams) {
        queryParams = setParameter(routerParams);
    }
    return this.http.get(this.endpoint, {params: queryParams})
    .pipe(
      tap(data => console.log('All: ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  private handleError ( err : HttpErrorResponse ) {
    if (err.error instanceof ErrorEvent){
      console.log('Client Side Error: ', err.error.message);
    }else{
      console.log('Server Side Error: ', err);
    }
    return throwError(() => err);
  }

}
