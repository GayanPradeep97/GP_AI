import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsSecComponent } from './questions-sec.component';

describe('QuestionsSecComponent', () => {
  let component: QuestionsSecComponent;
  let fixture: ComponentFixture<QuestionsSecComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionsSecComponent]
    });
    fixture = TestBed.createComponent(QuestionsSecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
