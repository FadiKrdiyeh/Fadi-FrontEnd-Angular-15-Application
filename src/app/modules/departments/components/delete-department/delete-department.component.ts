import { HelpersService } from './../../../../core/services/helpers.service';
import { DepartmentService } from './../../../../core/services/department.service';
import { Department } from './../../../../shared/models/department';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'fadi-delete-department',
  templateUrl: './delete-department.component.html',
  styleUrls: ['./delete-department.component.scss']
})
export class DeleteDepartmentComponent {
  constructor (
    private _matDialogRef: MatDialogRef<DeleteDepartmentComponent>,
    @Inject(MAT_DIALOG_DATA) public deleteDepartment: Department,
    private _departmentService: DepartmentService,
    private _helpersService: HelpersService
    ) {}

  /**
   * Send delete confirmation to parent component [list-departments] if dialog closed with delete button click
   *
   * @memberof DeleteDepartmentComponent
   */
  confirmDelete () {
    if (this.deleteDepartment) {
      this._departmentService.deleteDepartment$(this.deleteDepartment.departmentId).subscribe({
        next: (data) => {
          if (data.status) {
            this._matDialogRef.close('delete');
            this._helpersService.showAlert("Department deleted successfully. If data not updated yet, it well be updated soon.", "Success!", 5000);
          } else {
            this._helpersService.showAlert("Could not delete department.", "Error!", 5000);
          }
        },
        error: (error) => {
          this._helpersService.showAlert("Could not delete department.", "Error!", 5000);
        },
      })
    }
  }
}
