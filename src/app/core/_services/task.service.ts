import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Configuration } from './configuration';
import { NormalTask } from '../_models/task';

@Injectable({
    providedIn: 'root'
})
export class TaskService {

    private endpoint = Configuration.BASE_URL + '/tasks';

    constructor(private http: HttpClient) { }

};
