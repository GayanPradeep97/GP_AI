import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Subject, takeUntil } from 'rxjs';
import { user } from 'src/app/_models/users';
import { ResetpasswordService } from 'src/app/_services/resetpassword.service';
import { DataService } from 'src/app/_services/shared-data/data.service';
import { MyValidators } from 'src/app/_validators/custom-validator';

@Component({
  selector: 'app-reset-password-modal',
  templateUrl: './reset-password-modal.component.html',
  styleUrls: ['./reset-password-modal.component.sass'],
})
export class ResetPasswordModalComponent {
  public resetPasswordForm!: FormGroup;

  token: any;
  resetPasswordToken: any;

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
    private router: Router,
    private dataService: DataService,
    private modalService: NzModalService
  ) {
    this.resetPasswordToken = this.dataService.selectedData;
    // console.log('token value', this.dataService.selectedData);
  }

  ngOnInit(): void {
    const {
      required,
      customRequired,
      maxLength,
      minLength,
      customEmail,
      pattern,
    } = MyValidators;
    this.resetPasswordForm = this.formBuilder.group({
      password: [
        '',
        [
          customRequired('Password'),
          pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,}).*$'),
          minLength(8),
        ],
      ],
      confirmPassword: [
        '',
        [
          customRequired('Password'),
          pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,}).*$'),
          minLength(8),
        ],
      ],
    });

    // this.resetPasswordToken = this.dataService.selectedData;
  }

  get password() {
    return this.resetPasswordForm.get('password');
  }

  get confirmPassword() {
    return this.resetPasswordForm.get('confirmPassword');
  }

  changePassword() {
    if (!this.resetPasswordForm.valid) {
      return this.validateFormFields(this.resetPasswordForm);
    } else if (
      this.resetPasswordForm.valid &&
      this.password!.value === this.confirmPassword?.value
    ) {
      const formData: any = {
        token: this.resetPasswordToken,
        newPassword: this.confirmPassword!.value,
        isCustomerRequest: true,
      };
      this.resetPasswordDataService
        .sendNewPassword(formData)
        .pipe(takeUntil(this.Unsubscribe$))
        .subscribe({
          next: (res) => {
            if (res['responseDto'] === 'success') {
              this.notificationService.create(
                'success',
                'Success',
                'Your password reset successfully',
                { nzStyle: { background: '#00A03E', color: '#fff' } }
              );
              this.modalRef.destroy();
              // this.router.navigate(['']);
            } else {
              this.notificationService.create(
                'error',
                'Error',
                'your new password saving failed',
                { nzStyle: { background: '#cc2d2d', color: '#fff' } }
              );
            }
          },
          error: () => {
            this.notificationService.create(
              'error',
              'Error',
              'your new password saving failed',
              { nzStyle: { background: '#cc2d2d', color: '#fff' } }
            );
          },
        });
    } else if (this.password?.value != this.confirmPassword?.value) {
      this.notificationService.create(
        'error',
        'Error',
        'Password And Confirm Password Does Not match',
        { nzStyle: { background: '#cc2d2d', color: '#fff' } }
      );
    } else {
      this.notificationService.create(
        'error',
        'Error',
        'your new password saving failed',
        { nzStyle: { background: '#cc2d2d', color: '#fff' } }
      );
    }
  }
  validateFormFields(formgroup: FormGroup) {
    Object.keys(this.resetPasswordForm.controls).forEach((field: any) => {
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
      case 'password': {
        return 'Password';
      }
      case 'confirmPassword': {
        return 'Confirm Password';
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
}
