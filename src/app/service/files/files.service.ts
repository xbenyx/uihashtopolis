import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from 'rxjs/operators';
import { Configuration } from '../configuration';
import { Observable, throwError } from 'rxjs';
import { Router } from "@angular/router";

@Injectable({providedIn: 'root'})
export class FilesService {

  private endpoint = Configuration.BASE_URL + '/files';
  private endpoint_file = Configuration.BASE_URL + '/file';  // its for testing can be deleted after
  private accessKey = Configuration.ACCESS_KEY;

  constructor(private http: HttpClient) { }

  getFiles():Observable<any> {
    return this.http.get(this.endpoint)
    .pipe(
      tap(data => console.log('All: ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getFileu(id: number):Observable<any> {
    // return this.http.get(`${this.endpoint_user}/${id}`)  // We need this for the API
    return this.http.get(this.endpoint_file)
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


