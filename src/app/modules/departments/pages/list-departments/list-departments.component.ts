import { HelpersService } from './../../../../core/services/helpers.service';
import { AddEditDepartmentComponent } from '../../components/add-edit-department/add-edit-department.component';
import { MatDialog } from '@angular/material/dialog';
import { DepartmentService } from './../../../../core/services/department.service';
import { MatPaginator } from '@angular/material/paginator';
import { Department } from './../../../../shared/models/department';
import { MatTableDataSource } from '@angular/material/table';
import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DetailsDepartmentComponent } from '../../components/details-department/details-department.component';
import { DeleteDepartmentComponent } from '../../components/delete-department/delete-department.component';

@Component({
  selector: 'fadi-list-departments',
  templateUrl: './list-departments.component.html',
  styleUrls: ['./list-departments.component.scss']
})
export class ListDepartmentsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[];
  dataDepartments = new MatTableDataSource<Department>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor (
    private _titleService: Title,
    private _departmentService: DepartmentService,
    private _matDialog: MatDialog,
    private _helpersService: HelpersService
    ) {
    this._titleService.setTitle('Departments');
    this.displayedColumns = ["Id", "Name", "Actions"];
  }

  /**
   * Filter departments in table
   *
   * @param {Event} event
   * @memberof ListDepartmentsComponent
   */
  applyFilter (event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataDepartments.filter = filterValue.trim().toLowerCase();
  }

  /**
   * Call department service to get all departments and show in table
   *
   * @memberof ListDepartmentsComponent
   */
  getDepartments () {
    this._departmentService.getDepartments$().subscribe({
      next: (data) => {
        if (data.status) {
          this.dataDepartments.data = data.value;
        } else {
          this._helpersService.showAlert("Could not load departments.", "Error!", 5000);
        }
      },
      error: (error) => {
        this._helpersService.showAlert("Could not load departments.", "Error!", 5000);
      }
    });
  }

  /**
   * Open add-edit component in dialog with add action
   *
   * @memberof ListDepartmentsComponent
   */
  addNewDepartment () {
    this._matDialog.open(AddEditDepartmentComponent, {
      disableClose: true,
      width: '400px',
    }).afterClosed().subscribe(result => {
      if (result == 'created') {
        this.getDepartments();
      }
    });
  }

  /**
   * Open details component in dialog and call edit function if closed with edit button click
   *
   * @param {Department} department
   * @memberof ListDepartmentsComponent
   */
  detailsDepartment (department: Department) {
    this._matDialog.open(DetailsDepartmentComponent, {
      disableClose: false,
      data: department,
      width: '500px'
    }).afterClosed().subscribe(result => {
      if (result == 'edit') {
        this.editDepartment(department);
      }
    });
  }

  /**
   * Open add-edit component in dialog with edit action and show data in fields
   *
   * @param {Department} department
   * @memberof ListDepartmentsComponent
   */
  editDepartment (department: Department) {
    this._matDialog.open(AddEditDepartmentComponent, {
      disableClose: true,
      data: department,
      width: '400px'
    }).afterClosed().subscribe(result => {
      if (result == 'edited') {
        this.getDepartments();
      }
    });
  }

  /**
   * Open delete component in dialog with delete action
   *
   * @param {Department} deparment
   * @memberof ListDepartmentsComponent
   */
  deleteDepartment(deparment: Department) {
    this._matDialog.open(DeleteDepartmentComponent, {
      disableClose: true,
      data: deparment
    }).afterClosed().subscribe(result => {
      if (result == 'delete') {
        this.getDepartments();
      }
    })
  }

  /**
   * Show departments in table when component initialized
   *
   * @memberof ListDepartmentsComponent
   */
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getDepartments();
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.dataDepartments.paginator = this.paginator;
  }
}
