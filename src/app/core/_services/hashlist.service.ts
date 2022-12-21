import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from './../../../environments/environment';
import { CreateHashlist } from '../_models/hashlist';

@Injectable({
    providedIn: 'root'
})
export class HashlistService {

    private endpoint = environment.config.prodApiEndpoint + '/hashlists';

    constructor(private http: HttpClient) { }

    createHashlist(hashlist: CreateHashlist): Observable<number> {
        return this.http.post<number>(this.endpoint, hashlist);
    }
};
