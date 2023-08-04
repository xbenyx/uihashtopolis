import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, throwError, Observable, ReplaySubject } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Injectable, Output, EventEmitter } from "@angular/core";
import { User } from '../../_models/auth-user.model';
import { catchError, tap } from 'rxjs/operators';
import { Router } from "@angular/router";
import { Buffer } from 'buffer';

export interface userPermission {
  feature: string,
  permission: string,
}

@Injectable({providedIn: 'root'})
export class AuthService {

  // hasPermission(user: User, feature: Features, permission: Permission): Observable<boolean> {
  //   // const featurePermission = user.featurePermissions.find(f => f.feature === feature);

  //   // if (!!featurePermission) {
  //   //   switch (permission) {
  //   //     case Permission.View:
  //   //       return featurePermission.permission !== Permission.None;
  //   //     case Permission.Admin:
  //   //       return featurePermission.permission === Permission.Admin;
  //   //   }
  //   // }
  //   // return false;
  // }

}


