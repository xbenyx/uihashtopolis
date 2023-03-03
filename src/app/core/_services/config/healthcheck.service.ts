import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { catchError, tap} from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { setParameter } from '../buildparams';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';

import { HealthCheck, HealthCheckedAgents } from '../../_models/healthcheck';

@Injectable({
  providedIn: 'root'
})
export class HealthcheckService {

  private endpoint = environment.config.prodApiEndpoint;

  constructor(private http: HttpClient) { }

  getHealthChecks(routerParams?: Params):Observable<any> {
    let queryParams: Params = {};
    if (routerParams) {
        queryParams = setParameter(routerParams);
    }
    return this.http.get(this.endpoint + '/ui/healthchecks', {params: queryParams})
    .pipe(
      tap(data => console.log('All: ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getHealthCheck(id: number):Observable<any> {
    return this.http.get(`${this.endpoint + '/ui/healthchecks'}/${id}`)
    .pipe(
      tap(data => console.log('All: ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getHealthCheckedAgents(id: number):Observable<any> {
    return this.http.get(`${this.endpoint + '/ui/healthcheckagents'}/${id}`)
    .pipe(
      tap(data => console.log('All: ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  deleteHealthCheck(id: number):Observable<any> {
    return this.http.delete(this.endpoint + '/ui/healthchecks' +'/'+ id)
    .pipe(
      catchError(this.handleError)
    );
  }

  createHealthCheck(arr: any): Observable<HealthCheck[]> {
    return this.http.post<any>(this.endpoint + '/ui/healthchecks', {checkType: +arr.checkType, hashtypeId: +arr.hashtypeId, crackerBinaryId: +arr.crackerBinaryId})
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
