import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, catchError, throwError  } from 'rxjs';

import { Configuration } from '../configuration';

@Injectable({
  providedIn: 'root'
})
export class CrackerService {

  private endpoint_v1 = Configuration.BASE_URL_APIV1 + '/ui/hashlists';
  private endpoint = Configuration.BASE_URL + '/crackerbinary';

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
    return this.http.delete(this.endpoint_v1 +'/'+ id)
    .pipe(
      catchError(this.handleError)
    );
  }

}
