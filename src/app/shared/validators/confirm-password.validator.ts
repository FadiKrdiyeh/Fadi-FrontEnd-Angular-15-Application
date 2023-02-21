import { FormGroup, ValidationErrors } from "@angular/forms";

/**
 * Custom validator for check if password and confirm password fields are matched
 *
 * @export
 * @param {string} password
 * @param {string} confirmPassword
 * @return {*}  {ValidationErrors}
 */
export function confirmPassword (password: string, confirmPassword: string): ValidationErrors {
  return (formGroup: FormGroup): { [key: string]: boolean } | null => {
    const passwordControl = formGroup.controls[password];
    const confirmPasswordControl = formGroup.controls[confirmPassword];

    // console.log(formGroup);

    if (passwordControl.dirty && confirmPasswordControl.dirty && passwordControl.value != confirmPasswordControl.value) {
    // if (true) {
      confirmPasswordControl.setErrors({ notMatch: true });
      return { 'notMatch': true };
    }
    return null;
  }
}
