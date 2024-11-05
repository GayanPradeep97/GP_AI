import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/_shared/shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MyValidators } from 'src/app/_validators/custom-validator';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { AccountDetailsViewModalNewComponent } from '../../common-components/account-details-view-modal-new/account-details-view-modal-new.component';
import { PopupMessageComponent } from '../../common-components/popup-message/popup-message.component';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { DataService } from 'src/app/_services/shared-data/data.service';
import { SignupComponent } from '../signup/signup/signup.component';
import { AuthService } from 'src/app/_services/auth.service';
import { Subject, takeUntil } from 'rxjs';
import { TokenService } from 'src/app/_services/token.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { LoadingComponent } from '../../common-components/loading/loading.component';
import { CommonService } from 'src/app/_services/common.service';
import { EventTriggerService } from 'src/app/_services/shared-data/event-trigger.service';
import { AfterLoginPopoupComponent } from './after-login-popoup/after-login-popoup.component';
import { CustomValidators } from 'src/app/_helpers/validators/custom-validators';
import { TokenStorageServiceService } from 'src/app/_services/token-storage-service.service';
import { TwoFactorCodeComponent } from '../two-factor-code/two-factor-code.component';

@Component({
  selector: 'app-login',

  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {
  private unsubscribe$ = new Subject<void>();

  loginForm!: FormGroup;
  passwordVisible = false;

  autoTips: Record<string, Record<string, string>> = {
    en: {},
    default: {},
  };
  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private modalService: NzModalService,
    private modalRef: NzModalRef,
    private dataService: DataService,
    private authService: AuthService,
    private tokenService: TokenService,
    private notificationServise: NzNotificationService,
    private common: CommonService,
    private eventTrigger: EventTriggerService,
    private tokenStorageService: TokenStorageServiceService
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
    this.loginForm = this.formBuilder.group({
      // userName: [
      //   '',
      //   [
      //     customRequired('Username'),
      //     customEmail(
      //       '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$',
      //       'Username'
      //     ),
      //   ],
      // ],
      userName: [
        null,
        Validators.compose([
          customRequired('Username'),
          customEmail(
            // tslint:disable-next-line: max-line-length
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Username'
          ),
        ]),
      ],
      password: [
        '',
        [
          customRequired('Password'),
          pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,}).*$'),
          minLength(8),
        ],
      ],
    });
  }

  get userName() {
    return this.loginForm.get('userName');
  }
  get password() {
    return this.loginForm.get('password');
  }

  onSignup() {
    this.authService
      .login(this.userName?.value, this.password?.value)
      .subscribe({
        next: (response) => {
          const displayName = response.user?.displayName;
          this.dataService.isLoggedIn = true;
          this.route.navigate(['']);
          this.dataService.loggedInUser = this.userName?.value;
          this.tokenStorageService.saveUser(this.userName?.value);
          this.modalRef.close();
          window.location.reload();
          console.log('Success', response);
          console.log('Success, Display Name:', displayName);
        },
        error: (err) => {
          this.notificationServise.create(
            'error',
            'Error',
            'Error Signing up',
            { nzStyle: { background: '#cc2d2d', color: '#fff' } }
          );
        },
      });
  }
  // submitForm() {
  //   if (!this.loginForm.valid) {
  //     this.validateFormFields(this.loginForm);
  //   } else {
  //     this.dataService.loggedInUser = this.userName?.value;
  //     this.dataService.loggedInPassword = this.password?.value;

  //     const formData = {
  //       username: this.userName?.value,
  //       password: this.password?.value,
  //     };
  //     this.authService.login(formData).subscribe({
  //       next: (data: any) => {
  //         if (data.jwttoken) {
  //           this.tokenService.saveToken(data.jwttoken);
  //           this.tokenService.saveRefreshToken(data.refreshToken);
  //           this.tokenStorageService.saveUser(this.userName?.value);
  //           this.dataService.isLoggedIn = true;
  //           this.tokenService.savePrivileges(this.userName?.value);
  //           this.route.navigate(['']);
  //           this.eventTrigger.onReloadServiceData();
  //           this.afterLoginPopup();
  //           // this.otpOpen();
  //         } else if (data['errorDescription']) {
  //           this.notificationServise.create(
  //             'error',
  //             'Error',
  //             data['errorDescription'],
  //             { nzStyle: { background: '#cc2d2d', color: '#fff' } }
  //           );
  //         }
  //       },
  //       error: () => {
  //         this.notificationServise.create(
  //           'error',
  //           'Error',
  //           'Username or password wrong',
  //           { nzStyle: { background: '#cc2d2d', color: '#fff' } }
  //         );
  //       },
  //     });
  //     this.modalRef.destroy();
  //   }
  // }

  send2FaCode() {
    if (!this.loginForm.valid) {
      this.validateFormFields(this.loginForm);
    } else {
      this.dataService.loggedInUser = this.userName?.value;
      this.dataService.loggedInPassword = this.password?.value;
      const formData: any = {
        userName: this.dataService.loggedInUser,
        password: this.dataService.loggedInPassword,
        grantType: 'Agent Customer',
      };

      this.authService.getTfaCode(formData).subscribe((res: any) => {
        if (res['responseDto']) {
          this.notificationServise.create(
            'success',
            'Success',
            res['responseDto'],
            {
              nzStyle: {
                background: '#00A03E',
                color: '#ffffff',
              },
            }
          );

          this.otpOpen();
          this.modalRef.close();
        } else if (res['errorDescription']) {
          this.notificationServise.create(
            'error',
            'Error',
            res['errorDescription'],
            { nzStyle: { background: '#cc2d2d', color: '#fff' } }
          );
        } else {
          this.notificationServise.create(
            'error',
            'Error',
            '2FA Code send failed',
            { nzStyle: { background: '#cc2d2d', color: '#fff' } }
          );
        }
      });
    }
  }

  closeModal() {
    this.modalRef.close();
  }

  validateFormFields(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      }
    });
  }

  signUpAmlCheck() {
    if (window.innerWidth > 992) {
      this.modalService.create({
        nzContent: PopupMessageComponent,
        nzClosable: true,
        nzFooter: null,
        nzWidth: 510,
        nzClassName: 'popup-message',
      });
    } else {
      this.modalService.create({
        nzTitle: 'Sign Up',
        nzContent: SignupComponent,
        nzClosable: true,
        nzFooter: null,
        nzWidth: 510,
        nzClassName: 'sign-up',
      });
    }
  }

  forgotPassword() {
    this.modalService.create({
      nzTitle: 'Forgot your Password?',
      nzContent: ForgotPasswordComponent,
      nzClosable: true,
      nzFooter: null,
      nzWidth: 460,
      nzClassName: 'forgot-page',
    });
  }

  afterLoginPopup() {
    this.modalService.create({
      nzContent: AfterLoginPopoupComponent,
      nzClosable: false,
      nzFooter: null,
      nzWidth: 715,
    });
  }

  otpOpen() {
    this.modalService.create({
      // nzTitle: 'Forgot your Password?',
      nzContent: TwoFactorCodeComponent,
      nzClosable: false,
      nzFooter: null,
      nzWidth: 390,
    });
  }
}
