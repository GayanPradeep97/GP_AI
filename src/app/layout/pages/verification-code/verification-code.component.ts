import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { differenceInCalendarDays, format } from 'date-fns';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Subject, takeUntil } from 'rxjs';
import { user } from 'src/app/_models/users';
import { AuthService } from 'src/app/_services/auth.service';
import { CommonService } from 'src/app/_services/common.service';
import { ResetpasswordService } from 'src/app/_services/resetpassword.service';
import { DataService } from 'src/app/_services/shared-data/data.service';
import { TokenService } from 'src/app/_services/token.service';
import { MyValidators } from 'src/app/_validators/custom-validator';
import { ResetPasswordModalComponent } from '../reset-password-modal/reset-password-modal.component';

@Component({
  selector: 'app-verification-code',
  templateUrl: './verification-code.component.html',
  styleUrls: ['./verification-code.component.sass'],
})
export class VerificationCodeComponent {
  public verificationForm!: FormGroup;

  token: any;
  todayDate = new Date();

  public Unsubscribe$ = new Subject<user>();

  autoTips: Record<string, Record<string, string>> = {
    en: {},
    default: {},
  };

  constructor(
    private formBuilder: FormBuilder,
    private modalRef: NzModalRef,
    private resetPasswordDataService: ResetpasswordService,
    private notificationService: NzNotificationService,
    private authService: AuthService,
    private router: Router,
    private commonService: CommonService,
    private tokenService: TokenService,
    private dataService: DataService,
    private modalService: NzModalService
  ) {}

  ngOnInit(): void {
    const {
      required,
      customRequired,
      maxLength,
      minLength,
      customEmail,
      pattern,
      monthValidator,
    } = MyValidators;
    this.verificationForm = this.formBuilder.group({
      verificationCode: [
        '',
        Validators.compose([
          customRequired('verificationCode'),
          maxLength(6),
          minLength(6),
        ]),
      ],
      dateOfBirth: ['', Validators.compose([customRequired('dateOfBirth')])],
    });
  }

  get verificationCode() {
    return this.verificationForm.get('verificationCode');
  }

  get dateOfBirth() {
    return this.verificationForm.get('dateOfBirth');
  }

  submitCode() {
    if (!this.verificationForm.valid) {
      return this.validateFormFields(this.verificationForm);
    } else {
      const data: any = {};
      data['token'] = this.verificationCode!.value;
      data['dateOfBirth'] = format(this.dateOfBirth?.value, 'yyyy-MM-dd');
      this.resetPasswordDataService
        .checkTokenValidityCustomer(data)
        .pipe(takeUntil(this.Unsubscribe$))
        .subscribe((res: any) => {
          if (res['username']) {
            this.dataService.selectedData = this.verificationCode!.value;
            this.createResetPasswordModel();
            this.closeModal();
            // console.log('user name for token', res['username']);
          } else {
            this.notificationService.create(
              'error',
              'Input Error',
              'Invalid Token or Invalid Date of Birth',
              { nzStyle: { background: '#cc2d2d', color: '#fff' } }
            );
          }
        });
    }
  }

  validateFormFields(formgroup: FormGroup) {
    Object.keys(this.verificationForm.controls).forEach((field: any) => {
      const control = formgroup.get(field);
      if (control instanceof FormControl) {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
          const fieldName = this.getFieldName(field);

          if (fieldName === 'Verification Code') {
            this.notificationService.create(
              'error',
              'Input Error',
              'Verification Code should be need 6 digits',
              { nzStyle: { background: '#cc2d2d', color: '#fff' } }
            );
          }
          this.notificationService.create(
            'error',
            'Input Error',
            fieldName + ' cannot be empty',
            { nzStyle: { background: '#cc2d2d', color: '#fff' } }
          );
        }
      } else if (control instanceof FormGroup) {
        this.validateFormFields(control);
      }
    });
  }

  getFieldName(option: any): any {
    switch (option) {
      case 'verificationCode': {
        return 'Verification Code';
      }
      case 'dateOfBirth': {
        return 'Date Of Birth';
      }
    }
  }

  createResetPasswordModel() {
    this.modalService.create({
      nzTitle: 'Reset Password',
      nzContent: ResetPasswordModalComponent,
      nzClosable: true,
      nzFooter: null,
      nzWidth: 510,
      nzClassName: 'popup-message',
    });
  }

  closeModal() {
    this.modalRef.destroy();
  }

  disabledFutureDates = (current: Date): boolean => {
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - 16); // set the maximum allowed date to 16 years ago
    return current > maxDate;
  };
}
