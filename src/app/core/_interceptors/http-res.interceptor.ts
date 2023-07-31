import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, retry, throwError, catchError, finalize } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { ErrorModalComponent } from '../../shared/alert/error/error.component';
import { LoadingService } from '../_services/shared/loading.service';

@Injectable()
export class HttpResInterceptor implements HttpInterceptor{

  constructor(
    private modalService: NgbModal,
    public ls: LoadingService,
    private router: Router,
    ) {}

    modalRef = null;
    intercept(req: HttpRequest<any>, next: HttpHandler):
      Observable<HttpEvent<any>> {
        this.ls.handleRequest('plus');
        return next.handle(req)
          .pipe(
            retry(1),
            finalize(this.finalize.bind(this)),
            catchError((error: HttpErrorResponse) => {
              let errmsg= '';
              if (error.error instanceof ErrorEvent) {
                const err = error?.error.message || 'Unknown API error';
                errmsg = `Client Side Error: ${err}`;
              } else {
                const err = error?.error?.exception[0]?.message || 'Unknown API error';
                errmsg = `Server Side Error: ${err}`;
              }
              if(error.status === 403){
                errmsg = `Access Denied: Please contact your administrator`;
              }
              if(error.status !== 404 && error.status !== 403  && error?.status >= 300){
                this.router.navigate(['error'])
              }
              this.modalRef = this.modalService.open(ErrorModalComponent);
              this.modalRef.componentInstance.status = error?.status;
              this.modalRef.componentInstance.message = errmsg;
              return throwError(() => errmsg);
            })
        )
    }

    finalize = (): void => this.ls.handleRequest();
}
