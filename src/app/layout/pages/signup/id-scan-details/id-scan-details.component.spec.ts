import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdScanDetailsComponent } from './id-scan-details.component';

describe('IdScanDetailsComponent', () => {
  let component: IdScanDetailsComponent;
  let fixture: ComponentFixture<IdScanDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IdScanDetailsComponent]
    });
    fixture = TestBed.createComponent(IdScanDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
