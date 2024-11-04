import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckIdDocumentsComponent } from './check-id-documents.component';

describe('CheckIdDocumentsComponent', () => {
  let component: CheckIdDocumentsComponent;
  let fixture: ComponentFixture<CheckIdDocumentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckIdDocumentsComponent]
    });
    fixture = TestBed.createComponent(CheckIdDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
