import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactUsHomePageComponent } from './contact-us-home-page.component';

describe('ContactUsHomePageComponent', () => {
  let component: ContactUsHomePageComponent;
  let fixture: ComponentFixture<ContactUsHomePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactUsHomePageComponent]
    });
    fixture = TestBed.createComponent(ContactUsHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
