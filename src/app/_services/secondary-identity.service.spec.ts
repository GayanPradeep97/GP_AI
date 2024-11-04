import { TestBed } from '@angular/core/testing';

import { SecondaryIdentityService } from './secondary-identity.service';

describe('SecondaryIdentityService', () => {
  let service: SecondaryIdentityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecondaryIdentityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
