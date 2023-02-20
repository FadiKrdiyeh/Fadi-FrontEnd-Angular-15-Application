import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HelpersService } from './../../../../core/services/helpers.service';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../../../../core/authentication/authentication.service';
import { environment as env } from '../../../../../environment/environment';
import { User } from '../../../../shared/models/user';

@Component({
  selector: 'fadi-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string;
  password: string;
  visiblePasswordInput: boolean;

  constructor (
    private _authenticationService: AuthenticationService,
    private _helpersService: HelpersService,
    private _router: Router
    ) {
    this.username = '';
    this.password = '';
    this.visiblePasswordInput = false;
  }

  login (loginForm: NgForm) {
    // console.log(loginForm);
    const credentials = {
      'username': loginForm.value.username,
      'password': loginForm.value.password
    }

    this._authenticationService.login$(credentials).subscribe({
      next: (data) => {
        if (data.status) {
          // this.showAlert("Logged in successfully!", "Success");
          this._helpersService.showAlert("Logged in successfully!", "Success!", 5000);

          console.log(data.value);

          const user: User = {
            'username': data.value.username,
            'fullName': data.value.fullName,
            'id': '',
            'token': data.value.token
          }

          // const token = data.value;
          localStorage.setItem(env.usernameLocalStorageKey, user.username || '');
          localStorage.setItem(env.tokenLocalStorageKey, user.token || '');
          this._router.navigate(['/']);
          // console.log(token);

          // console.log("success: ", data.value);
        } else {
          // this.showAlert("Invalid username or password!", "Error!");
          this._helpersService.showAlert("Invalid username or password!", "Error!", 5000);
          this.username = '';
          this.password = '';
          // console.log("failed: ", data.value);
        }
      },
      error: (error) => {
        // this.showAlert("Logging in failed!", "Error!");
        // this.showAlert("Invalid username or password!", "Error!");
        this._helpersService.showAlert("Invalid username or password!", "Error!", 5000);
        this.username = '';
        this.password = '';
        // console.log(error);
      },
    });
  }
}
