import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfterLoginPopoupComponent } from './after-login-popoup.component';

describe('AfterLoginPopoupComponent', () => {
  let component: AfterLoginPopoupComponent;
  let fixture: ComponentFixture<AfterLoginPopoupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AfterLoginPopoupComponent]
    });
    fixture = TestBed.createComponent(AfterLoginPopoupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
