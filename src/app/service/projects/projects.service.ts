import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap} from 'rxjs/operators';
import { map, Observable, throwError } from 'rxjs';
import { Configuration } from '../configuration';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private endpoint = Configuration.BASE_URL + '/projects';
  private endpoint_project = Configuration.BASE_URL + '/projects';  // its for testing using nested json array
  private accessKey = Configuration.ACCESS_KEY;

  constructor(private http: HttpClient) { }

  private handleError ( err : HttpErrorResponse ) {
    if (err.error instanceof ErrorEvent){
      console.log('Client Side Error: ', err.error.message);
    }else{
      console.log('Server Side Error: ', err);
    }
    return throwError(() => err);
  }

  projects():Observable<any> {
    return this.http.get(this.endpoint)
    .pipe(
      tap(data => console.log('All: ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getProject(id: number):Observable<any> {
    // return this.http.get(`${this.endpoint_user}/${id}`)  // We need this for the API
    return this.http.get(this.endpoint_project)
    .pipe(
      tap(data => console.log('All: ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }


}