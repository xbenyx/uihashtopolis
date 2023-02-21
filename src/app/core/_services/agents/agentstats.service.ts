import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Params } from '@angular/router';
import { Observable, tap, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgentStatService {

  private endpoint = environment.config.prodApiEndpoint + '/ui/agentstats';

  constructor(private http: HttpClient) { }

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
