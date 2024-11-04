import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Subject, takeUntil } from 'rxjs';
import { CommonService } from 'src/app/_services/common.service';
import { CoporateSenderDataService } from 'src/app/_services/coporate-sender-data.service';
import { TokenService } from 'src/app/_services/token.service';
import { CorporateAccountBasicInformationComponent } from '../corporate-account-basic-information/corporate-account-basic-information.component';

interface UploadedDocumentData {
  documentPath: string | null;
  documentName: string;
  uploadedOn: Date | null;
  uploadedBy: string;
  deletedOn: Date | null;
  deletedBy: string | null;
  agentUserCooperateSenderDetailsId: {
    agentUserCooperateSenderDetailsId: string;
  };
}
@Component({
  selector: 'app-corporate-account-documentation',
  templateUrl: './corporate-account-documentation.component.html',
  styleUrls: ['./corporate-account-documentation.component.sass'],
})
export class CorporateAccountDocumentationComponent {
  currentDate = new Date();
  fileList: NzUploadFile[] = [];

  @Input() agentUserCoporateSenderDetailsId: any;

  uploadedDocumentData: any; //used
  documentDetailsArray: UploadedDocumentData[] = [];
  agentCustomerData: any; //used
  documentDetailsString: any;
  documentDetailsSet: any;

  public unsubscribe$ = new Subject<void>();

  constructor(
    private commonService: CommonService,
    private tokenService: TokenService,
    private coporateSenderDataService: CoporateSenderDataService,
    private notificationService: NzNotificationService,
    private modalRef: NzModalRef
  ) {
    this.agentCustomerData = this.commonService.parseJwt(
      tokenService.getToken()
    );
  }
  ngOninIt() {}

  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    this.setUploadedDocumentDetails();
    return false;
  };

  setUploadedDocumentDetails() {
    this.fileList.forEach((file: NzUploadFile) => {
      this.uploadedDocumentData = {
        // agentCooperateUploadDocumentId: 1,
        // documentPath: null,
        documentName: file.name,
        // uploadedOn: null,
        // uploadedBy: this.agentCustomerData.sub,
        // deletedOn: null,
        // deletedBy: null,
        // agentUserCooperateSenderDetailsId: {
        //   agentUserCooperateSenderDetailsId:
        //     this.agentUserCoporateSenderDetailsId,
        // },
      };
    });
    this.documentDetailsArray.push(this.uploadedDocumentData);
  }

  uploadDocuments(): void {
    if (this.fileList.length <= 0) {
      this.notificationService.create(
        'error',
        'Input Error',
        'At least one document should upload',
        { nzStyle: { background: '#cc2d2d' } }
      );
    } else {
      const formData = new FormData();

      this.fileList.forEach((file: any) => {
        formData.append('documents', file);
        formData.append(
          'documentDetails',
          JSON.stringify(this.documentDetailsArray)
        );
      });

      const data: any = {};
      data['coorporateId'] = this.agentUserCoporateSenderDetailsId;
      // data['documentDetails'] = JSON.stringify(this.documentDetailsArray);

      this.coporateSenderDataService
        .uploadCoporateSenderDocuments(data, formData)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe({
          next: (res: any) => {
            if (res['responseDto']) {
              const message = res['responseDto'];
              this.notificationService.create(
                'success',
                'Success',
                'Corporate Sender Details Saved Successfully',
                {
                  nzStyle: { background: '#00A03E', color: '#fff' },
                }
              );
              this.closeModal();
            } else {
              const message = res['responseDto'];
              this.notificationService.create('error', 'Error', message, {
                nzStyle: { background: '#cc2d2d', color: '#fff' },
              });
            }
          },
          error: (err: any) => {
            this.notificationService.create(
              'error',
              'Error',
              'Documents uploading failed',
              { nzStyle: { background: '#cc2d2d', color: '#fff' } }
            );
          },
        });
    }
  }

  resetForm() {
    this.fileList = [];
    this.documentDetailsArray = [];
  }

  closeModal() {
    this.modalRef.destroy();
  }

  removeFile = (receivedDataFile: any) => {
    this.documentDetailsArray.forEach((uploadedDocumentData: any) => {
      if (uploadedDocumentData.documentName === receivedDataFile.name) {
        this.fileList.forEach((file: any, index) => {
          if (uploadedDocumentData.documentName === file.name) {
            this.fileList.splice(this.fileList.indexOf(file), 1);
            this.fileList = this.fileList.slice();
            this.documentDetailsArray.splice(
              this.documentDetailsArray.indexOf(uploadedDocumentData),
              1
            );
          }
        });
      }
    });
  };
}
