import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, Observable } from 'rxjs';

import { Configuration } from '../configuration';

@Injectable({
  providedIn: 'root'
})
export class AgentsService {

  private endpoint = Configuration.BASE_URL + '/agent';

  constructor(private http: HttpClient) { }

  showAgents():Observable<any> {
    return this.http.get(this.endpoint);
  }

}
