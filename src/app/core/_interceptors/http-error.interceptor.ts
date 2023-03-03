import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, retry, throwError, catchError } from 'rxjs';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler):
      Observable<HttpEvent<any>> {
        return next.handle(req)
        .pipe(
          retry(1),
          catchError((error: HttpErrorResponse) => {
            let err = '';
            if (error.error instanceof ErrorEvent) {
              // client-side error
              err = `Error: ${error.error.message}`;
            } else {
              // server-side error
              err = `Error Code: ${error.status}\nMessage: ${error.message}`;
            }
            window.alert(err);
            return throwError(() => err);
          })
        )
    }
}



