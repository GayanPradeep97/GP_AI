import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRouteComponent } from './home-route.component';

describe('HomeRouteComponent', () => {
  let component: HomeRouteComponent;
  let fixture: ComponentFixture<HomeRouteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeRouteComponent]
    });
    fixture = TestBed.createComponent(HomeRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
