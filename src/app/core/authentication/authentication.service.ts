import { ApiResponse } from './../../shared/models/api-response';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { Credentials } from './../../shared/models/credential';
import { environment as env } from './../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

  register$ (user: Credentials): Observable<ApiResponse> {
    return this._httpClient.post<ApiResponse>(`${ this._accountApiUrl }/register`, user);
  }

  login$ (credentials: Credentials): Observable<ApiResponse> {
    return this._httpClient.post<ApiResponse>(`${this._accountApiUrl}/login`, credentials);
  }

  logout$ (): boolean {
    if (this.isUserAuthenticated$()) {
      localStorage.removeItem(env.tokenLocalStorageKey);
      localStorage.removeItem(env.usernameLocalStorageKey);
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

  getUserData$ (): Observable<ApiResponse> {
    return this._httpClient.get<ApiResponse>(`${ this._accountApiUrl }/profile`);
  }

  getUsers$ (): Observable<ApiResponse> {
    return this._httpClient.get<ApiResponse>(`${ this._accountApiUrl }/users`);
  }

  checkUsername$ (username: string): Observable<ApiResponse> {
    return this._httpClient.get<ApiResponse>(`${ this._accountApiUrl }/check-username`, { params: { username: username }, headers: { ignoreInterceptors: 'true' } });
  }
}
