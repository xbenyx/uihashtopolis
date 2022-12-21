import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from './../../../environments/environment';

import { NormalTask } from '../_models/task';

@Injectable({
    providedIn: 'root'
})
export class TaskService {

    private endpoint = environment.config.prodApiEndpoint + '/tasks';

    constructor(private http: HttpClient) { }

};
