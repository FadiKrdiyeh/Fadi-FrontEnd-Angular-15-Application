import { ListEmployeesComponent } from './pages/list-employees/list-employees.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    component: ListEmployeesComponent,
    children: [
      // { path: "add", component: ListEmployeesComponent, data: { dialog: 0 } },
      // { path: "details/:id", component: DetailsEmployeeComponent, data: { dialog: 1 } },
      // { path: "edit/:id", component: AddEditEmployeeComponent, data: { dialog: 2 } },
      // { path: "delete/:id", component: DeleteEmployeeComponent, data: { dialog: 3 } }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
