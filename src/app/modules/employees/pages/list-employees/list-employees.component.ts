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
    private _helpersService: HelpersService
    ) {
    this._titleService.setTitle("Employees");
    this.displayedColumns = ["FirstName", "LastName", "Department", "Address", "Salary", "Phone", "Actions"];
  }

  /**
   * Filter employees in table
   *
   * @param {Event} event
   * @memberof ListEmployeesComponent
   */
  applyFilter (event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataEmployee.filter = filterValue.trim().toLowerCase();
  }

  /**
   * Call employee service to get all employees and show in table
   *
   * @memberof ListEmployeesComponent
   */
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
        // console.log(error);

        this._helpersService.showAlert("Could not load employees.", "Error!", 5000);
      }
    });
  }

  /**
   * Open add-edit component in dialog with add action
   *
   * @memberof ListEmployeesComponent
   */
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

  /**
   * Open details component in dialog and call edit function if closed with edit button click
   *
   * @param {Employee} employee
   * @memberof ListEmployeesComponent
   */
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

  /**
   * Open add-edit component in dialog with edit action and show data in fields
   *
   * @param {Employee} employee
   * @memberof ListEmployeesComponent
   */
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

  /**
   * Open delete component in dialog with delete action
   *
   * @param {Employee} employee
   * @memberof ListEmployeesComponent
   */
  deleteEmployee (employee: Employee) {
    this._matDialog.open(DeleteEmployeeComponent, {
      disableClose: true,
      data: employee,
    }).afterClosed().subscribe(result => {
      // console.log(employeeId);

      if (result === 'delete') {
        this.getEmployees();
      }
    })
  }

  /**
   * Show employees in table when component initialized
   *
   * @memberof ListEmployeesComponent
   */
  ngOnInit(): void {
    this.getEmployees();
  }

  ngAfterViewInit(): void {
    this.dataEmployee.paginator = this.paginator;
  }
}
