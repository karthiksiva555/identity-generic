import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AuthService } from '../interfaces/auth-service';
import { IdentityClientSettings } from '../IdentityClientSettings';
import { UserManagerSettings } from 'oidc-client-ts';
import { OidcAuthService } from './oidc-auth.service';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService implements AuthService {

  constructor(private oidcAuthService: OidcAuthService) { }

  isAuthenticated$: Observable<boolean> = this.oidcAuthService.isLoggedIn();

  initialize(settings: IdentityClientSettings){
    console.log('initializing keycloak config');

    // keycloak related settings
    const identitySettings: UserManagerSettings = {
      authority: settings.customDomain,
      client_id: settings.myAdminAppClientId,
      redirect_uri: `${settings.clientRoot}signin-callback`,
      post_logout_redirect_uri: `${settings.clientRoot}login`,
      response_type: 'code',
      scope: settings.scope
    };
    this.oidcAuthService.initialize(identitySettings);
  }

  login(): void {
    console.log('login method from keycloak');
    this.oidcAuthService.login();
  }
  logout(): void {
    console.log('logout from keycloak');
    this.oidcAuthService.logout();
  }
}
