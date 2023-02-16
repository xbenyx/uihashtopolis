import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Params } from "@angular/router";
import { Observable, throwError, tap, catchError, take, map } from "rxjs";
import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UIConfigService {

  constructor(
    private http: HttpClient
  ) {}

  private endpoint = environment.config.prodApiEndpoint + '/ui/configs';

  getUIdateformat():Observable<any>{
    let params = {'filter=item': 'timefmt'}
    return this.http.get(this.endpoint, {params: params})
    .pipe(
      tap(data => console.log('All: ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getUIfbrainenable():Observable<any>{
    let params = {'filter=item': 'hashcatBrainEnable'}
    return this.http.get(this.endpoint, {params: params})
    .pipe(
      tap(data => console.log('All: ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getUIplaceholder():Observable<any>{
    let params = {'filter=item': 'hashlistAlias'}
    return this.http.get(this.endpoint, {params: params})
    .pipe(
      tap(data => console.log('All: ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getUIforbiddenchar():Observable<any>{
    let params = {'filter=item': 'blacklistChars'}
    return this.http.get(this.endpoint, {params: params})
    .pipe(
      take(1),
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



