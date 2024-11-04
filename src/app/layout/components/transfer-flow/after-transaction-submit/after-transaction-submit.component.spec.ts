import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfterTransactionSubmitComponent } from './after-transaction-submit.component';

describe('AfterTransactionSubmitComponent', () => {
  let component: AfterTransactionSubmitComponent;
  let fixture: ComponentFixture<AfterTransactionSubmitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AfterTransactionSubmitComponent]
    });
    fixture = TestBed.createComponent(AfterTransactionSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
