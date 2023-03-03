import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Params } from '@angular/router';
import { setParameter } from '../buildparams';
import { Observable, tap, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoucherService {

  private endpoint = environment.config.prodApiEndpoint + '/ui/vouchers';

  constructor(private http: HttpClient) { }

  getVouchers(routerParams?: Params):Observable<any> {
    let queryParams: Params = {};
    if (routerParams) {
        queryParams = setParameter(routerParams);
    }
    return this.http.get(this.endpoint, {params: queryParams})
    .pipe(
      tap(data => console.log('All: ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  deleteVoucher(id: number):Observable<any> {
    return this.http.delete(this.endpoint + '/' + id)
    .pipe(
      catchError(this.handleError)
    );
  }

  createVoucher(arr: string):Observable<any> {
    return this.http.post(this.endpoint, arr)
    .pipe(
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
