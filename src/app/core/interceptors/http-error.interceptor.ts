import { Injectable } from '@angular/core';
import { LoadingService } from './../services/loading.service';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Observable, tap } from 'rxjs';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor (private _loadingService: LoadingService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this._loadingService.requestStarted();
    return this.handler(next, req);
  }

  handler (next: HttpHandler, request: HttpRequest<any>) {
    return next.handle(request).pipe(
      tap(
        (event) => {
          if (event instanceof HttpResponse) {
            this._loadingService.requestEnded();
            // setTimeout(() => {
            //   this._loadingService.requestEnded();
            // }, 3000);
          }
        },
        (error: HttpErrorResponse) => {
          this._loadingService.resetLoading();
          throw error;
        }
      )
    )
  }
}
