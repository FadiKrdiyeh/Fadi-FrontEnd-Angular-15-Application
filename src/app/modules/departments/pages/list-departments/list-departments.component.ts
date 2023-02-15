import { AddEditDepartmentComponent } from './../add-edit-department/add-edit-department.component';
import { MatDialog } from '@angular/material/dialog';
import { DepartmentService } from './../../../../core/services/department.service';
import { MatPaginator } from '@angular/material/paginator';
import { Department } from './../../../../shared/models/department';
import { MatTableDataSource } from '@angular/material/table';
import { RoutingAnimation } from './../../../../shared/animations/routing.animation';
import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'fadi-list-departments',
  templateUrl: './list-departments.component.html',
  styleUrls: ['./list-departments.component.scss'],
  animations: [RoutingAnimation]
})
export class ListDepartmentsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[];
  dataDepartments = new MatTableDataSource<Department>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor (private _titleService: Title, private departmentService: DepartmentService, private _matDialog: MatDialog) {
    this._titleService.setTitle('Departments');
    this.displayedColumns = ["Id", "Name", "Actions"];
  }

  applyFilter (event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataDepartments.filter = filterValue.trim().toLowerCase();
  }

  getDepartments () {
    this.departmentService.getDepartments$().subscribe({
      next: (data) => {
        if (data.status) {
          this.dataDepartments.data = data.value;
        }
      },
      error(error) {},
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
