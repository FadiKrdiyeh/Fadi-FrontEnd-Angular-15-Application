import { ListDepartmentsComponent } from './pages/list-departments/list-departments.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditDepartmentComponent } from './components/add-edit-department/add-edit-department.component';
import { DetailsDepartmentComponent } from './components/details-department/details-department.component';
import { DeleteDepartmentComponent } from './components/delete-department/delete-department.component';

const routes: Routes = [
  {
    path: "",
    component: ListDepartmentsComponent,
    // children: [
    //   { path: "add", component: AddEditDepartmentComponent },
    //   { path: "details/:id", component: DetailsDepartmentComponent },
    //   { path: "edit/:id", component: AddEditDepartmentComponent },
    //   { path: "delete/:id", component: DeleteDepartmentComponent }
    // ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentsRoutingModule { }
