import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../interfaces/auth-service';
import { AuthZeroService } from '../services/authzero.service';
import { KeycloakService } from '../services/keycloak.service';
import { IdentityConfigService } from './identity-config.service';
import { IdentityService } from '../services/identity.service';
import { OidcAuthService } from '../services/oidc-auth.service';
import { SigninCallbackComponent } from '../signin-callback/signin-callback.component';

export function initializeApp(identityConfigService: IdentityConfigService): () => Promise<void> {
  return () => {
      return identityConfigService.loadConfig().then((config) => {
        identityConfigService.setConfig(config);
      });
  };
}

@NgModule({
  declarations: [
    SigninCallbackComponent
  ],
  imports: [
    CommonModule
  ],
  providers:[
    { provide: AuthService, useClass: AuthZeroService },
    IdentityService,
    IdentityConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [IdentityConfigService],
      multi: true
    },
    OidcAuthService
  ]
})
export class IdentityModule { }
