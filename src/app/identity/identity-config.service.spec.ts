import { TestBed } from '@angular/core/testing';

import { IdentityConfigService } from './identity-config.service';

describe('IdentityConfigService', () => {
  let service: IdentityConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdentityConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
