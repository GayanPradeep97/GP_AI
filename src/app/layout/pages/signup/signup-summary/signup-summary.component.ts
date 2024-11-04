import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { CustomValidators } from 'src/app/_helpers/validators/custom-validators';
import { DataService } from 'src/app/_services/shared-data/data.service';
import { MyValidators } from 'src/app/_validators/custom-validator';
import { SignupContinueComponent } from '../signup-continue/signup-continue.component';
import { SignUpService } from 'src/app/_services/sign-up.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-signup-summary',
  templateUrl: './signup-summary.component.html',
  styleUrls: ['./signup-summary.component.sass'],
})
export class SignupSummaryComponent {
  countryPhoneName = true;
  countryPhoneCode = true;

  public personalInformationForm!: FormGroup;
  public idCheckConfirmationForm!: FormGroup;
  countryCodes: any[] = [];
  countryList: any[] = [];
  nationalityList: any[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private modalService: NzModalService,
    private modalRef: NzModalRef,
    private dataservice: DataService,
    private signUpService: SignUpService,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    const {
      customRequired,
      customConfirmPasswordRequired,
      maxLength,
      minLength,
      customEmail,
      contactNumberLength,
      pattern,
    } = MyValidators;
    this.personalInformationForm = this.formBuilder.group({
      firstName: [null, null],
      lastName: [null, [customRequired('Last Name')]],
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
      code: [null, [customRequired('Code')]],
      contactNumber: [
        null,
        [
          customRequired('Contact Number'),
          contactNumberLength('Contact Number', 10),
        ],
      ],
      userName: [],
      address: [null, [customRequired('Address')]],
      country: [null, [customRequired('Country')]],
      nationality: [null, [customRequired('Nationality')]],
      city: [null, [customRequired('City')]],
      postCode: [null, [customRequired('Post Code')]],
      stateProvince: [null, null],

      dateOfBirth: [null, [customRequired('DOB')]],
      placeOfBirth: [null, null],
    });

    this.countryCodes = this.dataservice.countryCodelist;
    this.countryList = this.dataservice.countryList;
    this.nationalityList = this.dataservice.nationalityList;
    this.pathchvalue();
  }
  checkPasswords(group: FormGroup) {
    // console.log('form', group);

    const pass = group.controls['password']?.value;
    const confirmPass = group.controls['confirmPassword']?.value;
    // console.log('form', pass === confirmPass);
    return pass === confirmPass
      ? null
      : group.controls['confirmPassword'].setErrors({
          confirmPassword: true,
        });
  }

  get firstName() {
    return this.personalInformationForm.get('firstName');
  }
  get lastName() {
    return this.personalInformationForm.get('lastName');
  }
  get email() {
    return this.personalInformationForm.get('email');
  }
  get contactNumber() {
    return this.personalInformationForm.get('contactNumber');
  }
  get code() {
    return this.personalInformationForm.get('code');
  }

  get password() {
    return this.personalInformationForm.get('password');
  }

  get confirmPassword() {
    return this.personalInformationForm.get('confirmPassword');
  }

  get address() {
    return this.personalInformationForm.get('address');
  }

  get city() {
    return this.personalInformationForm.get('city');
  }

  get stateProvince() {
    return this.personalInformationForm.get('stateProvince');
  }

