import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { th } from 'date-fns/locale';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Subject, takeUntil } from 'rxjs';
import { CommonService } from 'src/app/_services/common.service';
import { SettingService } from 'src/app/_services/setting.service';
import { DataService } from 'src/app/_services/shared-data/data.service';
import { TokenStorageServiceService } from 'src/app/_services/token-storage-service.service';
import { TokenService } from 'src/app/_services/token.service';
import { MyValidators } from 'src/app/_validators/custom-validator';

@Component({
  selector: 'app-basic-informations',
  templateUrl: './basic-informations.component.html',
  styleUrls: ['./basic-informations.component.sass'],
})
export class BasicInformationsComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  setting_data: any;
  setEmail: any;
  username: any;
  setting_id: any;
  basicInfoForm!: UntypedFormGroup;
  currentUser: any;
  currentPasswordVisible = false;
  newPasswordVisible = false;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private settingService: SettingService,
    private commonService: CommonService,
    private tokenService: TokenService,
    private notification: NzNotificationService,
    private tokenStorageService: TokenStorageServiceService,
    private dataService: DataService
  ) {
    this.currentUser = this.commonService.parseJwt(tokenService.getToken());
  }

  ngOnInit(): void {
    const {
      customRequired,
      customConfirmPasswordRequired,
      pattern,
      minLength,
      maxLength,
    } = MyValidators;

    this.basicInfoForm = this.formBuilder.group(
      {
        email: ['', customRequired('email')],
        currentPassword: [
          '',
          [
            customRequired('new password'),
            pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,}).*$'),
            minLength(8),
          ],
        ],
        newPassword: ['', [customRequired('confirm password')]],
        firstName: ['', customRequired('first name')],
        lastName: ['', customRequired('last name')],
        contactNumber: [
          '',
          Validators.compose([Validators.required, maxLength(15)]),
        ],
        address: ['', customRequired('address')],
      }
      // { validator: this.checkPasswords }
    );

    this.getExposableIdByUsername();
    this.disable();
    this.getAgentSender();
  }

  setSettingForm(data: any) {
    this.basicInfoForm.patchValue({
      email: data.emailAddress,
      firstName: data.firstName,
      lastName: data.lastName,
      contactNumber: data.contactNo,
      address: data.address,
    });
  }

  disable() {
    this.basicInfoForm.controls['email'].disable();
    this.basicInfoForm.controls['firstName'].disable();
    this.basicInfoForm.controls['lastName'].disable();
  }

  validateForm() {
    Object.values(this.basicInfoForm.controls).forEach((control) => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      }
    });
  }

  get email() {
    return this.basicInfoForm.get('email');
  }
  get currentPassword() {
    return this.basicInfoForm.get('currentPassword');
  }
  get newPassword() {
    return this.basicInfoForm.get('newPassword');
  }
  get firstName() {
    return this.basicInfoForm.get('firstName');
  }
  get lastName() {
    return this.basicInfoForm.get('lastName');
  }
  get contactNumber() {
    return this.basicInfoForm.get('contactNumber');
  }
  get address() {
    return this.basicInfoForm.get('address');
  }

  // checkPasswords(group: FormGroup) {
  //   const {
  //     customRequired,
  //     customConfirmPasswordRequired,
  //     pattern,
  //     minLength,
  //   } = MyValidators;
  //   const pass = group.controls['currentPassword']?.value;
  //   const confirmPass = group.controls['newPassword']?.value;
  //   return pass === confirmPass
  //     ? null
  //     : group.controls['newPassword'].setValidators([
  //         customConfirmPasswordRequired('newPassword'),
  //       ]);
  // }

  saveProfile() {
    // console.log('form', this.basicInfoForm);
    if (!this.basicInfoForm.valid) {
      this.validateForm();
      return;
    }
    const password = this.currentPassword?.value;
    const confirmPassword = this.newPassword?.value;
    if (password !== confirmPassword) {
      this.createNotification(
        'error',
        'Error',
        'Password and confirmation password do not match',
        'red',
        'white'
      );
    } else {
      const data: any = {
        id: this.setting_data.id,
        password: this.currentPassword?.value,
        contactNo: this.contactNumber?.value,
        address: this.address?.value,
      };
      this.settingService
        .updateUserDetails(data)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (res) => {
            if (res['responseDto']) {
              this.createNotification(
                'success',
                'Success',
                'Saved',
                '#A38C15',
                'white'
              );
              this.getExposableIdByUsername();
            } else {
              this.createNotification(
                'error',
                'Error',
                res.errorDescription,
                'red',
                'white'
              );
            }
          },
          error: (err) => {
            this.createNotification(
              'error',
              'Error',
              'Update Failed',
              'red',
              'white'
            );
          },
        });
    }
  }

  getAgentSender() {
    const data: any = {};
    data['username'] = this.tokenStorageService.getUser();

    this.settingService
      .getUserSetting(data)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.setting_data = res['responseDto'];
          this.dataService.userDetails = res['responseDto'];
          this.setSettingForm(this.setting_data);
          // console.log('id', this.setting_data);
        },
      });
  }

  getExposableIdByUsername() {
    const data: any = {};
    data['username'] = this.tokenStorageService.getUser();

    this.settingService
      .getExposableIdByUsername(data)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.setting_id = res['responseDto'];
          // this.getAgentSender();
        },
      });
  }

  createNotification(
    type: string,
    title: string,
    content: string,
    color: string,
    background: string
  ): void {
    this.notification.create(type, title, content, {
      nzStyle: {
        background: background,
        color: color,
      },
    });
  }
}
