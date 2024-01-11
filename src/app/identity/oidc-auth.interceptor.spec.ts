import { TestBed } from '@angular/core/testing';

import { OidcAuthInterceptor } from './oidc-auth.interceptor';

describe('OidcAuthInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      OidcAuthInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: OidcAuthInterceptor = TestBed.inject(OidcAuthInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
