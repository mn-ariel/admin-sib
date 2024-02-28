import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginDTO } from '../dto/login.dto';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  formulario: FormGroup;
  showErrorAlert = false;
  errorMessage = '';
  router = inject(Router)

  constructor(private fb: FormBuilder,
    private _usersServ: AuthService) {

    this.formulario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

  }

  async onSubmit() {
    this.showErrorAlert = false;

    if (this.formulario.valid) {
      const userDto: LoginDTO = this.formulario.value;

      try {
        const response = await this._usersServ.login(userDto);

        this._usersServ.storeTokenAndExpiration(response.access_token);

        this.router.navigate(['/home']);
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        this.errorMessage = 'Inicio de sesión fallido. Por favor, verifica tus credenciales.';
        this.showErrorAlert = true;
      }
    } else {
      this.errorMessage = 'Por favor, completa todos los campos correctamente.';
      this.showErrorAlert = true;
    }
  }

}