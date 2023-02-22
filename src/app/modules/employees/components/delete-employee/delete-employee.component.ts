import { HelpersService } from './../../../../core/services/helpers.service';
import { EmployeeService } from './../../../../core/services/employee.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from '../../../../shared/models/employee';

@Component({
  selector: 'fadi-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrls: ['./delete-employee.component.scss']
})
export class DeleteEmployeeComponent {

  constructor (private _matDialogRef: MatDialogRef<DeleteEmployeeComponent>, @Inject(MAT_DIALOG_DATA) public deleteEmployee: Employee, private _employeeService: EmployeeService, private _helpersService: HelpersService) {}

  /**
   * Send delete confirmation to parent component [list-employees] if dialog closed with delete button click
   *
   * @memberof DeleteEmployeeComponent
   */
  confirmDelete () {
    if (this.deleteEmployee) {
      this._employeeService.deleteEmployee$(this.deleteEmployee.employeeId).subscribe({
        next: (data) => {
          if (data.status) {
            this._matDialogRef.close('delete');
            this._helpersService.showAlert("Employee deleted successfully. If data not updated yet, it well be updated soon.", "Success!", 5000);
          } else {
            this._helpersService.showAlert("Could not delete employee.", "Error!", 5000);
          }
        },
        error: (error) => {
          this._helpersService.showAlert("Could not delete employee.", "Error!", 5000);
        }
      })
    }
  }
}
