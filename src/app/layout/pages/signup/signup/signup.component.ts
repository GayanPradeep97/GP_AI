import { Component, HostListener, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CustomValidators } from 'src/app/_helpers/validators/custom-validators';
import { SignupContinueComponent } from '../signup-continue/signup-continue.component';
import { NzSelectSearchComponent } from 'ng-zorro-antd/select';
import { DataService } from 'src/app/_services/shared-data/data.service';
import { MetaService } from 'src/app/_services/meta.service';
import { SignUpService } from 'src/app/_services/sign-up.service';
import { MyValidators } from 'src/app/_validators/custom-validator';
import { TokenStorageServiceService } from 'src/app/_services/token-storage-service.service';
import { AgentDetailsDataServiceService } from 'src/app/_services/agent-details-data.service';
import { CorporateAccountsChangeService } from 'src/app/_services/corporate-accounts-change.service';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-signup',

  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass'],
})
export class SignupComponent {
  countryPhoneCode = false;
  countryPhoneName = true;
  clickCount = 0;
  clickattibute = 0;
  contactNumberDisabled = false;
  data = [];
  isAvailable: any = true;
  agentBasicInfoDetailsId: any;
  public personalInformationForm!: FormGroup;

  agentExposableId = '';
  agentDetails: any;

  isPromoCodeVerified: any;
  ctitleName: any;
  countries: any[] = [];
  titles: any[] = [];
  countryCodes: any[] = [];
  deviceInfo: any;
  constructor(
    private modalService: NzModalService,
    private formBuilder: FormBuilder,
    private notification: NzNotificationService,
    private modalRef: NzModalRef,
    private dataservice: DataService,
    private metaService: MetaService,
    private signUpService: SignUpService,
    private tokenStorageService: TokenStorageServiceService,
    private agentDetailsDataService: AgentDetailsDataServiceService,
    private corporateAccountsChangeService: CorporateAccountsChangeService,
    private deviceInfoService: DeviceDetectorService
  ) {
    this.agentExposableId = this.tokenStorageService.getAgentExposable();
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (window.innerWidth > 575) {
      this.closeModal();
    }
  }
  ngOnInit() {
    this.deviceInfo = this.deviceInfoService.getDeviceInfo();
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
          minLength(9),
        ],
      ],
      titleName: [null, [customRequired('Title')]],
      agentPromoCode: [null],
    });

    this.getCountryCodesDetails();
    this.getAllContactTitles();
    this.getAllCountryCodes();
    // this.getAllAgentAndSubAgentDetails();
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
  get agentPromoCode() {
    return this.personalInformationForm.get('agentPromoCode');
  }
  get contactTitle() {
    return this.personalInformationForm.get('titleName');
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      }
    });
  }

  getCountryCodesDetails() {
    // this.countryCodeDataService.getCountryCodesDetailsService()
    //   .subscribe(res => {
    //     this.data = res['responseDto'];
    //   })
  }

  getExposableId() {
    this.agentDetailsDataService
      .getAgentExposableId()

      .subscribe({
        next: (res: any) => {
          this.agentExposableId = res['responseDto']['data'];
          this.tokenStorageService.saveAgentExposableId(this.agentExposableId);
          this.saveCustomerBasicDetails();
        },
      });
  }

  // getExposableId() {
  //   const data: any = {};
  //   data['username'] = this.tokenStorageService.getUser();
  //   this.corporateAccountsChangeService
  //     .getCorporateExposableId(data)
  //     .subscribe({
  //       next: (res: any) => {
  //         this.agentExposableId = res['responseDto']['agentExposableId'];
  //         this.tokenStorageService.saveAgentExposableId(this.agentExposableId);
  //         this.saveCustomerBasicDetails();
  //       },
  //     });
  // }

  getAllContactTitles() {
    this.metaService.getAllContactTitleNames().subscribe({
      next: (res: any) => {
        if (res['responseDto']) {
          this.titles = res['responseDto'];
        }
      },
    });
  }
  getAllCountryCodes() {
    this.metaService.getAllcountryCode().subscribe({
      next: (res: any) => {
        if (res['responseDto']) {
          this.countryCodes = res['responseDto'];
          this.dataservice.countryCodelist = this.countryCodes;
        }
      },
    });
  }
  getFieldName(option: any): any {
    switch (option) {
      case 'firstName': {
        return 'First Name';
        break;
      }
      case 'lastName': {
        return 'Last Name';
        break;
      }
      case 'email': {
        return 'Email';
        break;
      }
      case 'code': {
        return 'Country Code';
        break;
      }
      case 'contactNumber': {
        return 'Contact Number';
        break;
      }
      case 'agentPromoCode': {
        return 'Agent Promo Code';
      }
      case 'ctitleName': {
        return 'Title';
      }

      default: {
        break;
      }
    }
  }

  createNotification(
    type: string,
    content: string,
    color: string,
    title: string
  ): void {
    // title: string, message: string
    this.notification.create(type, title, content, {
      nzStyle: {
        background: color,
        color: '#fff',
        // width: '600px',
        // marginLeft: '-265px'
      },
    });
  }

  isFieldValid(field: string) {
    let message: string;

    if (
      !this.personalInformationForm.get(field)?.valid &&
      this.personalInformationForm.get(field)?.touched
    ) {
      switch (field) {
        case 'email': {
          message = 'Email must be valid email';
          break;
        }
        default: {
          message = 'Input error';
          break;
        }
      }
      this.createNotification('error', message, '#cc2d2d', 'Input Error');
    } else {
      this.personalInformationForm.get('email')?.setValue(this.email?.value);
    }
  }

  phoneCodeChange() {
    if (this.clickCount === 1 && this.clickattibute === 1) {
      this.countryPhoneCode = false;
      this.countryPhoneName = true;
      this.clickCount = 0;
      this.clickattibute = 0;
    } else if (this.clickCount === 1 && this.clickattibute === 0) {
      this.clickattibute = 1;
    }
  }

  mapCountryCodeDetails() {
    if (this.clickCount === 0) {
      this.countryPhoneCode = true;
      this.countryPhoneName = false;
      this.clickCount = 1;
      this.clickattibute = 0;
    }
  }

  focusOutFun() {
    if (this.code?.value) {
      this.countryPhoneCode = true;
      this.countryPhoneName = false;
      this.clickCount = 1;
      this.clickattibute = 1;
    }
  }

  phoneCodeInput() {
    this.countryPhoneCode = false;
    this.countryPhoneName = true;
  }

  numberOnly(event: { key: string }) {
    const seperator = '^([0-9])';
    const maskSeperator = new RegExp(seperator, 'g');
    let result = maskSeperator.test(event.key);
    return result;
  }

  checkUsernameAvailability() {
    const data: any = {};
    data['username'] = this.email?.value;

    // this.userDataService.checkUserAvailability(data).subscribe(res => {
    //   if (res['responseDto']) {
    //     this.isAvailable = res['responseDto'].isAvailable;
    //     if (res['responseDto'].isAvailable === false) {
    //       this.createNotification('error', 'Sorry, Email address is already registered', '#cc2d2d', 'Input Error');
    //     }
    //   }
    // });
  }

  firstStepContinue = () => {
    if (!this.personalInformationForm.valid) {
      this.validateAllFormFields(this.personalInformationForm);
      return;
    } else {
      this.getExposableId();

      this.checkPromotionCodeValidity();
    }
  };

  checkPromotionCodeValidity() {
    // this.subAgentPromotionDataService.validatePromotionCode(this.agentPromoCode.value).subscribe(res => {
    //   if (res['responseDto']) {
    //     this.isPromoCodeVerified = true;
    //   } else {
    //     this.isPromoCodeVerified = false;
    //   }
    // });
  }

  closeModal() {
    this.modalRef.destroy();
  }

  saveCustomerBasicDetails() {
    let data: any = {};
    console.log('sign up first name value', this.firstName?.value);
    console.log('sign up lastName name value', this.lastName?.value);
    data = {
      customerFirstName: this.firstName?.value?.trim(),
      customerLastName: this.lastName?.value?.trim(),
      email: this.email?.value?.trim(),
      telephoneNo: this.contactNumber?.value.toString(),
      countryCode: this.code?.value,
      agentPromoCode: this.agentPromoCode?.value?.trim(),
      contactTitleName: this.contactTitle?.value,
      isStatus: '0stStep',
      agentExposableId: this.agentExposableId,
      title: this.contactTitle?.value.contactTitle,
      phoneCode: this.code?.value,
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
            agentBasicInfoDetailsId: res['responseDto'].agentBasicInfoDetailsId,
          };
          // console.log(
          //   'this.dataservice.customerBasicDetails=======1',
          //   this.dataservice.customerBasicDetails
          // );

          this.closeModal();
          this.openStep2();
        } else {
          this.notification.create('error', 'Error', res['errorDescription']);
        }
      },
    });
    // testing click to continue go the next signup page

    // this.customerDataService.saveCustomerBasicDetails(data).subscribe(res => {
    //   if (res['responseDto']) {
    //     this.agentBasicInfoDetailsId = res['responseDto'].agentBasicInfoDetailsId
    //     this.modalService.createComponentModal(IdCheckStepsComponent, 'Sign Up', 'Sign Up', '');

    //     const data = {
    //       firstName: this.firstName.value,
    //       lastName: this.lastName.value,
    //       code: this.code.value,
    //       contactNumber: this.contactNumber.value,
    //       email: this.email.value,
    //       agentBasicInfoDetailsId: this.agentBasicInfoDetailsId,
    //       agentPromoCode: this.agentPromoCode.value,
    //       // referredAgentId: this.referredAgent.value.agentDetailsId
    //       isPromoCodeVerified: this.isPromoCodeVerified,
    //       title:this.contactTitle.value.contactTitle
    //     }
    //     localStorage.setItem('customerBasicDetails', JSON.stringify(data));
    //   }
    // });
  }
  openStep2() {
    const model = this.modalService.create({
      nzTitle: 'Sign Up',
      nzContent: SignupContinueComponent,
      nzClosable: true,
      nzFooter: null,
      nzWidth: 510,
      nzClassName: 'sign-up-continue',
    });
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
