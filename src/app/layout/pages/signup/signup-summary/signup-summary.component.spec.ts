import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupSummaryComponent } from './signup-summary.component';

describe('SignupSummaryComponent', () => {
  let component: SignupSummaryComponent;
  let fixture: ComponentFixture<SignupSummaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignupSummaryComponent]
    });
    fixture = TestBed.createComponent(SignupSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
