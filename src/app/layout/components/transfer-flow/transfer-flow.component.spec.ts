import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferFlowComponent } from './transfer-flow.component';

describe('TransferFlowComponent', () => {
  let component: TransferFlowComponent;
  let fixture: ComponentFixture<TransferFlowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransferFlowComponent]
    });
    fixture = TestBed.createComponent(TransferFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
