import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, Observable } from 'rxjs';

import { DEFAULT_CONFIG } from '../../../../config/default/app/main';

@Injectable({
  providedIn: 'root'
})
export class NotificationsBellService {

  private endpoint = DEFAULT_CONFIG.devApiEndpoint + '/notifbell';

  constructor(private http: HttpClient) { }

  getNoficationsBell():Observable<any> {
    return this.http.get(this.endpoint);
  }

}
