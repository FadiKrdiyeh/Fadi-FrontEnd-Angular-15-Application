import { CoreModule } from './core/core.module';
import { DepartmentsModule } from './modules/departments/departments.module';
import { EmployeesModule } from './modules/employees/employees.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { HttpErrorInterceptor } from './core/interceptors/http-error.interceptor';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthenticationService } from './core/authentication/authentication.service';

function tokenGetter (): string {
  return AuthenticationService.prototype.tokenGetter$();
}


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    EmployeesModule,
    DepartmentsModule,
    CoreModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:7045"],
        disallowedRoutes: []
      }
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor (private _router: Router) {
    // // For Debugging: Show all routes...
    // const replacer = (key: any, value: any) => typeof value === 'function' ? value.name : value
    // console.log('Routes: ', JSON.stringify(_router.config, replacer, 2));
  }
}
