import { User } from './../../../../shared/models/user';
import { Router } from '@angular/router';
import { HelpersService } from './../../../../core/services/helpers.service';
import { AuthenticationService } from './../../../../core/authentication/authentication.service';
import { Component } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { environment as env } from '../../../../../environment/environment';
import { confirmPassword } from '../../../../shared/validators/confirm-password.validator';
import { usernameValidator } from '../../../../shared/validators/check-username-async.validator';

@Component({
  selector: 'fadi-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  username: FormControl;

  registerForm: FormGroup;

  visiblePasswordInput: boolean;
  visibleConfirmPasswordInput: boolean;

  constructor (
    private _authenticationService: AuthenticationService,
    private _helpersService:HelpersService,
    private _router: Router,
    private _formBuilder: FormBuilder
    ) {
    this.username = new FormControl('', [Validators.required], [usernameValidator(_authenticationService)]);

    this.registerForm = this._formBuilder.group({
      username: this.username,
      password: ['', [Validators.required]],
      confirmPassword: [''],
      fullName: ['', [Validators.required]]
    }, {
      validators: [confirmPassword('password', 'confirmPassword')]
    });

    this.visiblePasswordInput = false;
    this.visibleConfirmPasswordInput = false;
  }

  /**
   * Get username control for access in html
   *
   * @readonly
   * @memberof RegisterComponent
   */
  get Username () {
    return this.registerForm.controls['username'];
  }
  /**
   * Get password control for access in html
   *
   * @readonly
   * @memberof RegisterComponent
   */
  get Password () {
    return this.registerForm.controls['password'];
  }
  /**
   * Get confirmPassword control for access in html
   *
   * @readonly
   * @memberof RegisterComponent
   */
  get ConfirmPassword () {
    return this.registerForm.controls['confirmPassword'];
  }
  /**
   * Get fullName control for access in html
   *
   * @readonly
   * @memberof RegisterComponent
   */
  get FullName () {
    return this.registerForm.controls['fullName'];
  }

  /**
   * Call authentication serivce to register a new user and show message with result
   *
   * @memberof RegisterComponent
   */
  register () {
    console.log(this.registerForm);
    const user = {
      'username': this.registerForm.value.username,
      'password': this.registerForm.value.password,
      'fullName': this.registerForm.value.fullName
    }

    this._authenticationService.register$(user).subscribe({
      next: (data) => {
        if (data.status) {
          this._helpersService.showAlert("Registration succeed!", "Success!", 5000);

          const user: User = {
            'username': data.value.username,
            'fullName': data.value.fullName,
            'id': '',
            'token': data.value.token
          }

          localStorage.setItem(env.usernameLocalStorageKey, user.username || '');
          localStorage.setItem(env.tokenLocalStorageKey, user.token || '');
          this._router.navigate(['/']);
        } else {
          this._helpersService.showAlert("Invalid data!", "Error!", 5000);
        }
      },
      error: (error) => {
        this._helpersService.showAlert("Invalid data!", "Error!", 5000);
      }
    })
  }
}
