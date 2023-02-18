import { Department } from './../../shared/models/department';
import { ApiResponse } from './../../shared/models/api-response';
import { Injectable } from '@angular/core';
import { environment as env } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private _endPoint: string;
  private _departmentApiUrl: string;

  constructor(private _httpClient: HttpClient) {
    this._endPoint = env.endpoint;
    this._departmentApiUrl = `${ this._endPoint }api/department`;
  }

  getDepartments$ (): Observable<ApiResponse> {
    return this._httpClient.get<ApiResponse>(this._departmentApiUrl);
  }

  getDepartment$ (departmentId: number): Observable<ApiResponse> {
    return this._httpClient.get<ApiResponse>(`${ this._departmentApiUrl }/${ departmentId }`);
  }

  addDepartment$ (department: Department): Observable<ApiResponse> {
    return this._httpClient.post<ApiResponse>(this._departmentApiUrl, department);
  }

  editDepartment$ (department: Department): Observable<ApiResponse> {
    return this._httpClient.put<ApiResponse>(this._departmentApiUrl, department);
  }

  deleteDepartment$ (departmentId: number): Observable<ApiResponse> {
    return this._httpClient.delete<ApiResponse>(`${ this._departmentApiUrl }/${ departmentId }`);
  }

  countEmployees$ (departmentId: number): Observable<ApiResponse> {
    return this._httpClient.get<ApiResponse>(`${this._departmentApiUrl}/count/${departmentId}`);
  }
}
