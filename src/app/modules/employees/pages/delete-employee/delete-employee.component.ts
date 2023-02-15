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

  confirmDelete () {
    if (this.deleteEmployee) {
      this._matDialogRef.close('delete');
    }
  }
}
