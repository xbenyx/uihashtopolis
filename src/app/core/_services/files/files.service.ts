import { Observable, tap, catchError, throwError, retryWhen, delay, take } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { environment } from './../../../../environments/environment';
import { setParameter } from '../buildparams';
import { Injectable } from "@angular/core";
import { Params } from '@angular/router';

import { Filetype, UpdateFileType } from '../../_models/files';

@Injectable({providedIn: 'root'})
export class FilesService {

  private endpoint = environment.config.prodApiEndpoint + '/ui/files';  // V1 API

  constructor(private http: HttpClient) { }

  getFiles(routerParams?: Params):Observable<any> {
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

  getFile(id: number):Observable<any> {
    return this.http.get(`${this.endpoint}/${id}`)
    .pipe(
      tap(data => console.log('All: ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  deleteFile(id: number):Observable<any> {
    return this.http.delete(this.endpoint +'/'+ id)
    .pipe(
      catchError(this.handleError),
      retryWhen(errors => {
        return errors
                .pipe(
                  tap(() => console.log("Retrying...")),
                  delay(2000), // Add a delay before retry delete
                  take(3)  // Retry delete Agents
                );
    } )
    );
  }

  createFile(id: number):Observable<any> {
    return this.http.delete(this.endpoint +'/'+ id)
    .pipe(
      catchError(this.handleError)
    );
  }

  updateFile(arr: any): Observable<UpdateFileType> {
    return this.http.patch<any>(this.endpoint + '/' + arr.fileId, arr.updateData)
    .pipe(
      tap(data => console.log('All: ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  updateBulkFile(id: number, arr: any): Observable<UpdateFileType> {
    return this.http.patch<any>(this.endpoint + '/' + id, arr)
    .pipe(
      tap(data => console.log('Work: ', JSON.stringify(data))),
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
