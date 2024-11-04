import { TestBed } from '@angular/core/testing';

import { TransferFlow2Service } from './transfer-flow2.service';

describe('TransferFlow2Service', () => {
  let service: TransferFlow2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransferFlow2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
