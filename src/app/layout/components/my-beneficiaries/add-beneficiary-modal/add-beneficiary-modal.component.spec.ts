import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBeneficiaryModalComponent } from './add-beneficiary-modal.component';

describe('AddBeneficiaryModalComponent', () => {
  let component: AddBeneficiaryModalComponent;
  let fixture: ComponentFixture<AddBeneficiaryModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddBeneficiaryModalComponent]
    });
    fixture = TestBed.createComponent(AddBeneficiaryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
