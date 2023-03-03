import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { setParameter } from '../buildparams';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { tap} from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgentBinService {

  private endpoint = environment.config.prodApiEndpoint + '/ui/agentbinaries';

  constructor(private http: HttpClient) { }

/**
 * Get all the Agent Binaries
 * @param routerParams - to include multiple options such as Max number of results or filtering
 * @returns Object
**/
  getAgentBin(routerParams?: Params):Observable<any> {
    let queryParams: Params = {};
    if (routerParams) {
        queryParams = setParameter(routerParams);
    }
    return this.http.get(this.endpoint)
    .pipe(
      tap(data => console.log('All: ', JSON.stringify(data)))
    );
  }

/**
 * Delete Agent Binary
 * @param id - Agent binary id
 * @returns Object
**/
  deleteAgentBin(id: number):Observable<any> {
    return this.http.delete(this.endpoint + '/' + id);
  }

/**
 * Create Agent Binary
 * @param arr - variables
 * @returns Object
**/
  createAgentBin(arr: string):Observable<any> {
    return this.http.post(this.endpoint, arr);
  }

}
