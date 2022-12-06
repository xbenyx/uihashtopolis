import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { Configuration } from '../configuration';
import { BaseHashlist} from '../../models/hashlist';

@Injectable({
  providedIn: 'root'
})
export class ListsService {

  private endpoint = Configuration.BASE_URL_APIV1 + '/ui/hashlists';

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
    let searchParams = new HttpParams();
    searchParams = searchParams.append('maxResults',100);
    searchParams = searchParams.append('expand','hashType,accessGroup');
    return this.http.get(this.endpoint ,{params: searchParams})
    .pipe(
      tap(data => console.log('All: ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  deleteHashlist(id:number):Observable<any> {
    return this.http.delete(this.endpoint +'/'+ id)
    .pipe(
      catchError(this.handleError)
    );
  }

  createHashlist(user: any): Observable<BaseHashlist> {
    return this.http.post<any>(this.endpoint, user)
    .pipe(
      tap(data => console.log('All: ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

}
