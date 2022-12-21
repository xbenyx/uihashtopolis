import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Observable, catchError, throwError  } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CrackerService {

  private endpoint = environment.config.prodApiEndpoint + '/crackerbinary';

  constructor(private http: HttpClient) { }

  private handleError ( err : HttpErrorResponse ) {
    if (err.error instanceof ErrorEvent){
      console.log('Client Side Error: ', err.error.message);
    }else{
      console.log('Server Side Error: ', err);
    }
    return throwError(() => err);
  }

  crackerBinary():Observable<any> {
    return this.http.get(this.endpoint);
  }

  deleteCracker(id:number):Observable<any> {
    return this.http.delete(this.endpoint +'/'+ id)
    .pipe(
      catchError(this.handleError)
    );
  }

}
