import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  constructor(private _matSnackBar: MatSnackBar) { }

  public showAlert (message: string, title: string, duration: number = 3000) {
    this._matSnackBar.open(message, title, {
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      duration: duration
    })
  }
}
