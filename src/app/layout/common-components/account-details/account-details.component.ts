import { Component } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.sass']
})
export class AccountDetailsComponent {

  constructor(private modalRef: NzModalRef,) {}
  openDashboard() {
    // this.router.navigateByUrl('/dashboard');
    this.modalRef.destroy();
  }

}
