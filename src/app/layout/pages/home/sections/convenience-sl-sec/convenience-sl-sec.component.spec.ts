import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvenienceSlSecComponent } from './convenience-sl-sec.component';

describe('ConvenienceSlSecComponent', () => {
  let component: ConvenienceSlSecComponent;
  let fixture: ComponentFixture<ConvenienceSlSecComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConvenienceSlSecComponent]
    });
    fixture = TestBed.createComponent(ConvenienceSlSecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
