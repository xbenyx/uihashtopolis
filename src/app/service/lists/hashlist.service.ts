import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, Observable } from 'rxjs';

import { Configuration } from '../configuration';
import { CreateHashlist, Hashlist } from '../../model/hashlist';

@Injectable({
  providedIn: 'root'
})
export class ListsService {

  private endpoint = Configuration.BASE_URL + '/hashlist';
  private accessKey = Configuration.ACCESS_KEY;

  constructor(private http: HttpClient) { }

  createHashlist(hashlist: CreateHashlist): Observable<number> {
    return this.http.post<number>(this.endpoint, hashlist, {
        params: {
            api_key: this.accessKey
        }
    });
  }

  getHashList():Observable<any> {
    return this.http.get(this.endpoint);
  }

}
