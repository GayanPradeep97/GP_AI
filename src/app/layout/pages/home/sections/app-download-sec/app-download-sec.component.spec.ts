import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDownloadSecComponent } from './app-download-sec.component';

describe('AppDownloadSecComponent', () => {
  let component: AppDownloadSecComponent;
  let fixture: ComponentFixture<AppDownloadSecComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppDownloadSecComponent]
    });
    fixture = TestBed.createComponent(AppDownloadSecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
