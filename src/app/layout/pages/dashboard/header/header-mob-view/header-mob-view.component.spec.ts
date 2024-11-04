import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderMobViewComponent } from './header-mob-view.component';

describe('HeaderMobViewComponent', () => {
  let component: HeaderMobViewComponent;
  let fixture: ComponentFixture<HeaderMobViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderMobViewComponent]
    });
    fixture = TestBed.createComponent(HeaderMobViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
