import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDetailsViewModalNewComponent } from './account-details-view-modal-new.component';

describe('AccountDetailsViewModalNewComponent', () => {
  let component: AccountDetailsViewModalNewComponent;
  let fixture: ComponentFixture<AccountDetailsViewModalNewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountDetailsViewModalNewComponent]
    });
    fixture = TestBed.createComponent(AccountDetailsViewModalNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
