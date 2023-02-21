import { HelpersService } from '../../../../core/services/helpers.service';
import { Department } from '../../../../shared/models/department';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DepartmentService } from '../../../../core/services/department.service';
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';

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
  // dragPosition = { x: 0, y: 0 };

  constructor (
    private _departmentService: DepartmentService,
    private _matDialogRef: MatDialogRef<AddEditDepartmentComponent>,
    @Inject(MAT_DIALOG_DATA) public departmentData: Department,
    private _helpersService: HelpersService
    ) {
    this.departmentId = 0;
    this.departmentName = '';
    this.action = "Add";
    this.actionButton = "Save";
    // this.departmentForm = this._formBuilder.group({
    //   name: ['', Validators.required]
    // });
  }

  /**
   * Add edit department depend on department data if null or not
   *
   * @memberof AddEditDepartmentComponent
   */
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
            this._helpersService.showAlert("Department updated successfully.", "Success!", 5000);
            this._matDialogRef.close("edited");
          } else {
            this._helpersService.showAlert("Could not update department.", "Error!", 5000);
          }
        },
        error: (error) => {
          this._helpersService.showAlert("Could not update department.", "Error!", 5000);
        }
      })
    } else {
      this._departmentService.addDepartment$(department).subscribe({
        next: (data) => {
          if (data.status) {
            this._helpersService.showAlert("Department created successfully.", "Success!", 5000)
            this._matDialogRef.close("created");
          } else {
            this._helpersService.showAlert("Could not create department", "Error!", 5000);
          }
        },
        error: (error) => {
          this._helpersService.showAlert("Could not create department.", "Error!", 5000);
        }
      })
    }
  }

  /**
   * Show data in fields if its an edit action
   * Change form title button text depend on action type [add - edit]
   * @memberof AddEditDepartmentComponent
   */
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
