import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { DEFAULT_CONFIG } from '../../../config/default/app/main';
import { NormalTask } from '../_models/task';

@Injectable({
    providedIn: 'root'
})
export class TaskService {

    private endpoint = DEFAULT_CONFIG.prodApiEndpoint + '/tasks';

    constructor(private http: HttpClient) { }

};
