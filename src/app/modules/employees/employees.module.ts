import { DragDropModule } from '@angular/cdk/drag-drop';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { AddEditEmployeeComponent } from './components/add-edit-employee/add-edit-employee.component';
import { ListEmployeesComponent } from './pages/list-employees/list-employees.component';
import { DetailsEmployeeComponent } from './components/details-employee/details-employee.component';
import { DeleteEmployeeComponent } from './components/delete-employee/delete-employee.component';


/**
 * Employee module for employees components
 *
 * @export
 * @class EmployeesModule
 */
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
