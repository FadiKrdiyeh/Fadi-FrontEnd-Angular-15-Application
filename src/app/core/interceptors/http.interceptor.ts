import { AuthenticationService } from './../authentication/authentication.service';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable()
export class HttpRequestsInterceptor implements HttpInterceptor {
  constructor (private _authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this._authenticationService.isUserAuthenticated$()) {
      let token = this._authenticationService.tokenGetter$();
      request = request.clone({
        setHeaders: {
          "Authorization": `Bearer ${ token }`
        }
      });
      console.log("Form inter: ", request);

    }
    return next.handle(request);
  }
}
