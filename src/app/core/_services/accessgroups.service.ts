import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { Observable, tap, catchError, throwError } from 'rxjs';

import { AccessGroup } from '../_models/access-group';
import { DEFAULT_CONFIG } from '../../../config/default/app/main';

@Injectable({
  providedIn: 'root'
})
export class AccessGroupsService {

  private endpoint = DEFAULT_CONFIG.prodApiEndpoint + '/ui/accessgroups';

  constructor(private http: HttpClient) { }

  private handleError ( err : HttpErrorResponse ) {
    if (err.error instanceof ErrorEvent){
      console.log('Client Side Error: ', err.error.message);
    }else{
      console.log('Server Side Error: ', err);
    }
    return throwError(() => err);
  }

  getAccessGroups(): Observable<AccessGroup[]> {
    return this.http.get<AccessGroup[]>(this.endpoint,{params: new HttpParams().set('maxResults', 3000)})
    .pipe(
      tap(data => console.log('All: ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  deleteAccessGroups(id: number):Observable<any> {
    return this.http.delete(this.endpoint +'/'+ id)
    .pipe(
      catchError(this.handleError)
    );
  }

  createAccessGroups(item: any): Observable<AccessGroup[]> {
    return this.http.post<any>(this.endpoint, item)
    .pipe(
      tap(data => console.log('All: ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  updateAccessGroups(item: any): Observable<any> {
    return this.http.patch<number>(this.endpoint + '/' + item.accessGroupId, {groupName: item.groupName})
    .pipe(
      tap(data => console.log('All: ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

}

