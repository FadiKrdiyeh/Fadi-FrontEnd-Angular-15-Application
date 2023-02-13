import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: "", redirectTo: "account/login", pathMatch: "full" },
  { path: "account", loadChildren: () => import('@modules/accounts/accounts.module').then(module => module.AccountsModule) },
  { path: "department", loadChildren: () => import('@modules/departments/departments.module').then(module => module.DepartmentsModule) },
  { path: "employee", loadChildren: () => import('@modules/employees/employees.module').then(module => module.EmployeesModule) },
  { path: "**", component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
