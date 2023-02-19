import { AuthenticationService } from './../authentication/authentication.service';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Observable, tap } from 'rxjs';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor (private _authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this._authenticationService.isUserAuthenticated$()) {
      let token = this._authenticationService.tokenGetter$();
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${ token }`,
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
      });
    }
    return next.handle(request);
  }
}
