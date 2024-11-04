import { TestBed } from '@angular/core/testing';

import { AgentSenderDataService } from './agent-sender-data.service';

describe('AgentSenderDataService', () => {
  let service: AgentSenderDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgentSenderDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
