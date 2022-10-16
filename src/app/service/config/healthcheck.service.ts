import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap} from 'rxjs/operators';
import { map, Observable, throwError } from 'rxjs';
import { Configuration } from '../configuration';
import { HashtypeService } from '../../service/hashtype.service';

@Injectable({
  providedIn: 'root'
})
export class HealthcheckService {

  private endpoint = Configuration.BASE_URL + '/healthcheck';
  private endpoint_h = Configuration.BASE_URL + '/hashtype';
  private accessKey = Configuration.ACCESS_KEY;

  constructor(private http: HttpClient) { }

  getHealthChecks():Observable<any> {
    return this.http.get(this.endpoint)
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
