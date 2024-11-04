import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTransactionComponent } from './my-transaction.component';

describe('MyTransactionComponent', () => {
  let component: MyTransactionComponent;
  let fixture: ComponentFixture<MyTransactionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyTransactionComponent]
    });
    fixture = TestBed.createComponent(MyTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
