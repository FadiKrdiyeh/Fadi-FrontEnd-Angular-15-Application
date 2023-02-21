import { DepartmentService } from './../../../../core/services/department.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Department } from './../../../../shared/models/department';
import { Component, Inject, OnInit } from '@angular/core';
import { AddEditDepartmentComponent } from '../add-edit-department/add-edit-department.component';

@Component({
  selector: 'fadi-details-department',
  templateUrl: './details-department.component.html',
  styleUrls: ['./details-department.component.scss']
})
export class DetailsDepartmentComponent implements OnInit {
  employeesCount: string = '';

  constructor (@Inject(MAT_DIALOG_DATA) public departmentDetails: Department, private _matDialogRef: MatDialogRef<AddEditDepartmentComponent>, private _departmentService: DepartmentService) {}

  /**
   * Send edit to parent component [list-departments] if dialog closed with edit button click
   *
   * @memberof DetailsDepartmentComponent
   */
  editDepartment () {
    if (this.departmentDetails) {
      this._matDialogRef.close('edit');
    }
  }

  /**
   * Count employees in the selected department when dialog is openned
   *
   * @memberof DetailsDepartmentComponent
   */
  ngOnInit(): void {
    this._departmentService.countEmployees$(this.departmentDetails.departmentId).subscribe({
      next: (data) => {
        if (data.status) {
          this.employeesCount = data.value.toString();
        } else {
          this.employeesCount = '-1';
        }
      }
    });
  }
}
