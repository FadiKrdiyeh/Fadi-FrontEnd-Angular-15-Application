import { LoggedInGuard } from './../../core/guards/logged-in.guard';
import { ListUsersComponent } from './pages/list-users/list-users.component';
import { AuthenticationGuard } from './../../core/guards/authentication.guard';
import { LoginRegisterComponent } from './pages/login-register/login-register.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: LoginRegisterComponent, data: { tabIndex: 0 }, canActivate: [LoggedInGuard] },
  { path: "register", component: LoginRegisterComponent, data: { tabIndex: 1 }, canActivate: [LoggedInGuard] },
  { path: "users", component: ListUsersComponent, canActivate: [AuthenticationGuard] }
];

/**
 * Routes for account pages
 *
 * @export
 * @class AccountsRoutingModule
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsRoutingModule { }
