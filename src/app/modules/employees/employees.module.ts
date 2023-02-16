import { DragDropModule } from '@angular/cdk/drag-drop';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { AddEditEmployeeComponent } from './pages/add-edit-employee/add-edit-employee.component';
import { DetailsEmployeeComponent } from './pages/details-employee/details-employee.component';
import { ListEmployeesComponent } from './pages/list-employees/list-employees.component';
import { DeleteEmployeeComponent } from './pages/delete-employee/delete-employee.component';


@NgModule({
  declarations: [
    AddEditEmployeeComponent,
    DetailsEmployeeComponent,
    ListEmployeesComponent,
    DeleteEmployeeComponent
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    SharedModule,
    DragDropModule
  ]
})
export class EmployeesModule { }
