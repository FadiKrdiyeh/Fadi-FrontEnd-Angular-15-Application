import { DeleteEmployeeComponent } from './pages/delete-employee/delete-employee.component';
import { AddEditEmployeeComponent } from './pages/add-edit-employee/add-edit-employee.component';
import { DetailsEmployeeComponent } from './pages/details-employee/details-employee.component';
import { ListEmployeesComponent } from './pages/list-employees/list-employees.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    component: ListEmployeesComponent,
    children: [
      { path: "details/:id", component: DetailsEmployeeComponent },
      { path: "add", component: AddEditEmployeeComponent },
      { path: "edit/:id", component: AddEditEmployeeComponent },
      { path: "delete/:id", component: DeleteEmployeeComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
