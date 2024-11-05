import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { AuthService } from 'src/app/_services/auth.service';
import { MyValidators } from 'src/app/_validators/custom-validator';
import { LoginComponent } from '../../login/login.component';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.sass'],
})
export class SignupPageComponent {
  public personalInformationForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private modalService: NzModalService,
    private modalRef: NzModalRef,
    private notificationServise: NzNotificationService
  ) {}

  ngOnInit() {
    const {
      customRequired,
      customConfirmPasswordRequired,
      maxLength,
      minLength,
      customEmail,
      contactNumberLength,
      characterLength,
      pattern,
    } = MyValidators;
    this.personalInformationForm = this.formBuilder.group({
      userName: [
        null,
        [customRequired('User Name'), characterLength('User Name', 40)],
      ],
      email: [
        null,
        [
          customRequired('Email'),
          customEmail(
            '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$',
            'Email'
          ),
        ],
      ],
      password: [
        null,
        [
          customRequired('Password'),
          pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,}).*$'),
        ],
      ],
    });
  }

  get userName() {
    return this.personalInformationForm.get('userName');
  }
  get email() {
    return this.personalInformationForm.get('email');
  }
  get password() {
    return this.personalInformationForm.get('password');
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      }
    });
  }

  onSubmit(): void {
    this.authService
      .register(this.email?.value, this.userName?.value, this.password?.value)
      .subscribe({
        next: (res: any) => {
          console.log('Registration successful:', res);
          if (res === undefined) {
            console.log('success', res);

            this.notificationServise.create(
              'success',
              'Success',
              'User Successfully Added',
              {
                nzStyle: {
                  background: '#00A03E',
                  color: '#ffffff',
                },
              }
            );
            this.loginPopup();
            this.modalRef.close();
          }
        },
        error: (err) => {
          const errorMessage =
            err?.error?.errors?.message || 'An error occurred';
          this.notificationServise.create('error', 'Error', errorMessage, {
            nzStyle: { background: '#cc2d2d', color: '#fff' },
          });
        },
      });
  }

  firstStepContinue = () => {
    if (!this.personalInformationForm.valid) {
      this.validateAllFormFields(this.personalInformationForm);
      return;
    } else {
      this.onSubmit();
    }
  };

  loginPopup() {
    this.modalService.create({
      nzContent: LoginComponent,
      nzClosable: false,
      nzFooter: null,
      nzWidth: 715,
    });
  }
}
