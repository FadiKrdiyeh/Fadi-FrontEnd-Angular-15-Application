import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from './../../../../core/authentication/authentication.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'fadi-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss']
})
export class LoginRegisterComponent implements OnInit {
  tabIndex: number;
  lUsername: string = '';
  lPassword: string = '';
  rUsername: string = '';
  rPassword: string = '';
  rFullName: string = '';

  constructor (private _activatedRoute: ActivatedRoute, private _location: Location, private _authentication: AuthenticationService, private _matSnackBar: MatSnackBar, private _router: Router) {
    this.tabIndex = 0;
  }

  changeUrl (tabSelected: MatTabChangeEvent) {
    // console.log(tabSelected.tab.textLabel.toLowerCase());
    // console.log(this._location.);
    // this._router.navigate(["account", tabSelected.tab.textLabel.toLowerCase()]);
    this._location.replaceState(`account/${tabSelected.tab.textLabel.toLowerCase()}`);
  }

  login (loginForm: NgForm) {
    console.log(loginForm);
    const credentials = {
      'username': loginForm.value.lUsername,
      'password': loginForm.value.lPassword
    }

    this._authentication.login$(credentials).subscribe({
      next: (data) => {
        if (data.status) {
          this.showAlert("Logged in successfully!", "Success");
          const token = data.value;
          localStorage.setItem("FadiKrdiyehAngularApplicationJWTToken", token);
          this._router.navigate(['/']);
          // console.log(token);

          // console.log("success: ", data.value);
        } else {
          this.showAlert("Invalid username or password!", "Error!");
          // console.log("failed: ", data.value);
        }
      },
      error: (error) => {
        // this.showAlert("Logging in failed!", "Error!");
        this.showAlert("Invalid username or password!", "Error!");
        // console.log(error);
      },
    });
  }
  register (registerForm: NgForm) {
    console.log(registerForm);

  }

  ngOnInit(): void {
    // console.log(this._activatedRoute.data);
    this._activatedRoute.data.subscribe(t => this.tabIndex = t['tabIndex']);
    // console.log(this.tabIndex);
  }

  showAlert (message: string, title: string) {
    this._matSnackBar.open(message, title, {
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      duration: 5000
    })
  }
}
