import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBeneficiaryModalComponent } from './view-beneficiary-modal.component';

describe('ViewBeneficiaryModalComponent', () => {
  let component: ViewBeneficiaryModalComponent;
  let fixture: ComponentFixture<ViewBeneficiaryModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewBeneficiaryModalComponent]
    });
    fixture = TestBed.createComponent(ViewBeneficiaryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
