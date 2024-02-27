import { Component, inject, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { inputValidators, passwordValidator, emailValidator } from '../../../shared/validators/validators';
import { CommonModule } from '@angular/common';
import { UserDTO } from '../dto/user.dto';
import { RegisterService } from '../services/register.service';
import { Router } from '@angular/router';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  @ViewChild('successModal') successModal!: ElementRef;

  registerUserForm: FormGroup;
  emailRegisteredError: boolean = false;
  showErrorAlert: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';
  private modalInstance: Modal | null = null;
  router = inject(Router)

  constructor(private fb: FormBuilder,
    private _registerServ: RegisterService) {

    this.registerUserForm = this.fb.group({
      name: ['', [Validators.required, inputValidators(150, 8)]],
      email: ['', [Validators.required, emailValidator()]],
      password: ['', [Validators.required, passwordValidator()]],
      role: ['Support']
    });

    this.registerUserForm.get('email')?.valueChanges.subscribe(() => {
      this.emailRegisteredError = false; 
      this.showErrorAlert = false; 
    });
  }

  async onSubmit() {
    this.emailRegisteredError = false;

    if (this.registerUserForm.valid) {
      const newUser: UserDTO = this.registerUserForm.value;
      try {
        const response = await this._registerServ.register(newUser);
        this.showSuccessModal("El usuario se ha registrado exitosamente.");
        this.resetFormAndVariables();
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Ocurrió un error desconocido.';

        if (errorMessage.includes('Email already register')) {
          this.errorMessage = 'El correo electrónico ya está registrado. Por favor, utiliza otro correo.';
          this.emailRegisteredError = true; 
        } else {
          this.errorMessage = 'Crear usuario fallido. Por favor, verifica tus credenciales.';
          this.emailRegisteredError = false; 
        }
        this.showErrorAlert = true;
      }
    } else {
      this.showErrorAlert = true;
      this.errorMessage = 'Por favor, corrija los errores antes de enviar.';
      this.markAllAsTouched(this.registerUserForm);
    }
  }

  getErrorMessage(controlName: string): string | null {
    const control = this.registerUserForm.get(controlName);

    if (control && control.errors) {
      if (control.errors['required']) {
        return 'Este campo es obligatorio.';
      }
      if (control.errors['minLength']) {
        return `El campo debe tener al menos ${control.errors['minLength'].requiredLength} caracteres. Actualmente tiene ${control.errors['minLength'].actualLength}.`;
      }
      if (control.errors['maxLength']) {
        return `El campo no puede exceder de ${control.errors['maxLength'].requiredLength} caracteres. Actualmente tiene ${control.errors['maxLength'].actualLength}.`;
      }
      if (control.errors['pattern']) {
        return 'El campo contiene caracteres inválidos.';
      }
      if (control.errors['emailFormat']) {
        return 'El formato del correo no es válido.';
      }
      if (control.errors['passwordStrength']) {
        return 'La contraseña debe contener solo letras y números.';
      }
    }
    return null;
  }

  markAllAsTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
    });
  }
  
  showSuccessModal(message: string): void {
    this.successMessage = message;
    this.modalInstance = new Modal(this.successModal.nativeElement);
    this.modalInstance.show();
  }

  closeSuccessModal(): void {
    if (this.modalInstance) {
      this.modalInstance.hide();
      this.modalInstance = null;
    }
  }

  private resetFormAndVariables(): void {
    this.registerUserForm.reset();
    this.errorMessage = "";
    this.successMessage = "";
    this.emailRegisteredError = false
    this.showErrorAlert = false;
  }
}
