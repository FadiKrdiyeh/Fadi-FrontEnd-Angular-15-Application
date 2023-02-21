import { AuthenticationService } from './../../core/authentication/authentication.service';
import { map, Observable, delay, empty, of } from 'rxjs';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";

export function usernameValidator (authenticationService: AuthenticationService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    let regWhiteSpaces: RegExp = new RegExp(/[\s!@#\$%\^\&*\)\(\[\]\{\}\'\"\\\/<>,?~`;:+=.-]/g);

    if (regWhiteSpaces.test(control.value)) {
      return of({ usernameWhiteSpaces: true })
    }

    return checkUserName(control).pipe(
      map(res => {
        console.log("result is ", res);
        return res.value ? { userNameExist: true } : null;
      })
    )
  }

  function checkUserName (controlValue: AbstractControl): Observable<any> {
    return authenticationService.checkUsername$(controlValue.value).pipe(delay(300));
  }
}
