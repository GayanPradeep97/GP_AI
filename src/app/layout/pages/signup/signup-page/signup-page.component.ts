import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { MyValidators } from 'src/app/_validators/custom-validator';

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
    private router: Router
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
    } = MyValidators;
    this.personalInformationForm = this.formBuilder.group({
      userName: [null, [characterLength('First Name', 40)]],
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
        [customRequired('Last Name'), characterLength('Last Name', 25)],
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
      .subscribe(() => {
        this.router.navigate(['/']);
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
}
