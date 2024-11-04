import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateAccountDocumentationComponent } from './corporate-account-documentation.component';

describe('CorporateAccountDocumentationComponent', () => {
  let component: CorporateAccountDocumentationComponent;
  let fixture: ComponentFixture<CorporateAccountDocumentationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CorporateAccountDocumentationComponent]
    });
    fixture = TestBed.createComponent(CorporateAccountDocumentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
