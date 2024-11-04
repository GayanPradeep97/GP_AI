import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturesEuSecComponent } from './features-eu-sec.component';

describe('FeaturesEuSecComponent', () => {
  let component: FeaturesEuSecComponent;
  let fixture: ComponentFixture<FeaturesEuSecComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeaturesEuSecComponent]
    });
    fixture = TestBed.createComponent(FeaturesEuSecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
