import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'fadi-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss']
})
export class LoginRegisterComponent implements OnInit {
  tabIndex: number;

  constructor (private _activatedRoute: ActivatedRoute, private _location: Location) {
    this.tabIndex = 0;
  }

  changeUrl (tabSelected: MatTabChangeEvent) {
    // console.log(tabSelected.tab.textLabel.toLowerCase());
    // console.log(this._location.);
    // this._router.navigate(["account", tabSelected.tab.textLabel.toLowerCase()]);
    this._location.replaceState(`account/${tabSelected.tab.textLabel.toLowerCase()}`);
  }

  ngOnInit(): void {
    // console.log(this._activatedRoute.data);
    this._activatedRoute.data.subscribe(t => this.tabIndex = t['tabIndex']);
    // console.log(this.tabIndex);
    // console.log("Token is: ", this._authenticationService.isUserAuthenticated());
  }
}
