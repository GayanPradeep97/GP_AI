import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupContinueComponent } from './signup-continue.component';

describe('SignupContinueComponent', () => {
  let component: SignupContinueComponent;
  let fixture: ComponentFixture<SignupContinueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignupContinueComponent]
    });
    fixture = TestBed.createComponent(SignupContinueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
