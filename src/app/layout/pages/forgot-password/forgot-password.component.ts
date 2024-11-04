import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Subject, takeUntil } from 'rxjs';
import { ResetpasswordService } from 'src/app/_services/resetpassword.service';
import { MyValidators } from 'src/app/_validators/custom-validator';
import { VerificationCodeComponent } from '../verification-code/verification-code.component';
import { CommonService } from 'src/app/_services/common.service';
import { TokenService } from 'src/app/_services/token.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.sass'],
})
export class ForgotPasswordComponent implements OnInit {
  public forgotPasswordForm!: FormGroup;
  private unsubscribe$ = new Subject<void>();

  isMobile = true;
  isCustomerRequest = true;
  emailSentSuccess = false;
  currentUser: any;

  autoTips: Record<string, Record<string, string>> = {
    en: {},
    default: {},
  };

  constructor(
    private formBuilder: FormBuilder,
    private modalRef: NzModalRef,
    private resetPasswordDataService: ResetpasswordService,
    private notificationService: NzNotificationService,
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
    } = MyValidators;
    this.forgotPasswordForm = this.formBuilder.group({
      emailAddress: [
        '',
        Validators.compose([
          customRequired('Username'),
          customEmail(
            // tslint:disable-next-line: max-line-length
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Username'
          ),
        ]),
      ],
    });
  }

  get emailAddress() {
    return this.forgotPasswordForm.get('emailAddress');
  }

  sendLoginLink() {
    if (!this.forgotPasswordForm.valid) {
      this.validateFormFields(this.forgotPasswordForm);
    } else {
      const data = {
        username: this.emailAddress!.value,
        isMobile: this.isMobile,
        isCustomerRequest: this.isCustomerRequest,
      };
      this.resetPasswordDataService
        .resetpasswordrequest(data)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe({
          next: (res: any) => {
            if (res['sucess'] === true) {
              this.emailSentSuccess = res;
              this.closeModal();
              this.notificationService.create(
                'success',
                'Success',
                'email send succesfull',
                { nzStyle: { background: '#00A03E', color: '#fff' } }
              );
              this.openVerificationPopUp();
              this.closeModal();
            } else if (res['sucess'] === false) {
              const msg = res['msg'];
              this.notificationService.create('error', 'Error', msg, {
                nzStyle: { background: '#cc2d2d', color: '#fff' },
              });
            }
          },
          error: (err: any) => {
            this.notificationService.create(
              'error',
              'Error',
              'email send Fail',
              { nzStyle: { background: '#cc2d2d', color: '#fff' } }
            );
          },
        });
    }
  }

  openVerificationPopUp() {
    this.modalService.create({
      nzTitle: 'Verification Code',
      nzContent: VerificationCodeComponent,
      nzClosable: true,
      nzFooter: null,
      nzWidth: 510,
      nzClassName: 'popup-message',
    });
  }

  validateFormFields(formgroup: FormGroup) {
    Object.keys(this.forgotPasswordForm.controls).forEach((field: any) => {
      const control = formgroup.get(field);
      if (control instanceof FormControl) {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
          const fieldName = this.getFieldName(field);
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
      case 'emailAddress': {
        return 'Email Address';
      }
    }
  }

  closeModal() {
    this.modalRef.destroy();
  }
}
