import { TestBed } from '@angular/core/testing';

import { MyBeneficiaryService } from './my-beneficiary.service';

describe('MyBeneficiaryService', () => {
  let service: MyBeneficiaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyBeneficiaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
