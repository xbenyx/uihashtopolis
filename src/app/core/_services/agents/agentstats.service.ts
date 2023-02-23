import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Params } from '@angular/router';
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
        queryParams = this.setParameter(routerParams);
    }
    return this.http.get(this.endpoint, {params: queryParams})
    .pipe(
      tap(data => console.log('All: ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

/**
 * Return agent stats
 * @param routerParams
 * @returns
**/

public userSubject: Subject<string> = new Subject();

 getAgentTimeout(){
  let params = {'maxResults': this.maxResults};
  return this.configService.getAllconfig(params).pipe(take(1)).subscribe()

  // this.configService.getAllconfig(params).subscribe((result)=>{
  //   this.userSubject.next(result.values.find(obj => obj.item === 'agenttimeout').value);
  // });
  }


  private handleError ( err : HttpErrorResponse ) {
    if (err.error instanceof ErrorEvent){
      console.log('Client Side Error: ', err.error.message);
    }else{
      console.log('Server Side Error: ', err);
    }
    return throwError(() => err);
  }

  private setParameter(routerParams: Params): HttpParams {
    let queryParams = new HttpParams();
    for (const key in routerParams) {
        if (routerParams.hasOwnProperty(key)) {
            queryParams = queryParams.set(key, routerParams[key]);
        }
    }
    return queryParams;
  }


}
