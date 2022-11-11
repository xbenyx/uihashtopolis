import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { catchError, tap} from 'rxjs/operators';
import { map, Observable, throwError } from 'rxjs';
import { Configuration } from '../configuration';
import { CreateUser } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  private endpoint = Configuration.BASE_URL_APIV1;

  constructor(private http: HttpClient) { }

  private handleError ( err : HttpErrorResponse ) {
    if (err.error instanceof ErrorEvent){
      console.log('Client Side Error: ', err.error.message);
    }else{
      console.log('Server Side Error: ', err);
    }
    return throwError(() => err);
  }

  getAllusers():Observable<any> {
    return this.http.get(this.endpoint +  '/ui/users')
    .pipe(
      tap(data => console.log('All: ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getUser(id: number):Observable<any> {
    return this.http.get(`${this.endpoint + '/ui/users'}/${id}`)
    .pipe(
      tap(data => console.log('All: ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  createUser(user: CreateUser): Observable<any> {
    return this.http.post<any>(this.endpoint + '/ui/users', user)
    .pipe(
      tap(data => console.log('All: ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }


}
