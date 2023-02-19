import { LoginRegisterComponent } from './pages/login-register/login-register.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: LoginRegisterComponent, data: { tabIndex: 0 } },
  { path: "register", component: LoginRegisterComponent, data: { tabIndex: 1 } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsRoutingModule { }
