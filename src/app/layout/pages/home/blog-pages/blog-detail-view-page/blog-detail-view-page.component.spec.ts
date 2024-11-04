import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogDetailViewPageComponent } from './blog-detail-view-page.component';

describe('BlogDetailViewPageComponent', () => {
  let component: BlogDetailViewPageComponent;
  let fixture: ComponentFixture<BlogDetailViewPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlogDetailViewPageComponent]
    });
    fixture = TestBed.createComponent(BlogDetailViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
