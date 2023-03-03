import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { setParameter } from '../buildparams';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Subject } from 'rxjs';

import { Pretask } from '../../_models/pretask';

@Injectable({
  providedIn: 'root'
})
export class PreTasksService {

  private endpoint = environment.config.prodApiEndpoint + '/ui/pretasks';
  startedEditing = new Subject<number>();

  constructor(private http: HttpClient) { }

  getAllPretasks(routerParams?: Params):Observable<any> {
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

  getPretask(id:number) {
    return this.http.get(this.endpoint +'/'+ id)
    .pipe(
      tap(data => console.log('All: ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  deletePretask(id:number):Observable<any> {
    return this.http.delete(this.endpoint +'/'+ id)
    .pipe(
      catchError(this.handleError)
    );
  }

  createPretask(arr: any): Observable<any> {
    return this.http.post<any>(this.endpoint, arr)
    .pipe(
      tap(data => console.log('All: ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  updatePretask(id: number, arr: any): Observable<any> {
    return this.http.patch<number>(this.endpoint + '/' + id, arr)
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
