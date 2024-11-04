import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenificaryDetailsComponent } from './benificary-details.component';

describe('BenificaryDetailsComponent', () => {
  let component: BenificaryDetailsComponent;
  let fixture: ComponentFixture<BenificaryDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BenificaryDetailsComponent]
    });
    fixture = TestBed.createComponent(BenificaryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
