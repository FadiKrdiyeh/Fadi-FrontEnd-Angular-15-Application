import { Department } from './../../../../shared/models/department';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DepartmentService } from './../../../../core/services/department.service';
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'fadi-add-edit-department',
  templateUrl: './add-edit-department.component.html',
  styleUrls: ['./add-edit-department.component.scss']
})
export class AddEditDepartmentComponent implements OnInit {
  // departmentForm: FormGroup;
  departmentId: number;
  departmentName: string;
  action: string;
  actionButton: string;

  constructor (private _departmentService: DepartmentService, private _matSnackBar: MatSnackBar, private _matDialogRef: MatDialogRef<AddEditDepartmentComponent>, @Inject(MAT_DIALOG_DATA) public departmentData: Department) {
    this.departmentId = 0;
    this.departmentName = '';
    this.action = "Add";
    this.actionButton = "Save";
    // this.departmentForm = this._formBuilder.group({
    //   name: ['', Validators.required]
    // });
  }

  addEditDepartment () {
    const department = {
      departmentId: this.departmentId,
      name: this.departmentName
    }
    // console.log(department);


    if (this.departmentData != null) {
      this._departmentService.editDepartment$(department).subscribe({
        next: (data) => {
          if (data.status) {
            this.showAlert("Department updated successfully.", "Success!");
            this._matDialogRef.close("edited");
          } else {
            this.showAlert("Could not update department.", "Error!");
          }
        },
        error(error) {},
      })
    } else {
      this._departmentService.addDepartment$(department).subscribe({
        next: (data) => {
          if (data.status) {
            this.showAlert("Department created successfully.", "Success!")
            this._matDialogRef.close("created");
          } else {
            this.showAlert("Could not create department", "Error!");
          }
        },
        error(error) {},
      })
    }
  }

  showAlert (message: string, title: string) {
    this._matSnackBar.open(message, title, {
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      duration: 4000
    })
  }

  ngOnInit(): void {
    if (this.departmentData) {
      this.departmentId = this.departmentData.departmentId
      this.departmentName = this.departmentData.name;


      this.action = 'Edit';
      this.actionButton = 'Update';
    }
    // console.log(this.departmentName, this.departmentData);
  }
}
