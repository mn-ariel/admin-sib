import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    const token = localStorage.getItem('access_token');
    const expiresAt = localStorage.getItem('expires_at');
    const currentTime = new Date().getTime();

    if (token && expiresAt && parseInt(expiresAt) > currentTime) {
      return true; 
    } else {
      this.router.navigate(['/login']); 
      return false;
    }
  }
}
