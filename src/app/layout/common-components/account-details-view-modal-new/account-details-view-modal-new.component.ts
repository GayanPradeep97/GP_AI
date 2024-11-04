import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { DataService } from 'src/app/_services/shared-data/data.service';

@Component({
  selector: 'app-account-details-view-modal-new',
  templateUrl: './account-details-view-modal-new.component.html',
  styleUrls: ['./account-details-view-modal-new.component.sass'],
})
export class AccountDetailsViewModalNewComponent {
  constructor(private modalRef: NzModalRef, private router: Router,     public dataService: DataService) {}

  // closeModal() {
  //   this.modalRef.destroy();
  // }

  openDashboard() {
    // this.router.navigateByUrl('/dashboard');
    this.modalRef.destroy();
  }
}
