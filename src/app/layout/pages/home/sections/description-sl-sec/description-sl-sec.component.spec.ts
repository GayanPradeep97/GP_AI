import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionSlSecComponent } from './description-sl-sec.component';

describe('DescriptionSlSecComponent', () => {
  let component: DescriptionSlSecComponent;
  let fixture: ComponentFixture<DescriptionSlSecComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DescriptionSlSecComponent]
    });
    fixture = TestBed.createComponent(DescriptionSlSecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
