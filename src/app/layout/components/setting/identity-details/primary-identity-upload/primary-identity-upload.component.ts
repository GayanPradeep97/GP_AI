import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import format from 'date-fns/format';
import { Observable, Observer, Subject, takeUntil } from 'rxjs';
import { PrimaryIdService } from 'src/app/_services/primary-id.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CommonService } from 'src/app/_services/common.service';
import { SettingService } from 'src/app/_services/setting.service';
import { TokenService } from 'src/app/_services/token.service';
import { TokenStorageServiceService } from 'src/app/_services/token-storage-service.service';
import { CorporateAccountsChangeService } from 'src/app/_services/corporate-accounts-change.service';
import { DataService } from 'src/app/_services/shared-data/data.service';

@Component({
  selector: 'app-primary-identity-upload',
  templateUrl: './primary-identity-upload.component.html',
  styleUrls: ['./primary-identity-upload.component.sass'],
})
export class PrimaryIdentityUploadComponent {
  public primaryIdentityUploadForm!: FormGroup;
  receivedCustomerData: any;
  agentExposableId: any;
  agentSenderDetailsId: any;
  userId: any;
  emailAddress: any;
  dateOfBirth: any;
  birthPlace: any;
  currentActiveUserAccount: any;
  identityTypes: any;

  frontFileList: NzUploadFile[] = [];
  backFileList: NzUploadFile[] = [];
  frontAvatarUrl!: string;
  backAvatarUrl!: string;
  frontLoading = false;
  backLoading = false;
  frontUploaded = false;
  backUploaded = false;
  receivedAgentData: any;
  previewModalVisible = false;
  viewFront = true;
  viewBack = true;
  showBackImgUpload = true;
  customerData: any;
  customerImageData: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  //temporary create services
  //

  url: any;
  currentUser: any;
  user_id: any;
  profile_img1: any;
  profile_img2: any;
  constructor(
    private formBuilder: FormBuilder,
    private primaryIdService: PrimaryIdService,
    private notificationService: NzNotificationService,
    private commonService: CommonService,
    private settingsService: SettingService,
    private tokenService: TokenService,
    private tokenStorageService: TokenStorageServiceService,
    private corporateAccountsChangeService: CorporateAccountsChangeService,
    private dataService: DataService
  ) {
    this.currentUser = this.commonService.parseJwt(tokenService.getToken());
  }

  ngOnInit() {
    this.primaryIdentityUploadForm = this.formBuilder.group({
      identityType: [null, Validators.required],
    });

    this.getExposableId();
  }

  dateFormatter(date: string) {
    return format(new Date(date), 'yyyy-MM-dd');
  }

  get identityType() {
    return this.primaryIdentityUploadForm.get('identityType');
  }

