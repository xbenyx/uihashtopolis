import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, tap} from 'rxjs/operators';
import { environment } from './../../../../environments/environment';
import { map, Observable, throwError } from 'rxjs';
import { Params } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private endpoint = environment.config.prodApiEndpoint + '/ui/configs';

  constructor(private http: HttpClient) { }

  getAllconfig(routerParams?: Params):Observable<any> {
    let queryParams: Params = {};
    if (routerParams) {
        queryParams = this.setParameter(routerParams);
    }
    return this.http.get(this.endpoint, {params: queryParams})
    .pipe(
      tap(data => console.log('All: ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  updateConfig(id: number, arr: any): Observable<any> {
    return this.http.patch<number>(this.endpoint + '/' + id, arr)
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

  private setParameter(routerParams: Params): HttpParams {
    let queryParams = new HttpParams();
    for (const key in routerParams) {
        if (routerParams.hasOwnProperty(key)) {
            queryParams = queryParams.set(key, routerParams[key]);
        }
    }
    return queryParams;
  }



}
