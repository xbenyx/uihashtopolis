import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AgentsService {

  private endpoint = environment.config.prodApiEndpoint + '/agent';

  constructor(private http: HttpClient) { }

  showAgents():Observable<any> {
    return this.http.get(this.endpoint);
  }

}
