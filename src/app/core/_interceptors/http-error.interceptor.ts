import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, retry, throwError, catchError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor{
  constructor(private router: Router) {}
    intercept(req: HttpRequest<any>, next: HttpHandler):
      Observable<HttpEvent<any>> {
        return next.handle(req)
        .pipe(
          retry(1),
          catchError((error: HttpErrorResponse) => {
            let errmsg = '';
            if (error.error instanceof ErrorEvent) {
              let err = error?.error.message || 'Unknown API error';
              errmsg = `Client Side Error: ${err}`;
            } else {
              let err = error?.message || 'Unknown API error';
              errmsg = `Server Side Error: ${error?.status}\nMessage: ${err}`;
            }
            if( error.status !== 404  && error?.status >= 300){
              this.router.navigate(['error'])
            }
            window.alert(errmsg);
            return throwError(() => errmsg);
          })
        )
    }
}
