import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { ActivatedRoute, Params } from '@angular/router';

import { Observable, tap, catchError, throwError } from 'rxjs';

import { Configuration } from '../configuration';
import { Filetype, UpdateFileType } from '../../models/files';

// import { environment } from '@env'; // Add environtment

@Injectable({providedIn: 'root'})
export class FilesService {

  private endpoint = Configuration.BASE_URL_APIV1 + '/ui/files';  // V1 API

  constructor(private http: HttpClient) { }

  private handleError ( err : HttpErrorResponse ) {
    if (err.error instanceof ErrorEvent){
      console.log('Client Side Error: ', err.error.message);
    }else{
      console.log('Server Side Error: ', err);
    }
    return throwError(() => err);
  }

  getFiles(routerParams?: Params):Observable<any> {
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

  getFile(id: number):Observable<any> {
    return this.http.get(`${this.endpoint}/${id}`)
    .pipe(
      tap(data => console.log('All: ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  createFile(id: number):Observable<any> {
    return this.http.delete(this.endpoint +'/'+ id)
    .pipe(
      catchError(this.handleError)
    );
  }

  updateFile(arr: any): Observable<UpdateFileType> {
    return this.http.patch<any>(this.endpoint + '/' + arr.fileId, {filename: arr.filename, fileType: +arr.fileType, accessGroupId: +arr.accessGroupId })
    .pipe(
      tap(data => console.log('All: ', JSON.stringify(data))),
      catchError(this.handleError)
    );
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

// ToDo: For mock up and test
//   private path(path: string): string {
//     return `${environment.api_url}${path}`;
// }



}
