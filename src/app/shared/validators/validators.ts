import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function inputValidators(maxLength: number = 150, minLength: number = 8): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    const errors: ValidationErrors = {};

    if (!value) {
      errors['required'] = 'Este campo es obligatorio.';
    }
    if (value && value.length < minLength) {
      errors['minLength'] = { requiredLength: minLength, actualLength: value.length };
    }
    if (value && value.length > maxLength) {
      errors['maxLength'] = { requiredLength: maxLength, actualLength: value.length };
    }
    if (value && !/^[a-zA-Z ÑñáéíóúÁÉÍÓÚüÜ ]*$/.test(value)) {
      errors['pattern'] = { requiredPattern: '^[a-zA-Z ÑñáéíóúÁÉÍÓÚüÜ ]*$', actualValue: value };
    }

    return Object.keys(errors).length ? errors : null;
  };
}

export function emailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    const errors: ValidationErrors = {};

    if (!value) {
      errors['required'] = 'Este campo es obligatorio.';
    }

    if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      errors['emailFormat'] = { requiredPattern: '^[^\s@]+@[^\s@]+\.[^\s@]+$', actualValue: value };
    }    

    return Object.keys(errors).length ? errors : null;
  };
}

export function passwordValidator(maxLength: number = 25, minLength: number = 8): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    const errors: ValidationErrors = {};

    if (!value) {
      errors['required'] = 'Este campo es obligatorio.';
    }
    if (value && value.length < minLength) {
      errors['minLength'] = { requiredLength: minLength, actualLength: value.length };
    }
    if (value && value.length > maxLength) {
      errors['maxLength'] = { requiredLength: maxLength, actualLength: value.length };
    }
    const isAlphanumeric = /^[0-9a-zA-Z]+$/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasLetter = /[a-zA-Z]/.test(value);

    if (!hasNumber || !hasLetter || !isAlphanumeric) {
      errors['passwordStrength'] = 'La contraseña debe contener solo letras y números.';
    }

    return Object.keys(errors).length ? errors : null;
  };
}

