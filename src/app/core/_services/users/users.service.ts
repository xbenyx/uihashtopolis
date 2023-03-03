import { HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { catchError, tap} from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { setParameter } from '../buildparams';
import { Params } from '@angular/router';

import { CreateUser } from '../../_models/user.model';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  private endpoint = environment.config.prodApiEndpoint + '/ui/users';

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
    ) { }

  getAllusers(routerParams?: Params):Observable<any> {
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

  getUser(id: number):Observable<any> {
    return this.http.get(`${this.endpoint}/${id}`)
    .pipe(
      tap(data => console.log('All: ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getCurrentUserID():Observable<any> {
    const user_id = isPlatformBrowser(this.platformId)
      ? JSON.parse(localStorage.getItem('userData'))._username //Change username for id
      : null;
    let queryParams: Params = {'filter': 'username='+user_id+''}; // Temporary until we get id
    return this.http.get(this.endpoint, {params: queryParams})
    .pipe(
      tap(data => console.log('All: ',JSON.stringify(data))),
    );
  }

  createUser(arr: any): Observable<any> {
    return this.http.post<any>(this.endpoint, arr)
    .pipe(
      tap(data => console.log('All: ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  updateUser(arr: any, id?: number): Observable<any> {
    return this.http.patch<number>(this.endpoint + '/' + id, arr)
    .pipe(
      tap(data => console.log('All: ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  deleteUser(id: number):Observable<any> {
    return this.http.delete(this.endpoint +'/'+ id)
    .pipe(
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
