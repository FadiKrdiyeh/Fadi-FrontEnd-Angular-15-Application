import { Title } from '@angular/platform-browser';
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

  constructor (
    private _title: Title,
    private _activatedRoute: ActivatedRoute,
    private _location: Location
    ) {
    this.tabIndex = 0;
  }

  /**
   * Change url when change tab between login and register
   *
   * @param {MatTabChangeEvent} tabSelected The tab selected
   * @memberof LoginRegisterComponent
   */
  changeUrl (tabSelected: MatTabChangeEvent) {
    // console.log(tabSelected.tab.textLabel.toLowerCase());
    // console.log(this._location.);
    // this._router.navigate(["account", tabSelected.tab.textLabel.toLowerCase()]);
    this._location.replaceState(`account/${tabSelected.tab.textLabel.toLowerCase()}`);
    this._title.setTitle(tabSelected.tab.textLabel);
  }

  /**
   * Select tab depend on routing
   * Change title
   * @memberof LoginRegisterComponent
   */
  ngOnInit(): void {
    // console.log(this._activatedRoute.data);
    this._activatedRoute.data.subscribe(t => {
      this.tabIndex = t['tabIndex'];
      if (this.tabIndex == 0) {
        this._title.setTitle("Login");
      } else if (this.tabIndex == 1) {
        this._title.setTitle("Register");
      } else {
        this._title.setTitle("Account");
      }
    });
    // console.log(this.tabIndex);
    // console.log("Token is: ", this._authenticationService.isUserAuthenticated());
  }
}
