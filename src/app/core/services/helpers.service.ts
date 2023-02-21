import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Service for helper methods like notification message
 *
 * @export
 * @class HelpersService
 */
@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  constructor(private _matSnackBar: MatSnackBar) { }

  /**
   * This function for show a material snack bar message after a operator
   * Expect 3 arguments
   * @param {string} message The message will show
   * @param {string} title The title if the message is succes or error
   * @param {number} [duration=3000] The time to disappear message
   * @memberof HelpersService
   */
  public showAlert (message: string, title: string, duration: number = 3000) {
    this._matSnackBar.open(message, title, {
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      duration: duration
    })
  }
}
