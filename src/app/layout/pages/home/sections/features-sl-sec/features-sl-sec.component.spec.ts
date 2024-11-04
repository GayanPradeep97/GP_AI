import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturesSlSecComponent } from './features-sl-sec.component';

describe('FeaturesSlSecComponent', () => {
  let component: FeaturesSlSecComponent;
  let fixture: ComponentFixture<FeaturesSlSecComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeaturesSlSecComponent]
    });
    fixture = TestBed.createComponent(FeaturesSlSecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
