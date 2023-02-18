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

  constructor(private _httpClient: HttpClient) {
    this._endPoint = env.endpoint;
    this._accountApiUrl = `${this._endPoint}api/account`;
  }

  login$ (credentials: Credentials): Observable<ApiResponse> {
    return this._httpClient.post<ApiResponse>(`${this._accountApiUrl}/login`, credentials);
  }
}
