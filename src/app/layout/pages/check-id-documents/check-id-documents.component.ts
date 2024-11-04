import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { DataService } from 'src/app/_services/shared-data/data.service';

@Component({
  selector: 'app-check-id-documents',
  templateUrl: './check-id-documents.component.html',
  styleUrls: ['./check-id-documents.component.sass'],
})
export class CheckIdDocumentsComponent {
  constructor(
    private router: Router,
    private modalRef: NzModalRef,
    private dataService: DataService
  ) {}

  ngOnInit() {}

  OpenSettingPage() {
    this.router.navigate(['/dashboard/settings']);
    this.dataService.popupClick = true;
    this.dataService.settingtSelectedIndex = 1;
    this.modalRef.close();
  }
}
