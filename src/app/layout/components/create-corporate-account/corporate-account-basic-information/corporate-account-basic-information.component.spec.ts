import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateAccountBasicInformationComponent } from './corporate-account-basic-information.component';

describe('CorporateAccountBasicInformationComponent', () => {
  let component: CorporateAccountBasicInformationComponent;
  let fixture: ComponentFixture<CorporateAccountBasicInformationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CorporateAccountBasicInformationComponent]
    });
    fixture = TestBed.createComponent(CorporateAccountBasicInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
