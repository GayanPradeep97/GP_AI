import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import format from 'date-fns/format';
import { SecondaryIdentityService } from 'src/app/_services/secondary-identity.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { SettingService } from 'src/app/_services/setting.service';
import { Observable, Observer, Subject, takeUntil } from 'rxjs';
import { CommonService } from 'src/app/_services/common.service';
import { TokenService } from 'src/app/_services/token.service';
import { TokenStorageServiceService } from 'src/app/_services/token-storage-service.service';
import { DataService } from 'src/app/_services/shared-data/data.service';

@Component({
  selector: 'app-secondry-identity-upload',
  templateUrl: './secondry-identity-upload.component.html',
  styleUrls: ['./secondry-identity-upload.component.sass'],
})
export class SecondryIdentityUploadComponent {
  currentActiveUserAccount: any;
  agentExposableId: any;

  public secondrydentityUploadForm!: FormGroup;
  receivedCustomerData: any;
  customerDetailsId: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  previewModalVisible = false;
  viewSecondary = false;
  secondaryUploading = false;
  secondaryFileList: NzUploadFile[] = [];
  secondaryLoading = false;
  secondaryAvatarUrl!: string;
  secondaryImageName!: string;
  secondaryUploaded = false;

  uploadedImages = [];
  currentUser: any;
  user_id: any;

  constructor(
    private formBuilder: FormBuilder,
    private secondaryIdServices: SecondaryIdentityService,
    private notificationService: NzNotificationService,
    private settingsService: SettingService,
    private commonService: CommonService,
    private tokenService: TokenService,
    private tokenStorageService: TokenStorageServiceService,
    private dataService: DataService
  ) {
    this.currentUser = this.commonService.parseJwt(tokenService.getToken());
  }

  ngOnInit() {
    this.secondrydentityUploadForm = this.formBuilder.group({
      secondaryIdType: [null, Validators.required],
      secondaryIdImage: [''],
    });
    this.getExposableId();
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
          this.getUserDetails(this.user_id.agentExposableId);
          // console.log('id', this.user_id);
        },
      });
  }

  get secondaryIdType() {
    return this.secondrydentityUploadForm.get('secondaryIdType');
  }

  getFieldName(option: any): any {
    switch (option) {
      case 'secondaryIdType': {
        return 'Secondary Id Type';
      }
    }
  }

  dateFormatter(date: string) {
    return format(new Date(date), 'yyyy-MM-dd');
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

  getUserDetails(receivedId: any) {
    this.secondaryIdServices
      .getSecondaryIdentity(receivedId)
      .subscribe((res: any) => {
        if (res['responseDto']) {
          this.receivedCustomerData = res['responseDto'];
        }
      });
  }

  handleCancel(): void {
    this.previewModalVisible = false;
    this.viewSecondary = false;
  }

  viewSecondaryIdPreview() {
    this.viewSecondary = true;
    this.previewModalVisible = true;
  }

  removeSecondaryData = (file: NzUploadFile): boolean => {
    this.secondaryImageName = '';
    this.secondaryAvatarUrl = '';
    this.profile_img = null;

    return true;
  };

  private getBase64(img: NzUploadFile, callback: (img: string) => void): void {
    const reader = new FileReader();
    // tslint:disable-next-line:no-non-null-assertion
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    // @ts-ignore
    reader.readAsDataURL(img);
  }

  viewImage(receivedData: any) {
    this.secondaryAvatarUrl =
      'data:image/jpeg;base64,' + receivedData.imagePath;
    this.viewSecondary = true;
    this.previewModalVisible = true;
  }

  closeModal() {
    this.secondaryImageName = '';
    this.secondaryAvatarUrl = '';
    this.secondaryFileList = [];
    this.secondrydentityUploadForm.reset();
    this.profile_img = null;
  }
  profile_img: any;
  url: any;
  onFileSelected(event: any) {
    this.profile_img = event.file.originFileObj;
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

  beforeSecondaryUpload = (file: NzUploadFile): Observable<boolean> =>
    new Observable((observer: Observer<boolean>) => {
      this.getBase64(file, (img: string) => {
        this.secondaryLoading = false;
        this.secondaryAvatarUrl = img;
      });
      this.secondaryFileList = this.secondaryFileList.concat(file);
      this.secondaryUploaded = true;
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
      return;
    });

  saveProfile() {
    if (!this.secondrydentityUploadForm.valid) {
      this.validateAllFormFields(this.secondrydentityUploadForm);
      return;
    }
    if (this.secondaryAvatarUrl == '' || this.profile_img == null) {
      // console.log('not valid');
      this.notificationService.create(
        'error',
        'Failed',
        'Please upload Image',
        { nzStyle: { background: 'white', color: 'black' } }
      );
      return;
    }
    const data: any = {};
    data['secondaryIdType'] =
      this.secondaryIdType?.value === 'UtilityBills'
        ? 'UtilityBills'
        : this.secondaryIdType?.value === 'Bank Statement'
        ? 'BankStatement'
        : this.secondaryIdType?.value === 'Council Tax Bill'
        ? 'CouncilTaxBill'
        : null;
    data['customerDetailsId'] = this.dataService.userDetails.customerDetailsId;
    let formData = new FormData();

    formData.append('secondaryFile', this.profile_img);

    this.secondaryIdServices.saveSecondaryIdentity(formData, data).subscribe({
      next: (res) => {
        if (res['responseDto'] != null) {
          this.notificationService.create(
            'success',
            'Success',
            'Successfully uploaded Secondary ID image',
            { nzStyle: { background: 'white', color: 'green' } }
          );

          this.closeModal();
        } else {
          this.notificationService.create(
            'error',
            'Failed',
            'Secondary ID image upload failed',
            { nzStyle: { background: 'white', color: 'red' } }
          );
        }
      },
    });
  }
  clear() {
    this.secondaryAvatarUrl = '';
    this.secondaryFileList = [];
  }
}
