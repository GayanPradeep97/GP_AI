import { TestBed } from '@angular/core/testing';

import { CreateCorporateAccountService } from './create-corporate-account.service';

describe('CreateCorporateAccountService', () => {
  let service: CreateCorporateAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateCorporateAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
