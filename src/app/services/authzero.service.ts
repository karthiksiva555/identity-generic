import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AuthService } from '../interfaces/auth-service';
import { IdentityClientSettings } from '../IdentityClientSettings';
import { OidcAuthService } from './oidc-auth.service';
import { UserManagerSettings } from 'oidc-client-ts';

@Injectable({
  providedIn: 'root'
})
export class AuthZeroService implements AuthService {

  constructor(private oidcAuthService: OidcAuthService) { }

  isAuthenticated$: Observable<boolean> = this.oidcAuthService.isLoggedIn();

  initialize(settings: IdentityClientSettings): void {
    console.log("initializing auth0 config");

    // auth0 specific settings
    const identitySettings: UserManagerSettings = {
      authority: settings.customDomain,
      client_id: settings.myAdminAppClientId,
      redirect_uri: `${settings.clientRoot}signin-callback`,
      post_logout_redirect_uri: `${settings.clientRoot}login`,
      response_type: 'code',
      scope: settings.scope,
      metadata:{
        issuer: `${settings.customDomain}`,
        token_endpoint: `${settings.customDomain}/oauth/token`,
        authorization_endpoint: `${settings.customDomain}/authorize`,
        userinfo_endpoint: `${settings.customDomain}/userinfo`,
        end_session_endpoint: `${settings.customDomain}/v2/logout?client_id=${settings.myAdminAppClientId}&returnTo=${settings.clientRoot}login` //?client_id=${settings.myAdminAppClientId}&returnTo=${settings.clientRoot}
      }
    };
    this.oidcAuthService.initialize(identitySettings);
  }

  login(): void {
    console.log('login method from Auth0');
    this.oidcAuthService.login();
  }

  logout(): void {
    console.log('logout from Auth0');
    this.oidcAuthService.logout();
  }
}
