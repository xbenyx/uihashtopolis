import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { take, exhaustMap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{
    constructor(private authService: AuthService){}
    intercept(req: HttpRequest<any>, next: HttpHandler){
        return this.authService.user.pipe(
            take(1),
            exhaustMap(user => {
                if(!user){
                    return next.handle(req);
                }
                const modifiedReq = req.clone({
                  setHeaders: {
                    // Authorization: `Bearer ${user.token}`  //Use this one as soon as token is fixed
                    Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2Njc5OTE5NDMsImV4cCI6MTY2Nzk5OTE0MywianRpIjoiMWY5NzY0OTZhNmI5Nzc5Y2JmNDhhNmQyMjhhZTE4YzYiLCJ1c2VySWQiOjEsInNjb3BlIjpbInRvZG8uYWxsIl19.lQarMMce9mH8cqrkos80McScIQxxCC_sTKAu_yeNvQM`
                  }
                });
                return next.handle(modifiedReq);
            }));
    }
}

// // Interceptor using Params instead of header authentification
// export class AuthInterceptorService implements HttpInterceptor{
//   constructor(private authService: AuthService){}
//   intercept(req: HttpRequest<any>, next: HttpHandler){
//       return this.authService.user.pipe(
//           take(1),
//           exhaustMap(user => {
//               if(!user){
//                   return next.handle(req);
//               }
//               const modifiedReq = req.clone({
//                   params: new HttpParams().set('auth', user.token)
//               });
//               return next.handle(modifiedReq);
//           }));
//   }
// }
