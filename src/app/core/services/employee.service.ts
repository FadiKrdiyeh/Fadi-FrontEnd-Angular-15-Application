import { Employee } from './../../shared/models/employee';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '../../../environment/environment';
import { ApiResponse } from '../../shared/models/api-response';

/**
 * Service for employees request and operations
 *
 * @export
 * @class EmployeeService
 */
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

  /**
   * Send GET request to API to get all employees
   *
   * @return {*}  {Observable<ApiResponse>}
   * @memberof EmployeeService
   */
  getEmployees$ (): Observable<ApiResponse> {
    return this._httpClient.get<ApiResponse>(this._employeeApiUrl);
  }

  /**
   * Send GET request to API to get a specific employee by id
   *
   * @param {number} employeeId This is the employee which will send to API to get from database
   * @return {*}  {Observable<ApiResponse>}
   * @memberof EmployeeService
   */
  getEmployee$ (employeeId: number): Observable<ApiResponse> {
    return this._httpClient.get<ApiResponse>(`${ this._employeeApiUrl }/${ employeeId }`);
  }

  /**
   * Send POST request to API to add new employee
   *
   * @param {Employee} employee This is the employee which will send to API to add in database
   * @return {*}  {Observable<ApiResponse>}
   * @memberof EmployeeService
   */
  addEmployee$ (employee: Employee):Observable<ApiResponse> {
    return this._httpClient.post<ApiResponse>(this._employeeApiUrl, employee);
  }

  /**
   * Send PUT request to API to edit a specific employee
   *
   * @param {Employee} employee This is the employee which will send to API to edit in database
   * @return {*}  {Observable<ApiResponse>}
   * @memberof EmployeeService
   */
  editEmployee$ (employee: Employee): Observable<ApiResponse> {
    return this._httpClient.put<ApiResponse>(this._employeeApiUrl, employee);
  }

  /**
   * Send DELETE request to API to delete a specific employee by his id
   *
   * @param {string} employeeId This is the employee id which will send to API to delete from database
   * @return {*}  {Observable<ApiResponse>}
   * @memberof EmployeeService
   */
  deleteEmployee$ (employeeId: string): Observable<ApiResponse> {
    return this._httpClient.delete<ApiResponse>(`${ this._employeeApiUrl }/${ employeeId }`);
  }
}
