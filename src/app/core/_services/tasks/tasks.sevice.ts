import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { Configuration } from '../configuration';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  // private endpoint = Configuration.BASE_URL_APIV1 + '/ui/tasks';
  private endpoint = Configuration.BASE_URL + '/tasks';

  constructor(private http: HttpClient) { }

  private handleError ( err : HttpErrorResponse ) {
    if (err.error instanceof ErrorEvent){
      console.log('Client Side Error: ', err.error.message);
    }else{
      console.log('Server Side Error: ', err);
    }
    return throwError(() => err);
  }

  getAlltasks():Observable<any> {
    return this.http.get(this.endpoint ,{params: new HttpParams().set('maxResults', 100)})
    .pipe(
      tap(data => console.log('All: ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getTask(id:number):Observable<any> {
    return this.http.get(this.endpoint +'/'+ id)
    .pipe(
      tap(data => console.log('All: ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  deleteTask(id:number):Observable<any> {
    return this.http.delete(this.endpoint +'/'+ id)
    .pipe(
      catchError(this.handleError)
    );
  }

  createTask(user: any): Observable<any> {
    return this.http.post<any>(this.endpoint, user)
    .pipe(
      tap(data => console.log('All: ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

}
