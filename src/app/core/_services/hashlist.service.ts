import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { DEFAULT_CONFIG } from '../../../config/default/app/main';
import { CreateHashlist } from '../_models/hashlist';

@Injectable({
    providedIn: 'root'
})
export class HashlistService {

    private endpoint = DEFAULT_CONFIG.prodApiEndpoint + '/hashlists';

    constructor(private http: HttpClient) { }

    createHashlist(hashlist: CreateHashlist): Observable<number> {
        return this.http.post<number>(this.endpoint, hashlist);
    }
};
