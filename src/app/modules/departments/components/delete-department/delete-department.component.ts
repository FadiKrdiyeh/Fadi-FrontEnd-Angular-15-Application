import { Department } from './../../../../shared/models/department';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'fadi-delete-department',
  templateUrl: './delete-department.component.html',
  styleUrls: ['./delete-department.component.scss']
})
export class DeleteDepartmentComponent {
  constructor (private _matDialogRef: MatDialogRef<DeleteDepartmentComponent>, @Inject(MAT_DIALOG_DATA) public deleteDepartment: Department) {}

  /**
   * Send delete confirmation to parent component [list-departments] if dialog closed with delete button click
   *
   * @memberof DeleteDepartmentComponent
   */
  confirmDelete () {
    if (this.deleteDepartment) {
      this._matDialogRef.close('delete');
    }
  }
}
