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
  employeesCount: number = 0;

  constructor (@Inject(MAT_DIALOG_DATA) public departmentDetails: Department, private _matDialogRef: MatDialogRef<AddEditDepartmentComponent>, private _departmentService: DepartmentService) {}

  editDepartment () {
    if (this.departmentDetails) {
      this._matDialogRef.close('edit');
    }
  }

  ngOnInit(): void {
    this._departmentService.countEmployees$(this.departmentDetails.departmentId).subscribe({
      next: (data) => {
        if (data.status) {
          this.employeesCount = data.value;
        } else {
          this.employeesCount = -1;
        }
      }
    });
  }
}
