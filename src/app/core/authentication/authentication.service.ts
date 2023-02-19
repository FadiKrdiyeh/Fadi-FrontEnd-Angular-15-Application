import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { Credentials } from './../../shared/models/credential';
import { environment as env } from './../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../../shared/models/api-response';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private _endPoint: string;
  private _accountApiUrl: string;

  constructor(
    private _httpClient: HttpClient,
    private _jwtHelperService: JwtHelperService,
    private _router: Router
    ) {
    this._endPoint = env.endpoint;
    this._accountApiUrl = `${this._endPoint}api/account`;
  }

  login$ (credentials: Credentials): Observable<ApiResponse> {
    return this._httpClient.post<ApiResponse>(`${this._accountApiUrl}/login`, credentials);
  }

  logout$ (): boolean {
    if (this.isUserAuthenticated$()) {
      localStorage.removeItem(env.tokenLocalStorageKey);
      this._router.navigate(['home']);
      return true;
    } else {
      return false;
    }
  }

  isUserAuthenticated$ (): boolean {
    const token: string = localStorage.getItem(env.tokenLocalStorageKey) || "";
    // console.log("Token is: ", token);
    if (token && !this._jwtHelperService.isTokenExpired(token)) {
      return true;
    } else {
      return false;
    }
  }

  tokenGetter$ (): string {
    return localStorage.getItem(env.tokenLocalStorageKey) || "";
  }
}
