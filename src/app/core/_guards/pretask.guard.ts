import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { map, Observable, take } from "rxjs";
import { Injectable } from "@angular/core";

import { GlobalService } from 'src/app/core/_services/main.service';
import { SERV } from '../../core/_services/main.config';

@Injectable({
  providedIn: 'root'
})
export class PreTaskGuard implements CanActivate{
    isAuthenticated: boolean;

    constructor(
      private gs: GlobalService,
      private router: Router
    ){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree>  {
        return this.gs.get(SERV.USERS,this.gs.userId,{'expand':'globalPermissionGroup'}).pipe(
            take(1),
            map(perm =>{
            const isAuth = perm.globalPermissionGroup.permissions.viewPretaskAccess;
            if(isAuth || typeof isAuth == 'undefined'){
                return true;
            }
            Swal.fire({
              title: "ACCESS DENIED",
              text: "Please contact your Administrator.",
              icon: "error",
              showConfirmButton: false,
              timer: 2000
            })
            return false;
        }));
    }
}
