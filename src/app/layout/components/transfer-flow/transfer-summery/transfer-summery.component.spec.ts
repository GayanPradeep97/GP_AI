import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferSummeryComponent } from './transfer-summery.component';

describe('TransferSummeryComponent', () => {
  let component: TransferSummeryComponent;
  let fixture: ComponentFixture<TransferSummeryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransferSummeryComponent]
    });
    fixture = TestBed.createComponent(TransferSummeryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
