// reference: https://jasonwatmore.com/post/2018/11/07/angular-7-reactive-forms-validation-example //

import { FormGroup } from '@angular/forms';

export function PasswordValidation(controlPassword: string, matchPassword: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlPassword];
    const matchingControl = formGroup.controls[matchPassword];

    if (matchingControl.errors && !matchingControl.errors.PasswordValidation) {
      return;
    }

    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ PasswordValidation: true });
    } else {
      matchingControl.setErrors(null);
    }
  }
}
