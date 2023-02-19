import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'fadi-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  fullName: string = '';

  constructor () {}

  register (registerForm: NgForm) {
    console.log(registerForm);

  }
}
