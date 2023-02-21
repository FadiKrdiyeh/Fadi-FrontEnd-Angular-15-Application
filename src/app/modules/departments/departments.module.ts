import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentsRoutingModule } from './departments-routing.module';

import { ListDepartmentsComponent } from './pages/list-departments/list-departments.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';

import { AddEditDepartmentComponent } from './components/add-edit-department/add-edit-department.component';
import { DetailsDepartmentComponent } from './components/details-department/details-department.component';
import { DeleteDepartmentComponent } from './components/delete-department/delete-department.component';

import { DragDropModule } from '@angular/cdk/drag-drop';


/**
 * Department module for department components
 *
 * @export
 * @class DepartmentsModule
 */
@NgModule({
  declarations: [
    AddEditDepartmentComponent,
    DetailsDepartmentComponent,
    ListDepartmentsComponent,
    DeleteDepartmentComponent
  ],
  imports: [
    CommonModule,
    DepartmentsRoutingModule,
    SharedModule,
    FormsModule,
    DragDropModule
  ]
})
export class DepartmentsModule { }
