import { AuthenticationService } from './../authentication/authentication.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { LoadingService } from './../services/loading.service';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Observable, tap } from 'rxjs';

/**
 * This interceptor for handle some http errors like 401, 500, etc...
 * Run loadin component from loading service when processing a request
 * @export
 * @class HttpErrorInterceptor
 * @implements {HttpInterceptor}
 */
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor (private _loadingService: LoadingService, private _router: Router, private _authenticationService: AuthenticationService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.headers.has('ignoreInterceptors')) {
      this._loadingService.requestStarted();
    }
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
          switch(error.status) {
            case 401:
              this._authenticationService.logout$();
              this._router.navigate(['account', 'login']);
              break;

            default:
              throw error;
          }
        }
      )
    )
  }
}
