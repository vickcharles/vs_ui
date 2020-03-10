import { FormGroup } from '@angular/forms';

// custom validator to check that two fields match
export function MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }
        
        // set error on matchingControl if validation fails
        if (control.value != matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}

export function typeOfService(controlName: string, controlName2: string,) {
    
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const control2 = formGroup.controls[controlName2];

        if (control2.errors && !control2.errors.emptyCampTypeOfService) {
            return;
        }

        if (control.value == 'transporte de carga' && !control2.value) {
            control2.setErrors({ emptyCampTypeOfService: true });
        } else if (control.value == 'alquiler de montacarga' && !control2.value) {
            control2.setErrors({ emptyCampTypeOfService: true });
        } else if (control.value == 'alquiler de grúa' && !control2.value) {
            control2.setErrors({ emptyCampTypeOfService: true });
        } else {
            control2.setErrors(null);
        }
    }
}

export function companyName(controlName: string, controlName2: string,) {
    
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const control2 = formGroup.controls[controlName2];

        if (control2.errors && !control2.errors.emptyCampCompanyName) {
            return;
        }

        if (control.value == 'empresa' && !control2.value) {
            control2.setErrors({ emptyCampCompanyName: true });
        } else {
            control2.setErrors(null);
        }
    }
}

export function destination(controlName2: string,) {
    
    return (formGroup: FormGroup) => {
        const control = formGroup.controls.tipoDeServicio.value.nombre;
        const control2 = formGroup.controls[controlName2];

        if (control2.errors && !control2.errors.emptyCampDestination) {
            return;
        }
        
        if (control == 'transporte de carga' && !control2.value) {
            control2.setErrors({ emptyCampDestination: true });
        } else {
            control2.setErrors(null);
        }

    }
}

export function confirmation(controlName2: string,) {
    
    return (formGroup: FormGroup) => {
        const control = formGroup.controls.tipoDeServicio.value.nombre;
        const control2 = formGroup.controls[controlName2];

        if (control2.errors && !control2.errors.emptyCampDestination) {
            return;
        }
        
        if (control == 'transporte de carga' && !control2.value) {
            control2.setErrors({ emptyCampConfirmation: true });
        } else {
            control2.setErrors(null);
        }

    }
}