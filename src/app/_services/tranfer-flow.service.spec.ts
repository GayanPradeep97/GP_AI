import { TestBed } from '@angular/core/testing';

import { TranferFlowService } from './tranfer-flow.service';

describe('TranferFlowService', () => {
  let service: TranferFlowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranferFlowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
