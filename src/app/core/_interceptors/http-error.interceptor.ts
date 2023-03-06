import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, retry, throwError, catchError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { ErrorModalComponent } from '../../shared/alert/error/error.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor{
  constructor(
    private router: Router,
    private modalService: NgbModal
    ) {}
    modalRef = null;
    intercept(req: HttpRequest<any>, next: HttpHandler):
      Observable<HttpEvent<any>> {
        return next.handle(req)
        .pipe(
          retry(1),
          catchError((error: HttpErrorResponse) => {
            let errmsg = '';
            if (error.error instanceof ErrorEvent) {
              var err = error?.error.message || 'Unknown API error';
              errmsg = `Client Side Error: ${err}`;
            } else {
              var err = error?.message || 'Unknown API error';
              errmsg = `Server Side Error: ${err}`;
            }
            if( error.status !== 404  && error?.status >= 300){
              this.router.navigate(['error'])
            }
            this.modalRef = this.modalService.open(ErrorModalComponent);
            this.modalRef.componentInstance.status = error?.status;
            this.modalRef.componentInstance.message = errmsg;
            return throwError(() => errmsg);
          })
        )
    }
}
