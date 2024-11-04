import { TestBed } from '@angular/core/testing';

import { ContactusQueryDataService } from './contactus-query-data.service';

describe('ContactusQueryDataService', () => {
  let service: ContactusQueryDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactusQueryDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