  get postCode() {
    return this.personalInformationForm.get('postCode');
  }
  get country() {
    return this.personalInformationForm.get('country');
  }
  get nationality() {
    return this.personalInformationForm.get('nationality');
  }
  get dateOfBirth() {
    return this.personalInformationForm.get('dateOfBirth');
  }
  get placeOfBirth() {
    return this.personalInformationForm.get('placeOfBirth');
  }
  disabledDate = (current: NzSafeAny): boolean => {
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - 16); // set the maximum allowed date to 16 years ago
    return current > maxDate;
  };
  pathchvalue() {
    this.personalInformationForm.patchValue({
      userName: this.dataservice.customerBasicDetails.email,
      firstName: this.dataservice.customerBasicDetails.customerFirstName,
      lastName: this.dataservice.customerBasicDetails.customerLastName,
      contactNumber: this.dataservice.customerBasicDetails.telephoneNo,
      email: this.dataservice.customerBasicDetails.email,
      code: this.dataservice.customerBasicDetails.countryCode,
      address: this.dataservice.customerBasicDetails.residentialAddress,
      country: this.dataservice.customerBasicDetails.countryId,
      nationality: this.dataservice.customerBasicDetails.nationalityDetailsId,
      city: this.dataservice.customerBasicDetails.city,
      postCode: this.dataservice.customerBasicDetails.postCode,
      stateProvince: this.dataservice.customerBasicDetails.stateProvince,
      dateOfBirth: this.dataservice.customerBasicDetails.dateOfBirth,
      placeOfBirth: this.dataservice.customerBasicDetails.placeOfBirth,
    });
    this.personalInformationForm.disable();
  }
  close() {
    this.modalRef.close();
  }
  openStep2() {
    const customerData = this.dataservice.customerBasicDetails;

    const data = {
      title: customerData.contactTitleName,
      senderFirstName: customerData.customerFirstName,
      senderLastName: customerData.customerLastName,
      countryCodesId: customerData.countryCode,
      mobileNumber: customerData.telephoneNo,
      username: customerData.email,
      password: customerData.password,
      address: customerData.residentialAddress,
      agentPromoCode: customerData?.agentPromoCode, //nullable,
      city: customerData.city,
      stateOrProvince: customerData.stateProvince,
      postCode: customerData.stateProvince,
      countryId: customerData.countryId, //country id or  agent sign up country id
      nationalityDetailsId: customerData.nationalityDetailsId,
      clientCode: 'MN', //nullable
      signUpCountryId: customerData.countryId,
      dateOfBirth: customerData.dateOfBirth,
      placeOfBirth: customerData.placeOfBirth,
      registeredFrom: 'AGENT_CUSTOMER_PORTAL', //ENUMS
      isAML: false, //default,
      agentExposableId: customerData.agentExposableId,
    };
    this.dataservice.customerBasicDetails = {
      ...this.dataservice.customerBasicDetails,
      ...data,
    };
    this.close();
    const model = this.modalService.create({
      nzTitle: 'Sign Up',
      nzContent: SignupContinueComponent,
      nzClosable: true,
      nzFooter: null,
      nzWidth: 510,
      nzClassName: 'sign-up-continue',
    });
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (window.innerWidth > 575) {
      this.close();
    }
  }
  validateAllFormFields(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      }
    });
  }
  submit() {
    const customerData = this.dataservice.customerBasicDetails;

    const data = {
      title: customerData.contactTitleName?.trim(),
      senderFirstName: customerData.customerFirstName?.trim(),
      senderLastName: customerData.customerLastName?.trim(),
      countryCodesId: customerData.countryCode,
      mobileNumber: customerData.telephoneNo,
      contactNo: customerData.telephoneNo,
      username: customerData.email?.trim(),
      password: customerData.password,
      address: customerData.residentialAddress?.trim(),
      agentPromoCode: customerData?.agentPromoCode, //nullable,
      city: customerData.city?.trim(),
      stateOrProvince: customerData.stateProvince?.trim(),
      postCode: customerData.stateProvince?.trim(),
      countryId: customerData.countryId, //country id or  agent sign up country id
      nationalityDetailsId: customerData.nationalityDetailsId,
      clientCode: 'MN', //nullable
      signUpCountryId: customerData.countryId,
      dateOfBirth: customerData.dateOfBirth,
      placeOfBirth: customerData.placeOfBirth?.trim(),
      registeredFrom: 'AGENT_CUSTOMER_PORTAL', //ENUMS
      isAML: false, //default,
      agentExposableId: customerData.agentExposableId,
    };

    this.signUpService.saveSignUp(data).subscribe({
      next: (res: any) => {
        if (res['responseDto']) {
          window.location.href =
            res['responseDto'].customerSignupUrlsDto.redirectUrl;
        } else {
          this.notification.create('error', 'Error', res['errorDescription']);
        }
      },
    });
  }

  dualRegistration() {
    const customerData = this.dataservice.customerBasicDetails;
    const data: any = {
      dateOfBirth: customerData.dateOfBirth,
      placeOfBirth: customerData.placeOfBirth?.trim(),
      telephoneNo: customerData.telephoneNo,
      customerName: customerData.customerFirstName?.trim(),
    };
    this.signUpService.dualRegistration(data).subscribe({});
  }
}
