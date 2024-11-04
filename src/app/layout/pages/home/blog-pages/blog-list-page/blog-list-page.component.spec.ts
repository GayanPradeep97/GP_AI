import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogListPageComponent } from './blog-list-page.component';

describe('BlogListPageComponent', () => {
  let component: BlogListPageComponent;
  let fixture: ComponentFixture<BlogListPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlogListPageComponent]
    });
    fixture = TestBed.createComponent(BlogListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
