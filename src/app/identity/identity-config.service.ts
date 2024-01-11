import { Injectable } from '@angular/core';
import { IdentityClientSettings } from '../IdentityClientSettings';
import { IdentityService } from '../services/identity.service';

@Injectable({
  providedIn: 'root'
})
export class IdentityConfigService {

  constructor(private identityService: IdentityService) { }

  async loadConfig(): Promise<IdentityClientSettings> {
    // const response = await fetch('/api/v1/EnvironmentSettings/IdentityClientSettings');
    // return await response.json();

    await new Promise(resolve => setTimeout(resolve, 1000));

    //Keycloak settings
    // const keycloakSettings: IdentityClientSettings = {
    //   customDomain: 'https://gcekcdsvrt1.geotab.com:8443/realms/dev',
    //   myAdminAppClientId: 'sample-angular',
    //   scope: 'openid profile email',
    //   cacheLocation: 'localStorage',
    //   useRefreshTokens: false,
    //   audience: 'sample',
    //   clientRoot: 'http://localhost:4200/'
    // };
    // return keycloakSettings;

    const authZeroSettings: IdentityClientSettings = {
      customDomain: 'https://dev.geotab.auth0app.com',
      myAdminAppClientId: 'klYw7yW2QApN1adqafPpUyjt3X0teOhs',
      scope: 'openid profile email http://localhost:5000',
      cacheLocation: 'localStorage',
      useRefreshTokens: false,
      audience: 'http://localhost:5000',
      clientRoot: 'http://localhost:4200/'
    }

    return authZeroSettings;
  }

  setConfig(settings: IdentityClientSettings) {
    console.log("calling initialize method of the library" + JSON.stringify(settings));
    this.identityService.initialize(settings);
  }

}
