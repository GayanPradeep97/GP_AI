import { TestBed } from '@angular/core/testing';

import { CurrencyConversionLocalService } from './currency-conversion-local.service';

describe('CurrencyConversionLocalService', () => {
  let service: CurrencyConversionLocalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrencyConversionLocalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
