import { environment } from './../../../environments/environment';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable, tap, retryWhen, delay, take } from 'rxjs';
import { AuthService } from './access/auth.service';
import { HttpClient} from '@angular/common/http';
import { setParameter } from './buildparams';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  private endpoint = environment.config.prodApiEndpoint;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,
    private as:AuthService,
    ) { }

/**
 * Get logged user id
 * @returns  id
**/

  get userId(){
    return this.as.userId;
  }


/**
 * Returns all
 * @param routerParams - to include multiple options such as Max number of results or filtering
 * @returns  Object
**/
  getAll(methodUrl: string, routerParams?: Params):Observable<any> {
    let queryParams: Params = {};
    if (routerParams) {
        queryParams = setParameter(routerParams);
    }
    return this.http.get(this.endpoint + methodUrl, {params: queryParams})
  }

/**
 * Returns an specific element
 * @param id - element id
 * @returns  Object
**/
  get(methodUrl:string, id: number, routerParams?: Params):Observable<any> {
    let queryParams: Params = {};
    if (routerParams) {
        queryParams = setParameter(routerParams);
    }
    return this.http.get(`${this.endpoint+methodUrl}/${id}`,{params: routerParams})
  }

/**
 * Create
 * @param item - fields
 * @returns  Object
**/
  create(methodUrl:string, item: any): Observable<any> {
    return this.http.post<any>(this.endpoint+methodUrl, item)
  }

/**
 * Deletes a element
 * @param id - element id
 * @returns Object
**/
  delete(methodUrl: string, id: number): Observable<any> {
    return this.http.delete(this.endpoint+methodUrl +'/'+ id)
    .pipe(
      tap(data => console.log(JSON.stringify(data))),
      retryWhen(errors => {
          return errors
                  .pipe(
                    tap(() => console.log("Retrying...")),
                    delay(2000), // Add a delay before retry delete
                    take(3)  // Retry max 3 times
                  );
      } )
    );
  }

/**
 * Update element information
 * @param id - element id
 * @param arr - fields to be updated
 * @returns Object
**/
  update(methodUrl: string, id: number, arr: any): Observable<any> {
    return this.http.patch<number>(this.endpoint+methodUrl + '/' + id, arr)
  }

/**
 * Update agent information
 * @param id - agent id
 * @param arr - fields to be updated
 * @returns Object
**/
  archive(methodUrl: string, id: number): Observable<any> {
    return this.http.patch<number>(this.endpoint+methodUrl + '/' + id, {isArchived: true})
  }


}
