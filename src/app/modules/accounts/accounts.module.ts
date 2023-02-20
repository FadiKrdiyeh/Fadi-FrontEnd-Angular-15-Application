import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountsRoutingModule } from './accounts-routing.module';
import { FormsModule } from '@angular/forms';
import { LoginRegisterComponent } from './pages/login-register/login-register.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ListUsersComponent } from './pages/list-users/list-users.component';


@NgModule({
  declarations: [
    LoginRegisterComponent,
    RegisterComponent,
    LoginComponent,
    ListUsersComponent
  ],
  imports: [
    CommonModule,
    AccountsRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class AccountsModule { }
