import { TestBed } from '@angular/core/testing';

import { AuthusersService } from './authusers.service';

describe('AuthusersService', () => {
  let service: AuthusersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthusersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
