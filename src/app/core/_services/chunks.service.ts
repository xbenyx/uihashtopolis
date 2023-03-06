import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { setParameter } from './buildparams';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable, tap } from 'rxjs';

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
        queryParams = setParameter(routerParams);
    }
    return this.http.get<BaseChunk[]>(this.endpoint,{params: routerParams})
    .pipe(
      tap(data => console.log('All: ', JSON.stringify(data)))
    );
  }

  getChunk(id: number):Observable<any> {
    return this.http.get(`${this.endpoint}/${id}`)
    .pipe(
      tap(data => console.log('All: ', JSON.stringify(data)))
    );
  }

  updateChunk(arr: any): Observable<any> {
    console.log(arr);
    return this.http.patch<number>(this.endpoint + '/' + arr.hashTypeId, arr)
    .pipe(
      tap(data => console.log('All: ', JSON.stringify(data)))
    );
  }

}

