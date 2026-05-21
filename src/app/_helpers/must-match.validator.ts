import { AbstractControl, ValidatorFn } from '@angular/forms';

export function MustMatch(controlName: string, matchingControlName: string): ValidatorFn {
    return (formGroup: AbstractControl) => {
        const control = formGroup.get(controlName);
        const matchingControl = formGroup.get(matchingControlName);

        if (!control || !matchingControl) return null;

        // return null if controls haven't initialised yet
        if (!control || !matchingControl) return null;

        // return null if another validator has already found an error on the matchingControl
        if (matchingControl.errors && !matchingControl.errors['mustMatch']) return null;

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
        return null;
    };
}