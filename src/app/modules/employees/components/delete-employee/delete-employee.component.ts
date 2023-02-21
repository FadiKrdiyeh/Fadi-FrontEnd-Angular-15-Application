import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from '../../../../shared/models/employee';

@Component({
  selector: 'fadi-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrls: ['./delete-employee.component.scss']
})
export class DeleteEmployeeComponent {

  constructor (private _matDialogRef: MatDialogRef<DeleteEmployeeComponent>, @Inject(MAT_DIALOG_DATA) public deleteEmployee: Employee) {}

  /**
   * Send delete confirmation to parent component [list-employees] if dialog closed with delete button click
   *
   * @memberof DeleteEmployeeComponent
   */
  confirmDelete () {
    if (this.deleteEmployee) {
      this._matDialogRef.close('delete');
    }
  }
}
