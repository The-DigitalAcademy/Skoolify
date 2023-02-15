import { TestBed } from '@angular/core/testing';

import { AddvehicleService } from './addvehicle.service';

describe('AddvehicleService', () => {
  let service: AddvehicleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddvehicleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
