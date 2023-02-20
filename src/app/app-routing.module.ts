import { LoggedInGuard } from './core/guards/logged-in.guard';
import { AuthenticationGuard } from './core/guards/authentication.guard';
import { HomeComponent } from './core/home/home.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "account", loadChildren: () => import('@modules/accounts/accounts.module').then(module => module.AccountsModule) },
  { path: "department", loadChildren: () => import('@modules/departments/departments.module').then(module => module.DepartmentsModule), canActivate: [AuthenticationGuard] },
  { path: "employee", loadChildren: () => import('@modules/employees/employees.module').then(module => module.EmployeesModule), canActivate: [AuthenticationGuard] },
  { path: "**", component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
