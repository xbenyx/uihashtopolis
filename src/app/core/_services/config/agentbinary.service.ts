import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap} from 'rxjs/operators';
import { map, Observable, throwError } from 'rxjs';
import { Configuration } from '../configuration';

@Injectable({
  providedIn: 'root'
})
export class AgentBinService {

  private endpoint = Configuration.BASE_URL + '/agentbinary';

  constructor(private http: HttpClient) { }

  getAgentBin():Observable<any> {
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
