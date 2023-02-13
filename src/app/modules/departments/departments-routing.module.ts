import { DeleteDepartmentComponent } from './pages/delete-department/delete-department.component';
import { DetailsDepartmentComponent } from './pages/details-department/details-department.component';
import { ListDepartmentsComponent } from './pages/list-departments/list-departments.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditDepartmentComponent } from './pages/add-edit-department/add-edit-department.component';

const routes: Routes = [
  {
    path: "",
    component: ListDepartmentsComponent,
    children: [
      { path: "details/:id", component: DetailsDepartmentComponent },
      { path: "add", component: AddEditDepartmentComponent },
      { path: "edit/:id", component: AddEditDepartmentComponent },
      { path: "delete/:id", component: DeleteDepartmentComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentsRoutingModule { }
