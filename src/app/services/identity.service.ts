import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../interfaces/auth-service';
import { IdentityClientSettings } from '../IdentityClientSettings';

@Injectable({
  providedIn: 'root'
})
export class IdentityService {

  constructor(private authService: AuthService) {
    this.isAuthenticated$ = authService.isAuthenticated$;
  }

  isAuthenticated$: Observable<boolean>;

  initialize(settings: IdentityClientSettings): void{
    this.authService.initialize(settings);
    this.isAuthenticated$ = this.authService.isAuthenticated$;
  }

  login(): void {
    this.authService.login();
  }
  logout(): void {
    this.authService.logout();
  }
}
