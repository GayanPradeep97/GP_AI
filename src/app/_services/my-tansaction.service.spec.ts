import { TestBed } from '@angular/core/testing';

import { MyTansactionService } from './my-tansaction.service';

describe('MyTansactionService', () => {
  let service: MyTansactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyTansactionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
