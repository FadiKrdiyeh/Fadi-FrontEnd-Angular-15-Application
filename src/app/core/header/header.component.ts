import { environment as env } from './../../../environment/environment';
import { HelpersService } from './../services/helpers.service';
import { AuthenticationService } from './../authentication/authentication.service';
import { Component, EventEmitter, Output, OnInit, HostListener } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'fadi-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isDark: boolean = localStorage.getItem('FadiApplicationTheme') == 'dark' ? true : false;
  toggleControl = new FormControl(this.isDark);
  username: string = '';

  isOffline: boolean = false;
  @HostListener('window:offline', ['$event']) isWindowOffline (event:any) {
    // console.log('Offline? ', event);
    this.isOffline = true;
  }

  @Output() themeEvent = new EventEmitter<string>();

  constructor (private _authenticationService: AuthenticationService, private _helpersService: HelpersService) {}

  /**
   * Call function from authentication service
   * Check if user is authenticated or not
   * @return {*} {boolean}
   * @memberof HeaderComponent
   */
  isUserAuthenticated (): boolean {
    return this._authenticationService.isUserAuthenticated$();
  }

  /**
   * Call function from authentication service
   * Logout user when click on logout button
   * @memberof HeaderComponent
   */
  logout () {
    if (this._authenticationService.logout$()) {
      this._helpersService.showAlert("Logged out successfully.", "Success!", 5000);
    } else {
      this._helpersService.showAlert("Cannot logging out.", "Error!", 5000);
    }
  }

  /**
   * Get username from localStorage if user authenticated and show it in the header
   *
   * @return {*} {string}
   * @memberof HeaderComponent
   */
  getUsername (): string {
    if (this._authenticationService.isUserAuthenticated$()) {
      setTimeout(() => {
        this.username = localStorage.getItem(env.usernameLocalStorageKey) || '';
      }, Math.random() * 5000);
    }
    return this.username;
  }

  /**
   * Run when component initialized
   * Send selected theme to parent component
   * Show username
   * @memberof HeaderComponent
   */
  ngOnInit(): void {
    this.toggleControl.valueChanges.subscribe((darkMode) => {
      const darkClassName = 'darkMode';
      this.themeEvent.emit(darkMode ? darkClassName : '');
      // console.log(darkMode, ' ', this.toggleControl.value);
    });

    this.getUsername();
  }
}
