import { HelpersService } from './../services/helpers.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {
  constructor (private _jwtHelperService: JwtHelperService,
    private _router: Router,
    private _authenticationService: AuthenticationService,
    private _helpersService: HelpersService
    ) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this._authenticationService.isUserAuthenticated$()) {
      return true;
    }

    this._router.navigate(["home"]);
    this._helpersService.showAlert("You're actually logged in, please logout first if you want to login to another account.", "Error!", 5000);
    return false;
  }

}
