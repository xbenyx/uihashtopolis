import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, Observable, tap, catchError, throwError } from 'rxjs';
import { Configuration } from '../configuration';
import { CreateHashlist, Hashlist} from '../../models/hashlist';

@Injectable({
  providedIn: 'root'
})
export class ListsService {

  private endpoint_v1 = Configuration.BASE_URL_APIV1 + '/ui/hashlists';

  constructor(private http: HttpClient) { }

  private handleError ( err : HttpErrorResponse ) {
    if (err.error instanceof ErrorEvent){
      console.log('Client Side Error: ', err.error.message);
    }else{
      console.log('Server Side Error: ', err);
    }
    return throwError(() => err);
  }

  getAllhashlists():Observable<any> {
    return this.http.get(this.endpoint_v1)
    .pipe(
      tap(data => console.log('All: ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  deleteHashlist(id:number):Observable<any> {
    return this.http.delete(this.endpoint_v1 +'/'+ id)
    .pipe(
      catchError(this.handleError)
    );
  }

}
