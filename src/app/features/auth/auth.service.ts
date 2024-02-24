import { Injectable } from '@angular/core';
import { environment } from './../../../assets/environments/environment';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginDTO } from './dto/login.dto';
import { LoginResponse } from './login.response'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  async login(formValue: LoginDTO): Promise<LoginResponse> {

    try {
      const response = await firstValueFrom(
        this.http.post<LoginResponse>(`${this.apiUrl}/auth/sign-in/`, formValue)
      );
      return response;
    } catch (error) {
      throw error;
    }
    
  }

}