  getFieldName(option: any): any {
    switch (option) {
      case 'identityType': {
        return 'Primary Identity Type';
      }
    }
  }
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        if (!control.value && control.errors) {
          control.markAsDirty();
          control.updateValueAndValidity();
          const fieldName = this.getFieldName(field);
          this.notificationService.create(
            'error',
            fieldName + ' cannot be empty',
            ''
          );
        } else {
          // this.isFieldValid(field);
        }
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  getExposableId() {
    const data: any = {};
    data['username'] = this.tokenStorageService.getUser();
    this.settingsService
      .getExposableIdByUsername(data)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.user_id = res['responseDto'];
          this.getAgentIdentity(this.user_id.agentExposableId);
          // console.log('id', this.user_id);
        },
      });
  }

  private getBase64(img: NzUploadFile, callback: (img: string) => void): void {
    const reader = new FileReader();
    // tslint:disable-next-line:no-non-null-assertion
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    // @ts-ignore
    reader.readAsDataURL(img);
  }

  beforeFrontUpload = (file: NzUploadFile): Observable<boolean> =>
    new Observable((observer: Observer<boolean>) => {
      this.getBase64(file, (img: string) => {
        this.frontLoading = false;
        this.frontAvatarUrl = img;
      });
      this.frontFileList = this.frontFileList.concat(file);
      this.frontUploaded = true;
      const isJpgOrPng =
        file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.notificationService.create(
          'error',
          'Failed',
          'Please upload Image Files Only',
          { nzStyle: { background: 'white', color: 'Red' } }
        );
        observer.complete();
        return;
        // this.msg.error('You can only upload JPG file!');
        observer.complete();
        return;
      }
      const isLt2M = file.size! / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.notificationService.create(
          'error',
          'Failed',
          'Please upload Image Files Only',
          { nzStyle: { background: 'white', color: 'Red' } }
        );
        observer.complete();
        return;
      }
      observer.next(isJpgOrPng && isLt2M);
      observer.complete();
    });

  // beforeFrontUpload = (file: NzUploadFile): boolean => {
  //   this.getBase64(file, (img: string) => {
  //     this.frontLoading = false;
  //     this.frontAvatarUrl = img;
  //     console.log('image', this.frontAvatarUrl);
  //   });

  //   this.frontFileList = this.frontFileList.concat(file);
  //   this.frontUploaded = true;

  //   return false;
  // };
  beforeBackUpload = (file: NzUploadFile): Observable<boolean> =>
    new Observable((observer: Observer<boolean>) => {
      this.getBase64(file, (img: string) => {
        this.backLoading = false;
        this.backAvatarUrl = img;
      });
      this.backFileList = this.backFileList.concat(file);
      this.backUploaded = true;
      const isJpgOrPng =
        file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.notificationService.create(
          'error',
          'Failed',
          'Please upload Image Files Only',
          { nzStyle: { background: 'white', color: 'Red' } }
        );
        observer.complete();
        return;
        // this.msg.error('You can only upload JPG file!');
        observer.complete();
        return;
      }
      const isLt2M = file.size! / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.notificationService.create(
          'error',
          'Failed',
          'Please upload Image Files Only',
          { nzStyle: { background: 'white', color: 'Red' } }
        );
        observer.complete();
        return;
      }
      observer.next(isJpgOrPng && isLt2M);
      observer.complete();
    });

  // beforeBackUpload = (
  //   file: NzUploadFile,
  //   backFileList: NzUploadFile[]
  // ): boolean => {
  //   this.getBase64(file, (img: string) => {
  //     this.backLoading = false;
  //     this.backAvatarUrl = img;
  //   });

  //   this.backFileList = this.backFileList.concat(file);
  //   this.backUploaded = true;

  //   return false;
  // };

  removeFrontData = (file: NzUploadFile): boolean => {
    this.frontAvatarUrl = '';
    this.profile_img1 = null;
    return true;
  };

  removeBackData = (file: NzUploadFile): boolean => {
    this.backAvatarUrl = '';

    this.profile_img2 = null;
    return true;
  };

  handleCancel(): void {
    this.previewModalVisible = false;
  }

  viewFrontIdPreview() {
    this.viewFront = true;
    this.previewModalVisible = true;
    this.viewBack = false;
  }

  viewBackIdPreview() {
    this.viewBack = true;
    this.previewModalVisible = true;
    this.viewFront = false;
  }

  hideBackImgUpload() {
    this.backFileList = [];
    this.frontFileList = [];
    this.backAvatarUrl = '';
    this.frontAvatarUrl = '';
    // console.log('img', this.identityType!.value);

    if (this.identityType!.value == 1) {
      this.showBackImgUpload = false;
      this.backAvatarUrl = '';
      this.backFileList = [];
    } else {
      this.showBackImgUpload = true;
    }
  }

  handleOk() {}

  onFrontFileSelected(event: any) {
    this.profile_img1 = event.file.originFileObj;
    if (event.target.files.length > 0) {
      var mimeType = event.target.files[0].type;

      if (mimeType.match(/image\/*/) == null) {
        // console.log('image only support');

        return;
      }
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (_event) => {
        this.url = reader.result;
      };
    }
  }
  onBackFileSelected(event: any) {
    this.profile_img2 = event.file.originFileObj;
    if (event.target.files.length > 0) {
      var mimeType = event.target.files[0].type;

      if (mimeType.match(/image\/*/) == null) {
        // console.log('image only support');

        return;
      }
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (_event) => {
        this.url = reader.result;
      };
    }
  }
  closeModal() {
    this.frontFileList = [];
    this.backFileList = [];
    this.frontAvatarUrl = '';
    this.backAvatarUrl = '';
    this.profile_img1 = null;
    this.profile_img2 = null;
    this.primaryIdentityUploadForm.reset();
  }
  getAgentIdentity(receivedId: any) {
    this.primaryIdService.getAgentIdentity(receivedId).subscribe((res: any) => {
      if (res['responseDto']) {
        this.receivedAgentData = res['responseDto'];
      }
    });
  }
  saveProfile() {
    if (!this.primaryIdentityUploadForm.valid) {
      this.validateAllFormFields(this.primaryIdentityUploadForm);
      return;
    }
    if (
      !(this.frontFileList.length > 0) ||
      (this.showBackImgUpload && !(this.backFileList.length > 0))
    ) {
      if (this.frontFileList.length === 0) {
        this.notificationService.create(
          'error',
          'Input Error',
          'Front Image cannot be empty',
          { nzStyle: { background: 'white', color: 'Red' } }
        );
      }
      if (this.showBackImgUpload && this.backFileList.length === 0) {
        this.notificationService.create(
          'error',
          'Input Error',
          'Back Image cannot be empty',
          { nzStyle: { background: 'white', color: 'Red' } }
        );
      }

      return;
    }
    const data: any = {};
    data['primaryId'] = this.identityType?.value;
    data['customerDetailsId'] = this.dataService.userDetails.customerDetailsId;
    let formData = new FormData();

    formData.append('frontImage', this.profile_img1);
    this.identityType?.value == 1
      ? formData.append('backImage', this.profile_img1)
      : formData.append('backImage', this.profile_img2);

    this.primaryIdService.savePrimaryIdentity(formData, data).subscribe({
      next: (res) => {
        if (res['responseDto'] != null) {
          this.notificationService.create(
            'success',
            'Success',
            'Successfully uploaded Primary ID image',
            { nzStyle: { background: 'white', color: 'green' } }
          );
          this.closeModal();
        } else {
          this.notificationService.create(
            'error',
            'Failed',
            'Primary ID image upload failed',
            { nzStyle: { background: 'white', color: 'red' } }
          );
        }
      },
    });
  }
}
