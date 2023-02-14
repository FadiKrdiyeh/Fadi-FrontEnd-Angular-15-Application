import { Employee } from './../../shared/models/employee';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '../../../environment/environment';
import { ApiResponse } from '../../shared/models/api-response';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private _endPoint: string;
  private _employeeApiUrl: string;

  constructor(private _httpClient: HttpClient) {
    this._endPoint = env.endpoint;
    this._employeeApiUrl = `${ this._endPoint }api/employee`;
  }

  getEmployees$ (): Observable<ApiResponse> {
    return this._httpClient.get<ApiResponse>(this._employeeApiUrl);
  }

  getEmployee$ (employeeId: number): Observable<ApiResponse> {
    return this._httpClient.get<ApiResponse>(`${ this._employeeApiUrl }/${ employeeId }`);
  }

  addEmployee$ (employee: Employee):Observable<ApiResponse> {
    return this._httpClient.post<ApiResponse>(this._employeeApiUrl, employee);
  }

  editEmployee$ (employee: Employee): Observable<ApiResponse> {
    return this._httpClient.put<ApiResponse>(this._employeeApiUrl, employee);
  }

  deleteEmployee$ (employeeId: number): Observable<ApiResponse> {
    return this._httpClient.delete<ApiResponse>(`${ this._employeeApiUrl }/${ employeeId }`);
  }
}
