import { HelpersService } from './../services/helpers.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';

/**
 * This guard for prevent unauthenticated users from visit some routes
 *
 * @export
 * @class AuthenticationGuard
 * @implements {CanActivate}
 */
@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor (private _jwtHelperService: JwtHelperService,
    private _router: Router,
    private _authenticationService: AuthenticationService,
    private _helpersService: HelpersService
    ) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this._authenticationService.isUserAuthenticated$()) {
      return true;
    }

    this._router.navigate(["account", "login"]);
    this._helpersService.showAlert("Please login to view this page.", "Error!", 5000);
    return false;
  }

}
