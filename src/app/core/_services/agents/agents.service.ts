import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, Observable } from 'rxjs';

import { DEFAULT_CONFIG } from '../../../../config/default/app/main';

@Injectable({
  providedIn: 'root'
})
export class AgentsService {

  private endpoint = DEFAULT_CONFIG.prodApiEndpoint + '/agent';

  constructor(private http: HttpClient) { }

  showAgents():Observable<any> {
    return this.http.get(this.endpoint);
  }

}
