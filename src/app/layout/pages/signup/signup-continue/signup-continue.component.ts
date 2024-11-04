import {
  Component,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { CustomValidators } from 'src/app/_helpers/validators/custom-validators';
import { SignupSummaryComponent } from '../signup-summary/signup-summary.component';
import { DataService } from 'src/app/_services/shared-data/data.service';
import { MyValidators } from 'src/app/_validators/custom-validator';
import { MetaService } from 'src/app/_services/meta.service';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { format } from 'date-fns';
import { SignUpService } from 'src/app/_services/sign-up.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-signup-continue',
  templateUrl: './signup-continue.component.html',
  styleUrls: ['./signup-continue.component.sass'],
})
export class SignupContinueComponent implements OnInit {
  countryPhoneName = true;
  countryPhoneCode = true;
  countryList: any[] = [];
  nationalityList: any[] = [];
  public personalInformationForm!: FormGroup;
  countryCodes: any[] = [];
  autoTips: Record<string, Record<string, string>> = {
    en: {
      required: 'Input is required',
    },
    default: {
      email: 'The input is not valid email',
      confirmPassword: 'Password not match',
    },
  };
  deviceInfo: any;
  constructor(
    private formBuilder: FormBuilder,
    private modalService: NzModalService,
    private modalRef: NzModalRef,
    private dataservice: DataService,
    private metaService: MetaService,
    private signUpService: SignUpService,
    private notification: NzNotificationService,
    private deviceInfoService: DeviceDetectorService
  ) {}
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (window.innerWidth > 575) {
      this.closeModal();
    }
  }
  ngOnInit(): void {
    this.deviceInfo = this.deviceInfoService.getDeviceInfo();
    const {
      customRequired,
      customConfirmPasswordRequired,
      maxLength,
      minLength,
      customEmail,
      contactNumberLength,
      pattern,
      characterLength,
      alphanumericPattern,
    } = MyValidators;
    this.personalInformationForm = this.formBuilder.group(
      {
        firstName: [null, [characterLength('First Name', 40)]],
        lastName: [
          null,
          [customRequired('Last Name'), characterLength('Last Name', 25)],
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
        code: [null, [customRequired('Code')]],
        contactNumber: [
          null,
          [
            customRequired('Contact Number'),
            contactNumberLength('Contact Number', 10),
          ],
        ],
        address: [
          null,
          [
            customRequired('Address'),
            characterLength('Address', 50),
            minLength(5),
          ],
        ],
        country: [null, [customRequired('Country')]],
        nationality: [null, [customRequired('Nationality')]],
        city: [
          null,
          [customRequired('City'), characterLength('City', 50), minLength(5)],
        ],
        postCode: [
          null,
          [customRequired('Post Code'), alphanumericPattern(5, 12)],
        ],
        stateProvince: [
          null,
          [characterLength('State/Province', 50), minLength(5)],
        ],

        password: [
          null,
          [
            customRequired('Password'),
            pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,}).*$'),
            minLength(8),
            ,
          ],
        ],
        confirmPassword: [null, [customConfirmPasswordRequired('Password')]],
        dateOfBirth: [null, [customRequired('DOB')]],
        placeOfBirth: [
          null,
          [characterLength('Place of Birth', 50), minLength(5)],
        ],
      },
      { validator: this.checkPasswords }
    );
    this.countryCodes = this.dataservice.countryCodelist;
    this.pathchvalue();

    this.getSignupCountryDetails();
    this.getNatioanilities();
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
  getSignupCountryDetails() {
    this.metaService
      .getCountries(this.dataservice.customerBasicDetails.agentExposableId)
      .subscribe({
        next: (res: any) => {
          if (res['responseDto']) {
            this.countryList = res['responseDto'];
            this.dataservice.countryList = this.countryList;
          }
        },
      });
  }
  getNatioanilities() {
    this.metaService.getNationalities().subscribe({
      next: (res: any) => {
        if (res['responseDto']) {
          this.nationalityList = res['responseDto'];
          this.dataservice.nationalityList = this.nationalityList;
        }
      },
    });
  }
  validateAllFormFields(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      }
    });
  }
  secondStepContinue() {
    if (!this.personalInformationForm.valid) {
      this.validateAllFormFields(this.personalInformationForm);
      return;
    } else {
      const customerDetails = this.dataservice.customerBasicDetails;
      let data: any = {
        agentBasicInfoDetailsId: customerDetails.agentBasicInfoDetailsId,
        customerFirstName: this.firstName?.value,
        customerLastName: this.lastName?.value,
        countryId: this.country?.value,
        telephoneNo: this.contactNumber?.value,
        email: this.email?.value,
        countryCode: this.code?.value,
        password: this.password?.value,
        residentialAddress: this.address?.value,
        city: this.city?.value,
        stateProvince: this.stateProvince?.value,
        postCode: this.postCode?.value,
        nationalityDetailsId: this.nationality?.value,
        isStatus: '1stStep', //hard coded value
        agentExposableId: customerDetails.agentExposableId,
        dateOfBirth: format(this.dateOfBirth?.value, 'yyyy-MM-dd'),
        placeOfBirth: this.placeOfBirth?.value,
        isMobile: false,
        portal: 'customer',
        browser: this.deviceInfo.browser,
      };

      this.signUpService.saveSignUpStep1(data).subscribe({
        next: (res: any) => {
          if (res['responseDto']) {
            //id=1369
            this.dataservice.customerBasicDetails = {
              ...data,
              ...this.dataservice.customerBasicDetails,
              agentBasicInfoDetailsId:
                res['responseDto']?.agentBasicInfoDetailsId,
            };
            // console.log(
            //   'this.dataservice.customerBasicDetails=======1',
            //   this.dataservice.customerBasicDetails
            // );

            this.closeModal();
            // this.openStep3();
          } else {
            this.notification.create('error', 'Error', res['errorDescription']);
          }
        },
      });
    }
  }
  openStep3() {
    this.modalService.create({
      nzTitle: 'Summary Details',
      nzContent: SignupSummaryComponent,
      nzClosable: true,
      nzFooter: null,
      nzWidth: 510,
      nzClassName: 'sign-up-summary',
    });
  }

  pathchvalue() {
    this.personalInformationForm.patchValue({
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
      dateOfBirth: this.dataservice.customerBasicDetails.dateOfBirth
        ? new Date(this.dataservice.customerBasicDetails.dateOfBirth)
        : null,
      placeOfBirth: this.dataservice.customerBasicDetails.placeOfBirth,
    });
  }

  closeModal() {
    this.modalRef.destroy();
  }
  dualRegistration() {
    const customerData = this.dataservice.customerBasicDetails;
    // console.log('signup', customerData);
    const data: any = {
      dateOfBirth: format(this.dateOfBirth?.value, 'yyyy-MM-dd'),
      placeOfBirth: this.placeOfBirth?.value?.trim(),
      telephoneNo: customerData.telephoneNo,
      customerName: customerData.customerFirstName?.trim(),
    };
    this.signUpService.dualRegistration(data).subscribe({});
  }
  submit() {
    const customerData = this.dataservice.customerBasicDetails;
    if (!this.personalInformationForm.valid) {
      this.validateAllFormFields(this.personalInformationForm);
      return;
    } else {
      const data = {
        title: customerData.contactTitleName?.trim(),
        senderFirstName: customerData.customerFirstName?.trim(),
        senderLastName: customerData.customerLastName?.trim(),
        countryCodesId: this.code?.value,
        mobileNumber: this.contactNumber?.value,
        contactNo: this.contactNumber?.value,
        username: this.email?.value?.trim(),
        password: this.password?.value,
        address: this.address?.value?.trim(),
        agentPromoCode: customerData?.agentPromoCode, //nullable,
        city: this.city?.value?.trim(),
        stateOrProvince: this.stateProvince?.value?.trim(),
        postCode: this.postCode?.value,
        countryId: this.country?.value, //country id or  agent sign up country id
        nationalityDetailsId: this.nationality?.value,
        clientCode: 'MN', //nullable
        signUpCountryId: this.country?.value,
        dateOfBirth: format(this.dateOfBirth?.value, 'yyyy-MM-dd'),
        placeOfBirth: this.placeOfBirth?.value?.trim(),
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
  }

  checkAlphabets(event: any) {
    let charCode = event.which || event.keyCode;
    let char = String.fromCharCode(charCode).toLowerCase();
    let alphabet = 'abcdefghijklmnopqrstuvwxyz';
    if (alphabet.indexOf(char) === -1) {
      event.preventDefault();
    }
  }
}
