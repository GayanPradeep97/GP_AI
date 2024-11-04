import { Component } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { TokenStorageServiceService } from 'src/app/_services/token-storage-service.service';
import { CheckIdDocumentsComponent } from '../../check-id-documents/check-id-documents.component';

@Component({
  selector: 'app-after-login-popoup',
  templateUrl: './after-login-popoup.component.html',
  styleUrls: ['./after-login-popoup.component.sass'],
})
export class AfterLoginPopoupComponent {
  constructor(
    private modelref: NzModalRef,
    private tokenStorageService: TokenStorageServiceService,
    private modalService: NzModalService
  ) {}

  closeModel() {
    this.modelref.close();
    window.location.reload();
  }
}
