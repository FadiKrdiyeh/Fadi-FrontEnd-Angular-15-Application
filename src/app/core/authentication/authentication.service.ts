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

  /**
   * Send POST request to API to Register new user and login
   *
   * @param {Credentials} user This parameter contains user credentials: [Username, password, Full Name]
   * @return {*}  {Observable<ApiResponse>}
   * @memberof AuthenticationService
   */
  register$ (user: Credentials): Observable<ApiResponse> {
    return this._httpClient.post<ApiResponse>(`${ this._accountApiUrl }/register`, user);
  }

  /**
   * Send POST request to API to Login user
   *
   * @param {Credentials} credentials This parameter contains user credentials: [Username, password] needs to login
   * @return {*}  {Observable<ApiResponse>}
   * @memberof AuthenticationService
   */
  login$ (credentials: Credentials): Observable<ApiResponse> {
    return this._httpClient.post<ApiResponse>(`${this._accountApiUrl}/login`, credentials);
  }

  /**
   * Remove token and username from localStorage to logout user
   * Need authentication
   * @return {*}  {boolean}
   * @memberof AuthenticationService
   */
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

  /**
   * Check if user is signed in or not
   *
   * @return {*}  {boolean}
   * @memberof AuthenticationService
   */
  isUserAuthenticated$ (): boolean {
    const token: string = localStorage.getItem(env.tokenLocalStorageKey) || "";
    // console.log("Token is: ", token);
    if (token && !this._jwtHelperService.isTokenExpired(token)) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Get token from localStorage
   * Need authentication
   * @return {*}  {string}
   * @memberof AuthenticationService
   */
  tokenGetter$ (): string {
    return localStorage.getItem(env.tokenLocalStorageKey) || "";
  }

  /**
   * Send GET request to API for logged in user data
   * Need authentication
   * @return {*}  {Observable<ApiResponse>}
   * @memberof AuthenticationService
   */
  getUserData$ (): Observable<ApiResponse> {
    return this._httpClient.get<ApiResponse>(`${ this._accountApiUrl }/profile`);
  }

  /**
   * Send GET request to API to get all users
   * Need authentication
   * @return {*}  {Observable<ApiResponse>}
   * @memberof AuthenticationService
   */
  getUsers$ (): Observable<ApiResponse> {
    return this._httpClient.get<ApiResponse>(`${ this._accountApiUrl }/users`);
  }

  /**
   * Send GET request to API to check if a username exist in database or not
   *
   * @param {string} username
   * @return {*}  {Observable<ApiResponse>}
   * @memberof AuthenticationService
   */
  checkUsername$ (username: string): Observable<ApiResponse> {
    return this._httpClient.get<ApiResponse>(`${ this._accountApiUrl }/check-username`, { params: { username: username }, headers: { ignoreInterceptors: 'true' } });
  }
}
