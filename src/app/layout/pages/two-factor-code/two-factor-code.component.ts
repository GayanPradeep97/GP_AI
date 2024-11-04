import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/_services/auth.service';
import { DataService } from 'src/app/_services/shared-data/data.service';
import { EventTriggerService } from 'src/app/_services/shared-data/event-trigger.service';
import { TokenStorageServiceService } from 'src/app/_services/token-storage-service.service';
import { TokenService } from 'src/app/_services/token.service';
import { AfterLoginPopoupComponent } from '../login/after-login-popoup/after-login-popoup.component';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-two-factor-code',
  templateUrl: './two-factor-code.component.html',
  styleUrls: ['./two-factor-code.component.sass'],
})
export class TwoFactorCodeComponent {
  entered2faCode: any;
  otpForm!: FormGroup;
  color = '#868686';
  display: any;
  btnDisable = false;
  public timerInterval: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  useremail: any;

  constructor(
    public authService: AuthService,
    private notificationService: NzNotificationService,
    private tokenStorage: TokenStorageServiceService,
    private route: Router,
    private dataService: DataService,
    private modalRef: NzModalRef,
    private tokenService: TokenService,
    private eventTrigger: EventTriggerService,
    private modalService: NzModalService
  ) {}

  ngOnInit(): void {
    this.useremail = this.dataService.loggedInUser;
    this.start();
  }

  onOtpChange($event: any) {
    if ($event.length === 4) {
      this.entered2faCode = $event;
    }
  }

  start() {
    clearInterval(this.timerInterval);
    this.btnDisable = false;
    this.color = '#868686';
    this.timer(5);
  }
  stop() {
    clearInterval(this.timerInterval);
  }
  resend() {
    this.start();
    // this.generateOTP();
  }
  cancel() {
    this.route.navigate(['']);
    this.dataService.isLoggedIn = false;
    this.modalRef.close();
    this.login();
  }

  validateFormFields(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      }
    });
  }
  verify() {
    if (isNaN(this.entered2faCode)) {
      this.notificationService.create(
        'error',
        'Error',
        'Please Enter Valid OTP',
        { nzStyle: { background: '#cc2d2d', color: '#fff' } }
      );
    } else {
      const formData = {
        username: this.dataService.loggedInUser,
        password: this.dataService.loggedInPassword,
        grantType: 'Agent Customer',
        otp: this.entered2faCode,
      };
      this.authService.login(formData).subscribe({
        next: (data: any) => {
          if (data.jwttoken) {
            this.tokenService.saveToken(data.jwttoken);
            this.tokenService.saveRefreshToken(data.refreshToken);
            this.tokenStorage.saveUser(this.dataService.loggedInUser);
            this.dataService.isLoggedIn = true;
            this.tokenService.savePrivileges(this.dataService.loggedInUser);
            this.route.navigate(['']);
            this.eventTrigger.onReloadServiceData();
            this.afterLoginPopup();
          } else if (data['errorDescription']) {
            this.notificationService.create(
              'error',
              'Error',
              data['errorDescription'],
              { nzStyle: { background: '#cc2d2d', color: '#fff' } }
            );
          }
        },
        error: () => {
          this.notificationService.create(
            'error',
            'Error',
            'Please enter valid OTP',
            { nzStyle: { background: '#cc2d2d', color: '#fff' } }
          );
        },
      });
      // this.modalRef.destroy();
    }
  }

  afterLoginPopup() {
    this.modalService.create({
      nzContent: AfterLoginPopoupComponent,
      nzClosable: false,
      nzFooter: null,
      nzWidth: 715,
    });

    this.closeModal();
  }

  login() {
    this.modalService.create({
      nzContent: LoginComponent,
      nzWidth: 510,
      nzFooter: null,
      nzKeyboard: false,
      nzClosable: true,
    });
  }
  closeModal() {
    this.modalRef.close();
  }

  timer(minute: any) {
    // let minute = 1;
    let seconds: number = minute * 60;
    let textSec: any = '0';
    let statSec: number = 60;

    const prefix = minute < 10 ? '0' : '';

    this.timerInterval = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 59;

      if (statSec < 10) {
        textSec = '0' + statSec;
      } else textSec = statSec;

      this.display = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;
      if (seconds < 30) {
        this.color = 'red';
      }
      if (seconds == 0) {
        console.log('finished');

        this.btnDisable = true;
        clearInterval(this.timerInterval);
      }
    }, 1000);
  }
  generateOTP() {
    const formData: any = {
      userName: this.dataService.loggedInUser,
      password: this.dataService.loggedInPassword,
      grantType: 'Agent Customer',
    };

    this.authService.getTfaCode(formData).subscribe((res: any) => {
      if (res['responseDto']) {
        this.notificationService.create(
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
        this.start();
      } else if (res['errorDescription']) {
        this.notificationService.create(
          'error',
          'Error',
          res['errorDescription'],
          { nzStyle: { background: '#cc2d2d', color: '#fff' } }
        );
      } else {
        this.notificationService.create(
          'error',
          'Error',
          '2FA Code send failed',
          { nzStyle: { background: '#cc2d2d', color: '#fff' } }
        );
      }
    });
  }

  // getAdminUserDetails() {
  //   this.userService.getAdminUserDetails().subscribe({
  //     next: (res) => {
  //       this.tokenStorage.saveUser(res);
  //       if (res.roleDto.isActive) {
  //         this.tokenStorage.savePrivileges(res.roleDto.privilegeDtoList);
  //         this.redirectToActiveModule(
  //           JSON.parse(sessionStorage.getItem('privileges')!)
  //         );
  //       } else {
  //         //notication error
  //         this.route.navigateByUrl('/');
  //       }
  //     },
  //   });
  // }
}
