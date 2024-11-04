import { TestBed } from '@angular/core/testing';

import { CorporateAccountsChangeService } from './corporate-accounts-change.service';

describe('CorporateAccountsChangeService', () => {
  let service: CorporateAccountsChangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorporateAccountsChangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
