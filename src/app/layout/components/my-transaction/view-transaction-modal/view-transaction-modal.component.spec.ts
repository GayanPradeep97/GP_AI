import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTransactionModalComponent } from './view-transaction-modal.component';

describe('ViewTransactionModalComponent', () => {
  let component: ViewTransactionModalComponent;
  let fixture: ComponentFixture<ViewTransactionModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewTransactionModalComponent]
    });
    fixture = TestBed.createComponent(ViewTransactionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
