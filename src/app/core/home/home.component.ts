import { Title } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'fadi-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private _title: Title, private _authenticationService: AuthenticationService) {
    this._title.setTitle("Home");
    // let token = this._authenticationService.tokenGetter$();
    // console.log(JSON.parse(token));
  }
}
