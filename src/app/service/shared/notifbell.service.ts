import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, Observable } from 'rxjs';

import { Configuration } from '../configuration';

@Injectable({
  providedIn: 'root'
})
export class NotificationsBellService {

  private endpoint = Configuration.BASE_URL + '/notifbell';

  constructor(private http: HttpClient) { }

  getNoficationsBell():Observable<any> {
    return this.http.get(this.endpoint);
  }

}
