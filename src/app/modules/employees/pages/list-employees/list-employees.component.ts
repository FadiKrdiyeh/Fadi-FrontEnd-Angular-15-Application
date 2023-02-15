import { DeleteEmployeeComponent } from './../delete-employee/delete-employee.component';
import { RoutingAnimation } from './../../../../shared/animations/routing.animation';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Employee } from '../../../../shared/models/employee';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService } from '../../../../core/services/employee.service';

import { AddEditEmployeeComponent } from '../add-edit-employee/add-edit-employee.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'fadi-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.scss'],
  animations: [RoutingAnimation]
})
export class ListEmployeesComponent implements OnInit, AfterViewInit {
  displayedColumns: string[];
  dataEmployee = new MatTableDataSource<Employee>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor (private _titleService: Title, private _matSnackBar: MatSnackBar, private _employeeService: EmployeeService, private _matDialog: MatDialog) {
    this._titleService.setTitle("Employees");
    this.displayedColumns = ["FirstName", "LastName", "Department", "Address", "Salary", "Phone", "Actions"];
  }

  applyFilter (event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataEmployee.filter = filterValue.trim().toLowerCase();
  }

  getEmployees () {
    this._employeeService.getEmployees$().subscribe({
      next: (data) => {
        // console.log(data);
        // console.log(data.value);
        // console.log(data.status);
        if (data.status) {
          this.dataEmployee.data = data.value;
        }
      },
      error: (e) => {}
    });
  }

  ngOnInit(): void {
    this.getEmployees();
  }

  ngAfterViewInit(): void {
    this.dataEmployee.paginator = this.paginator;
  }

  addNewEmployee () {
    this._matDialog.open(AddEditEmployeeComponent, {
      disableClose: true,
      width: '400px'
    }).afterClosed().subscribe(result => {
      // console.log(result);

      if (result === 'created') {
        this.getEmployees();
      }
    })
  }

  editEmployee (employee: Employee) {
    this._matDialog.open(AddEditEmployeeComponent, {
      disableClose: true,
      data: employee,
      width: '400px'
    }).afterClosed().subscribe(result => {
      // console.log(result);

      if (result === 'edited') {
        this.getEmployees();
      }
    })
  }

  deleteEmployee (employee: Employee) {
    this._matDialog.open(DeleteEmployeeComponent, {
      disableClose: true,
      data: employee,
    }).afterClosed().subscribe(result => {
      // console.log(employeeId);

      if (result === 'delete') {
        this._employeeService.deleteEmployee$(employee.employeeId).subscribe({
          next: (data) => {
            if (data.status) {
              this.showAlert("Employee deleted successfully.", "Success!");
              this.getEmployees();
            } else {
              this.showAlert("Could not delete employee.", "Error!");
            }
          }
        })
      }
    })
  }

  showAlert (message: string, title: string) {
    this._matSnackBar.open(message, title, {
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      duration: 5000
    })
  }
}
