import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferBeneficiaryComponent } from './transfer-beneficiary.component';

describe('TransferBeneficiaryComponent', () => {
  let component: TransferBeneficiaryComponent;
  let fixture: ComponentFixture<TransferBeneficiaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransferBeneficiaryComponent]
    });
    fixture = TestBed.createComponent(TransferBeneficiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
