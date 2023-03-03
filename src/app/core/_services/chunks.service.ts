import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Params } from '@angular/router';

import { Observable, tap, catchError, throwError } from 'rxjs';

import { environment } from './../../../environments/environment';
import { BaseChunk } from '../_models/chunk';


@Injectable({
  providedIn: 'root'
})
export class ChunkService {

  private endpoint = environment.config.prodApiEndpoint + '/ui/chunks';

  constructor(private http: HttpClient) { }

  getChunks(routerParams?: Params): Observable<BaseChunk[]> {
    let queryParams: Params = {};
    if (routerParams) {
        queryParams = this.setParameter(routerParams);
    }
    return this.http.get<BaseChunk[]>(this.endpoint,{params: routerParams})
    .pipe(
      tap(data => console.log('All: ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getChunk(id: number):Observable<any> {
    return this.http.get(`${this.endpoint}/${id}`)
    .pipe(
      tap(data => console.log('All: ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  updateChunk(arr: any): Observable<any> {
    console.log(arr);
    return this.http.patch<number>(this.endpoint + '/' + arr.hashTypeId, arr)
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

