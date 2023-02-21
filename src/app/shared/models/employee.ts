/**
 * Employee model
 *
 * @export
 * @interface Employee
 */
export interface Employee {
  employeeId: string;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  salary: string;
  fDepartmentId: number;
  departmentName?: string;
}
