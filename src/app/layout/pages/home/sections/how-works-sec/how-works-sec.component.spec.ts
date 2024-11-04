import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HowWorksSecComponent } from './how-works-sec.component';

describe('HowWorksSecComponent', () => {
  let component: HowWorksSecComponent;
  let fixture: ComponentFixture<HowWorksSecComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HowWorksSecComponent]
    });
    fixture = TestBed.createComponent(HowWorksSecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
