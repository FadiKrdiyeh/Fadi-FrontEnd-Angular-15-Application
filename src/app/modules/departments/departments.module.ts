import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentsRoutingModule } from './departments-routing.module';
import { DetailsDepartmentComponent } from './pages/details-department/details-department.component';
import { ListDepartmentsComponent } from './pages/list-departments/list-departments.component';
import { AddEditDepartmentComponent } from './pages/add-edit-department/add-edit-department.component';
import { DeleteDepartmentComponent } from './pages/delete-department/delete-department.component';


@NgModule({
  declarations: [
    AddEditDepartmentComponent,
    DetailsDepartmentComponent,
    ListDepartmentsComponent,
    DeleteDepartmentComponent
  ],
  imports: [
    CommonModule,
    DepartmentsRoutingModule
  ]
})
export class DepartmentsModule { }
