import { Department } from './../../shared/models/department';
import { ApiResponse } from './../../shared/models/api-response';
import { Injectable } from '@angular/core';
import { environment as env } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Service for departments request and operations
 *
 * @export
 * @class DepartmentService
 */
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

  /**
   * Send GET request to API to get all departments
   *
   * @return {*}  {Observable<ApiResponse>}
   * @memberof DepartmentService
   */
  getDepartments$ (): Observable<ApiResponse> {
    return this._httpClient.get<ApiResponse>(this._departmentApiUrl);
  }

  /**
   * Send GET request to API to get a specific department by id
   *
   * @param {number} departmentId Department id to get from database
   * @return {*}  {Observable<ApiResponse>}
   * @memberof DepartmentService
   */
  getDepartment$ (departmentId: number): Observable<ApiResponse> {
    return this._httpClient.get<ApiResponse>(`${ this._departmentApiUrl }/${ departmentId }`);
  }

  /**
   * Send POST request to API to add new department to database
   *
   * @param {Department} department This is the department which will send to API to add in database
   * @return {*}  {Observable<ApiResponse>}
   * @memberof DepartmentService
   */
  addDepartment$ (department: Department): Observable<ApiResponse> {
    return this._httpClient.post<ApiResponse>(this._departmentApiUrl, department);
  }

  /**
   * Send PUT request to API to edit a specific department
   *
   * @param {Department} department This is the department which will send to API to edit in database
   * @return {*}  {Observable<ApiResponse>}
   * @memberof DepartmentService
   */
  editDepartment$ (department: Department): Observable<ApiResponse> {
    return this._httpClient.put<ApiResponse>(this._departmentApiUrl, department);
  }

  /**
   * Send DELETE request to API to delete a specific department
   *
   * @param {number} departmentId This is the department Id which will send to API to delete from database
   * @return {*}  {Observable<ApiResponse>}
   * @memberof DepartmentService
   */
  deleteDepartment$ (departmentId: number): Observable<ApiResponse> {
    return this._httpClient.delete<ApiResponse>(`${ this._departmentApiUrl }/${ departmentId }`);
  }

  /**
   * Send GET request to API to count employees in a specific department
   *
   * @param {number} departmentId This is the department Id which will send to API to count employees in
   * @return {*}  {Observable<ApiResponse>}
   * @memberof DepartmentService
   */
  countEmployees$ (departmentId: number): Observable<ApiResponse> {
    return this._httpClient.get<ApiResponse>(`${this._departmentApiUrl}/count/${departmentId}`, { headers: { ignoreInterceptors: 'true' } });
  }
}
