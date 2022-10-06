import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, Observable } from 'rxjs';

import { Configuration } from '../configuration';

@Injectable({
  providedIn: 'root'
})
export class BinaryService {

  private endpoint = Configuration.BASE_URL + '/crackerbinary';
  private accessKey = Configuration.ACCESS_KEY;

  constructor(private http: HttpClient) { }

  crackerBinary():Observable<any> {
    return this.http.get(this.endpoint);
  }

}
