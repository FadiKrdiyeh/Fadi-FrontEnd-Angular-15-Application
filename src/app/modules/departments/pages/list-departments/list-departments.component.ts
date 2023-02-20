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

  applyFilter (event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataDepartments.filter = filterValue.trim().toLowerCase();
  }

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

  deleteDepartment(deparment: Department) {
    this._matDialog.open(DeleteDepartmentComponent, {
      disableClose: true,
      data: deparment
    }).afterClosed().subscribe(result => {
      if (result == 'delete') {
        this._departmentService.deleteDepartment$(deparment.departmentId).subscribe({
          next: (data) => {
            if (data.status) {
              this._helpersService.showAlert("Department deleted successfully.", "Success!", 5000);
              this.getDepartments();
            } else {
              this._helpersService.showAlert("Could not delete department.", "Error!", 5000);
            }
          },
          error: (error) => {
            this._helpersService.showAlert("Could not delete department.", "Error!", 5000);
          },
        })
      }
    })
  }

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
