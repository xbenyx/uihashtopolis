import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { Observable, tap, catchError, throwError } from 'rxjs';

import { Configuration } from './configuration';
import { Hashtype } from '../models/hashtype';
import { faAudioDescription } from '@fortawesome/free-solid-svg-icons';

@Injectable({
  providedIn: 'root'
})
export class HashtypeService {

  private endpoint = Configuration.BASE_URL_APIV1 + '/ui/hashtypes';

  constructor(private http: HttpClient) { }

  private handleError ( err : HttpErrorResponse ) {
    if (err.error instanceof ErrorEvent){
      console.log('Client Side Error: ', err.error.message);
    }else{
      console.log('Server Side Error: ', err);
    }
    return throwError(() => err);
  }

  getHashTypes(): Observable<Hashtype[]> {
    return this.http.get<Hashtype[]>(this.endpoint,{params: new HttpParams().set('maxResults', 3000)})
    .pipe(
      tap(data => console.log('All: ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  deleteHashType(id:number):Observable<any> {
    return this.http.delete(this.endpoint +'/'+ id)
    .pipe(
      catchError(this.handleError)
    );
  }

  createHashType(hash: any): Observable<Hashtype[]> {
    return this.http.post<any>(this.endpoint, {hashTypeId: +hash.hashTypeId, description: hash.description, isSalted: hash.isSalted, isSlowHash: hash.isSlowHash}) //HashtypeId only supports integer
    .pipe(
      tap(data => console.log('All: ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

}

