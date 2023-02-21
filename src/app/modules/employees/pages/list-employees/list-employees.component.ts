import { ActivatedRoute } from '@angular/router';
import { HelpersService } from './../../../../core/services/helpers.service';
import { RoutingAnimation } from './../../../../shared/animations/routing.animation';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Employee } from '../../../../shared/models/employee';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService } from '../../../../core/services/employee.service';

import { AddEditEmployeeComponent } from '../../components/add-edit-employee/add-edit-employee.component';
import { Title } from '@angular/platform-browser';
import { DeleteEmployeeComponent } from '../../components/delete-employee/delete-employee.component';
import { DetailsEmployeeComponent } from '../../components/details-employee/details-employee.component';

@Component({
  selector: 'fadi-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.scss'],
  animations: [RoutingAnimation]
})
export class ListEmployeesComponent implements OnInit, AfterViewInit {
  displayedColumns: string[];
  dataEmployee = new MatTableDataSource<Employee>();
  // dialog: string;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor (
    private _titleService: Title,
    private _employeeService: EmployeeService,
    private _matDialog: MatDialog,
    private _helpersService: HelpersService,
    private _activatedRoute: ActivatedRoute
    ) {
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
      error: (error) => {
        // if (error) {}
        console.log(error);

        this._helpersService.showAlert("Could not load employees.", "Error!", 5000);
      }
    });
  }

  addNewEmployee () {
    this._matDialog.open(AddEditEmployeeComponent, {
      disableClose: true,
      width: '600px'
    }).afterClosed().subscribe(result => {
      // console.log(result);

      if (result === 'created') {
        this.getEmployees();
      }
    })
  }

  detailsEmployee (employee: Employee) {
    this._matDialog.open(DetailsEmployeeComponent, {
      disableClose: false,
      data: employee,
      width: '600px'
    }).afterClosed().subscribe(result => {
      if (result == 'edit') {
        this.editEmployee(employee);
      }
    });
  }

  editEmployee (employee: Employee) {
    this._matDialog.open(AddEditEmployeeComponent, {
      disableClose: true,
      data: employee,
      width: '600px'
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
              this._helpersService.showAlert("Employee deleted successfully.", "Success!", 5000);
              this.getEmployees();
            } else {
              this._helpersService.showAlert("Could not delete employee.", "Error!", 5000);
            }
          },
          error: (error) => {
            this._helpersService.showAlert("Could not delete employee.", "Error!", 5000);
          }
        })
      }
    })
  }

  ngOnInit(): void {
    this.getEmployees();
  }

  ngAfterViewInit(): void {
    this.dataEmployee.paginator = this.paginator;
  }
}
