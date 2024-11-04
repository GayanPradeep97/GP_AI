import { TestBed } from '@angular/core/testing';

import { AgentDetailsDataServiceService } from './agent-details-data.service';

describe('AgentDetailsDataServiceService', () => {
  let service: AgentDetailsDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgentDetailsDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
