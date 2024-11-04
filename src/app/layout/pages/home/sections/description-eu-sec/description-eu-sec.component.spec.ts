import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionEuSecComponent } from './description-eu-sec.component';

describe('DescriptionEuSecComponent', () => {
  let component: DescriptionEuSecComponent;
  let fixture: ComponentFixture<DescriptionEuSecComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DescriptionEuSecComponent]
    });
    fixture = TestBed.createComponent(DescriptionEuSecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
