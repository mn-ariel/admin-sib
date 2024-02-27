import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../assets/environments/environment';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserDTO } from '../dto/user.dto';
import { RegisterResponse } from '../register.response';
import { Router } from '@angular/router';
import { ErrorResponse, handleErrorResponse } from '../../../shared/utils/error-handling';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient,
    private router: Router) { }

  async register(newUser: UserDTO): Promise<RegisterResponse> {
    try {
      const response = await firstValueFrom(
        this.http.post<RegisterResponse>(`${this.apiUrl}/auth/sign-up/`, newUser)
      );
      return response;
    } catch (error: any) { 
      console.error("Error original:", error);

      const parsedError = handleErrorResponse(error);
      const errorMessage = parsedError.message ? parsedError.message.toString() : "Ocurrió un error desconocido.";
      throw new Error(errorMessage);
    }
  }

}
