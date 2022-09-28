import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, Observable } from 'rxjs';

import { Configuration } from '../configuration';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  // private endpoint = Configuration.BASE_URL + '/users';
  // private accessKey = Configuration.ACCESS_KEY;

  constructor(private http: HttpClient) { }

  users():Observable<any> {
    return this.http.get('http://localhost:3000/users');
  }

}
