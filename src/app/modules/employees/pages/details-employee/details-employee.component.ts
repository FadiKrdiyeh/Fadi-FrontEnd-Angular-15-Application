import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Employee } from './../../../../shared/models/employee';
import { Component, Inject } from '@angular/core';
import { AddEditEmployeeComponent } from '../add-edit-employee/add-edit-employee.component';

@Component({
  selector: 'fadi-details-employee',
  templateUrl: './details-employee.component.html',
  styleUrls: ['./details-employee.component.scss']
})
export class DetailsEmployeeComponent {
  constructor (@Inject(MAT_DIALOG_DATA) public employeeDetails: Employee, private _matDialogRef: MatDialogRef<AddEditEmployeeComponent>) {}

  editEmployee () {
    if (this.employeeDetails) {
      this._matDialogRef.close('edit');
    }
  }
}
