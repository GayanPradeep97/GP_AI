import { TestBed } from '@angular/core/testing';

import { PrimaryIdService } from './primary-id.service';

describe('PrimaryIdService', () => {
  let service: PrimaryIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrimaryIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
