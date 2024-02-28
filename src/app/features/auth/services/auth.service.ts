import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../assets/environments/environment';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginDTO } from '../dto/login.dto';
import { LoginResponse } from '../login.response';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient,
    private router: Router) { }

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

  public storeTokenAndExpiration(token: string, name: string): void {
    const expiresIn = 20 * 60 * 1000;
    const expiresAt = new Date().getTime() + expiresIn;
    localStorage.setItem('access_token', token);
    localStorage.setItem('expires_at', expiresAt.toString());
    localStorage.setItem('name_user', name)
  }

  tokenHasExpired(): boolean {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = expiration ? parseInt(expiration, 10) : 0;
    return new Date().getTime() > expiresAt;
  }

  logout(): void {
    localStorage.removeItem('access_token')
    localStorage.removeItem('expires_at');
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    if (this.tokenHasExpired()) {
      this.logout();
      return null;
    }
    return localStorage.getItem('access_token');
  }

  getUser(): string | null {
    if (this.tokenHasExpired()) {
      this.logout();
      return null;
    }
    return localStorage.getItem('name_user');
  }

}
