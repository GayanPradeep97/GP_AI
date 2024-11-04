import { TestBed } from '@angular/core/testing';

import { CoporateSenderDataService } from './coporate-sender-data.service';

describe('CoporateSenderDataService', () => {
  let service: CoporateSenderDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoporateSenderDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
