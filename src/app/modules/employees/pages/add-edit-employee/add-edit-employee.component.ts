import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { Department } from '../../../../shared/models/department';
import { Employee } from '../../../../shared/models/employee';
import { DepartmentService } from '../../../../core/services/department.service';
import { EmployeeService } from '../../../../core/services/employee.service';
// import * as moment from 'moment';
// import { ThisReceiver } from '@angular/compiler';

export const MY_DATE_FORMATE = {
  parse: {
    dateInput: 'DD/MM/YYYY'
  },
  display: {
    dateInput: 'DD/MM/YYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
}

@Component({
  selector: 'fadi-add-edit-employee',
  templateUrl: './add-edit-employee.component.html',
  styleUrls: ['./add-edit-employee.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATE }
  ]
})
export class AddEditEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  action: string;
  actionButton: string;
  departmentsList: Department[];

  constructor (
    private _matDialogRef: MatDialogRef<AddEditEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public employeeData: Employee,
    private _formBuilder: FormBuilder,
    private _matSnackBar: MatSnackBar,
    private _departmentService: DepartmentService,
    private _employeeService: EmployeeService
  ) {
    this.action = "Add";
    this.actionButton = "Save";
    this.departmentsList = [];
    this.employeeForm = this._formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]],
      lastName: ['', Validators.maxLength(20)],
      address: [''],
      salary: [''],
      phone: ['', [Validators.minLength(10), Validators.maxLength(10)]],
      departmentId: ['', Validators.required]
    });

    this._departmentService.getDepartments$().subscribe({
      next: (data) => {
        if (data.status) {
          this.departmentsList = data.value;
        }
      },
      error: (error) => {}
    })
  }

  addEditEmployee () {
    const employee: Employee = {
      employeeId: this.employeeData == null ? "00000000-0000-0000-0000-000000000000" : this.employeeData.employeeId,
      firstName: this.employeeForm.value.firstName,
      lastName: this.employeeForm.value.lastName,
      address: this.employeeForm.value.address,
      salary: this.employeeForm.value.salary,
      phone: this.employeeForm.value.phone,
      fDepartmentId: this.employeeForm.value.departmentId
      // hireDate: moment(this.employeeForm.value.hireDate).format('DD/MM7')
    };
    // console.log(employee);

    if (this.employeeData == null) {
      this._employeeService.addEmployee$(employee).subscribe({
        next: (data) => {
          if (data.status) {
            this.showAlert("Employee created successfully", "Success!");
            this._matDialogRef.close('created');
          } else {
            this.showAlert("Could not add employee", "Error!");
          }
        },
        error: (error) => {}
      });
    } else {
      this._employeeService.editEmployee$(employee).subscribe({
        next: (data) => {
          if (data.status) {
            this.showAlert("Employee updated successfully", "Success!");
            this._matDialogRef.close('edited');
          } else {
            this.showAlert("Could not add employee", "Error!");
          }
        },
        error: (error) => {}
      });
    }
  }

  showAlert (message: string, title: string) {
    this._matSnackBar.open(message, title, {
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      duration: 5000
    })
  }

  ngOnInit(): void {
    if (this.employeeData) {
      this.employeeForm.patchValue({
        firstName: this.employeeData.firstName,
        lastName: this.employeeData.lastName,
        address: this.employeeData.address,
        salary: this.employeeData.salary,
        phone: this.employeeData.phone,
        departmentId: this.employeeData.fDepartmentId
        // hireDate: moment(this.employeeData.hireDate, 'DD/MM/YYYY')
      });

      this.action = 'Edit';
      this.actionButton = 'Update';
    }
  }
}
