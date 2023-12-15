import { TestBed } from '@angular/core/testing';

import { AuthZeroService } from './authzero.service';

describe('AuthzeroService', () => {
  let service: AuthZeroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthZeroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
