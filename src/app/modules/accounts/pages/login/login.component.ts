import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'fadi-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formModel = {
    UserName: '',
    Password: ''
  }
  constructor() { }

  ngOnInit() {
    // if (localStorage.getItem('token') != null)
    //   this.router.navigateByUrl('/home');
  }

  onSubmit(form: NgForm) {
    // this.service.login(form.value).subscribe(
    //   (res: any) => {
    //     localStorage.setItem('token', res.token);
    //     this.router.navigateByUrl('/home');
    //   },
    //   err => {
    //     if (err.status == 400)
    //       this.toastr.error('Incorrect username or password.', 'Authentication failed.');
    //     else
    //       console.log(err);
    //   }
    // );
  }
}
