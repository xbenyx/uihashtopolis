import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, tap} from 'rxjs/operators';
import { map, Observable, throwError } from 'rxjs';

import { DEFAULT_CONFIG } from '../../../../config/default/app/main';

@Injectable({
  providedIn: 'root'
})
export class LogentryService {

  private endpoint = DEFAULT_CONFIG.prodApiEndpoint + '/ui/logentries';

  constructor(private http: HttpClient) { }

  getLogs():Observable<any> {
    return this.http.get(this.endpoint,{params: new HttpParams().set('maxResults', 3000)})
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
