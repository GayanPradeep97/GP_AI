import { Component, EventEmitter, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { differenceInCalendarDays, format } from 'date-fns';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Subject, takeUntil } from 'rxjs';
import { CustomValidators } from 'src/app/_helpers/validators/custom-validators';
import { AgentDetailsDataServiceService } from 'src/app/_services/agent-details-data.service';
import { AgentSenderDataService } from 'src/app/_services/agent-sender-data.service';
import { CommonService } from 'src/app/_services/common.service';
import { CompanyDetailService } from 'src/app/_services/company-detail.service';
import { CoporateSenderDataService } from 'src/app/_services/coporate-sender-data.service';
import { CorporateAccountsChangeService } from 'src/app/_services/corporate-accounts-change.service';
import { CountryDataService } from 'src/app/_services/country-data.service';
import { CreateCorporateAccountService } from 'src/app/_services/create-corporate-account.service';
import { SettingService } from 'src/app/_services/setting.service';
import { EventTriggerService } from 'src/app/_services/shared-data/event-trigger.service';
import { TokenStorageServiceService } from 'src/app/_services/token-storage-service.service';
import { TokenService } from 'src/app/_services/token.service';
import { MyValidators } from 'src/app/_validators/custom-validator';

@Component({
  selector: 'app-corporate-account-basic-information',
  templateUrl: './corporate-account-basic-information.component.html',
  styleUrls: ['./corporate-account-basic-information.component.sass'],
})
export class CorporateAccountBasicInformationComponent {
  current = 0;
  index = 0;
  countryCodes!: any; //used
  userValue: any; //used
  agentExposableId: any; // used
  countries: any; //used
  companyTypes: any; //used
  contactRoles: any; //used
  isCoporateAccountAvailable: any; //used
  agentUserCoporateSenderDetailsId: any; //used
  userId: any; //used
  goNextpage = false;

  public companyInfoForm!: FormGroup; //used

  @Output() goNextpageChange = new EventEmitter<boolean>();
  @Output() agentUserCoporateSenderDetailsIdChange = new EventEmitter<string>();

  showCountry: any;

  agentCustomerData: any;

  agentSenderDetailsId: any;
  agentDetailsId: any;

  file!: File;

  uploadedDocumentData: any;
  documentDetailsArray = [];
  todayDate = new Date();

  data = [
    {
      countryId: {
        referenceCountryCode: 'AF',
        referenceCountryName: 'Afghanistan',
      },
    },
  ];
  countryPhoneCode = false;
  countryPhoneName = true;
  clickCount = 0;
  clickattibute = 0;
  contactNumberDisabled = false;
  postalCodeDisable = false;
  countryPhoneCodeSec = false;
  countryPhoneNameSec = true;
  clickCountSec = 0;
  clickattibuteSec = 0;
  contactNumberDisabledSec = false;
  roleType: any;

  public unsubscribe$ = new Subject<void>();
  userIdd: any;

  constructor(
    private formBuilder: FormBuilder,
    private notificationService: NzNotificationService,
    private createCorporateAccount: CreateCorporateAccountService,
    private countryDataService: CountryDataService,
    private agentDetailsDataServiceService: AgentDetailsDataServiceService,
    private commonService: CommonService,
    private tokenService: TokenService,
    private companyDetailService: CompanyDetailService,
    private coporateSenderData: CoporateSenderDataService,
    private eventTrigger: EventTriggerService,
    private agentSerderDataService: AgentSenderDataService,
    private settingService: SettingService,
    private corporateAccountsChangeService: CorporateAccountsChangeService,
    private tokenStorageService: TokenStorageServiceService
  ) {
    this.userValue = this.commonService.parseJwt(tokenService.getToken());
    // console.log('user values', this.userValue);
  }

  ngOnInit() {
    const {
      required,
      customRequired,
      maxLength,
      minLength,
      customEmail,
      pattern,
    } = MyValidators;

    this.companyInfoForm = this.formBuilder.group({
      companyName: [null, Validators.required],
      companyRegNumber: [null, Validators.required],
      companyEmail: [
        null,
        Validators.compose([
          Validators.required,
          CustomValidators.patternValidator(
            // tslint:disable-next-line: max-line-length
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            { has: true }
          ),
        ]),
      ],
      countryCodesIdPrimary: [null, Validators.required],
      companyTelephone: [
        null,
        Validators.compose([Validators.required, maxLength(15)]),
      ],
      countryCodesIdSecondary: [null, Validators.required],
      companyMobile: [
        null,
        Validators.compose([Validators.required, maxLength(15)]),
      ],
      companyStreet: [null, Validators.required],
      companyCity: [null, Validators.required],
      companyPostalCode: [null, Validators.required],
      stateOrProvince: [null, Validators.required],
      country: [null, Validators.required],
      companytype: [null, Validators.required],
      contactRole: [null, Validators.required],
      incorporationdate: [null, Validators.required],
    });

    this.getcountryCode();
    this.getAgentExposableId();
    this.getAllCompanyTypes();
    this.getConctRoleDetails();
    this.getAgentSender();
  }
  getAgentSender() {
    const data: any = {};
    data['username'] = this.tokenStorageService.getUser();
    this.settingService.getUserSetting(data).subscribe({
      next: (res) => {
        this.userIdd = res['responseDto'];
      },
    });
  }
  get companyName() {
    return this.companyInfoForm.get('companyName');
  }
  get companyRegNumber() {
    return this.companyInfoForm.get('companyRegNumber');
  }
  get companyEmail() {
    return this.companyInfoForm.get('companyEmail');
  }
  get countryCodesIdPrimary() {
    return this.companyInfoForm.get('countryCodesIdPrimary');
  }
  get companyTelephone() {
    return this.companyInfoForm.get('companyTelephone');
  }
  get countryCodesIdSecondary() {
    return this.companyInfoForm.get('countryCodesIdSecondary');
  }
  get companyMobile() {
    return this.companyInfoForm.get('companyMobile');
  }
  get companyStreet() {
    return this.companyInfoForm.get('companyStreet');
  }
  get companyCity() {
    return this.companyInfoForm.get('companyCity');
  }
  get companyPostalCode() {
    return this.companyInfoForm.get('companyPostalCode');
  }
  get stateOrProvince() {
    return this.companyInfoForm.get('stateOrProvince');
  }
  get country() {
    return this.companyInfoForm.get('country');
  }
  get companytype() {
    return this.companyInfoForm.get('companytype');
  }
  get contactRole() {
    return this.companyInfoForm.get('contactRole');
  }
  get incorporationdate() {
    return this.companyInfoForm.get('incorporationdate');
  }

  validateForm(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field: any) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        if (control!.invalid) {
          control!.markAsDirty();
          control!.updateValueAndValidity({ onlySelf: true });
          const fieldName = this.getFieldName(field);

          if (fieldName === 'company Email') {
            if (
              this.companyInfoForm.get('companyEmail')?.value === null ||
              this.companyInfoForm.get('companyEmail')?.value === ''
            ) {
              this.notificationService.create(
                'error',
                'Input Error',
                'Email cannot be empty',
                { nzStyle: { background: '#cc2d2d', color: '#fff' } }
              );
            } else if (
              this.companyInfoForm.get('companyEmail')?.value != null
            ) {
              this.notificationService.create(
                'error',
                'Input Error',
                'Email must be valid',
                { nzStyle: { background: '#cc2d2d', color: '#fff' } }
              );
            }
          } else if (fieldName === 'Primary Contact No') {
            if (
              this.companyInfoForm.get('companyTelephone')?.value === null ||
              this.companyInfoForm.get('companyTelephone')?.value === ''
            ) {
              this.notificationService.create(
                'error',
                'Input Error',
                'Primary Contact No cannot be empty',
                { nzStyle: { background: '#cc2d2d', color: '#fff' } }
              );
            } else if (
              this.companyInfoForm.get('companyTelephone')?.value != null
            ) {
              this.notificationService.create(
                'error',
                'Input Error',
                'Primary Contact number should be less than 15',
                { nzStyle: { background: '#cc2d2d', color: '#fff' } }
              );
            }
          } else if (fieldName === 'Secondary Contact No') {
            if (
              this.companyInfoForm.get('companyMobile')?.value === null ||
              this.companyInfoForm.get('companyMobile')?.value === ''
            ) {
              this.notificationService.create(
                'error',
                'Input Error',
                'Secondary Contact No cannot be empty',
                { nzStyle: { background: '#cc2d2d', color: '#fff' } }
              );
            } else if (
              this.companyInfoForm.get('companyMobile')?.value != null
            ) {
              this.notificationService.create(
                'error',
                'Input Error',
                'Secondary Contact number should be less than 15',
                { nzStyle: { background: '#cc2d2d', color: '#fff' } }
              );
            }
          } else {
            this.notificationService.create(
              'error',
              'Input Error',
              fieldName + ' cannot be empty',
              { nzStyle: { background: '#cc2d2d', color: '#fff' } }
            );
          }
        } else if (control instanceof FormGroup) {
          this.validateForm(control);
        }
      }
    });
  }

  getFieldName(option: any): any {
    switch (option) {
      case 'companyName': {
        return 'Company Name';
      }
      case 'companyRegNumber': {
        return 'Company RegNumber';
      }
      case 'companyEmail': {
        return 'company Email';
      }
      case 'companyTelephone': {
        return 'Primary Contact No';
      }
      case 'companyMobile': {
        return 'Secondary Contact No';
      }
      case 'companyStreet': {
        return 'Company Street';
      }
      case 'companyCity': {
        return 'Company City';
      }
      case 'companyPostalCode': {
        return 'Company Postal Code';
      }
      case 'stateOrProvince': {
        return 'State Or Province';
      }
      case 'country': {
        return 'Country';
      }
      case 'companytype': {
        return 'Company Type';
      }
      case 'contactRole': {
        return 'Contact Role';
      }
      case 'incorporationdate': {
        return 'Date';
      }
      case 'countryCodesIdSecondary': {
        return 'Secondary Country Code';
      }
      case 'countryCodesIdPrimary': {
        return 'Primary Country Code';
      }
    }
  }

  submitForm() {
    if (!this.companyInfoForm.valid) {
      this.validateForm(this.companyInfoForm);
      // this.checkSenderAvailability();
    } else {
      const formData = {
        companyName: this.companyName?.value?.trim(),
        companyRegNumber: this.companyRegNumber?.value?.trim(),
        companyStreet: this.companyStreet?.value?.trim(),
        companyCity: this.companyCity?.value?.trim(),
        companyPostalCode: this.companyPostalCode?.value?.trim(),
        companyEmail: this.companyEmail?.value?.trim(),
        companyTelephone: this.companyTelephone?.value,
        companyMobile: this.companyMobile?.value,
        stateOrProvince: this.stateOrProvince?.value?.trim(),
        mobileCodesId: this.countryCodesIdPrimary?.value,
        phoneCodesId: this.countryCodesIdSecondary?.value,

        // mobileCodesDto: {
        // },
        // phoneCodesDto: {
        //   countryCodesId: this.countryCodesIdSecondary?.value,
        // },
        companytype: this.companytype?.value,
        roleType: this.contactRole?.value,
        incorporationdate: format(this.incorporationdate?.value, 'yyyy-MM-dd'),

        userDto: {
          id: this.userIdd.id,
        },
        agentSenderDetailsDto: {
          agentSenderDetailsId: this.agentSenderDetailsId,
        },
        agentDetailsDto: {
          agentDetailsId: this.agentDetailsId,
        },
        signupCountryDto: {
          agentCustomerSignupCountriesId: this.country?.value,
        },
        // country: this.country?.value,
      };

      this.createCorporateAccount
        .addNewCorporateSender(formData)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((res) => {
          if (res['responseDto'] != null) {
            this.eventTrigger.onReloadServiceData();
            const message = res['responseDto']['message'];
            this.notificationService.create(
              'success',
              'Success',
              'Corporate Sender Details Saved Successfully',
              {
                nzStyle: { background: '#00A03E', color: '#fff' },
              }
            );
            this.agentUserCoporateSenderDetailsId =
              res['responseDto']['agentUserCooperateSenderDetailsId'];

            this.goNextpageChange.emit(true);
            this.agentUserCoporateSenderDetailsIdChange.emit(
              this.agentUserCoporateSenderDetailsId
            );
          } else if (res['errorDescription']) {
            const errorDescription = res['errorDescription'];
            this.notificationService.create(
              'error',
              'Input Error',
              errorDescription,
              { nzStyle: { background: '#cc2d2d', color: '#fff' } }
            );
          } else {
            this.notificationService.create(
              'error',
              'Input Error',
              'Create corporate account saving failed',
              { nzStyle: { background: '#cc2d2d', color: '#fff' } }
            );
          }
        });
    }
  }

  getcountryCode() {
    this.countryDataService
      .getCountryCode()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (res) => {
          this.countryCodes = res['responseDto'];
        },
      });
  }

  getAgentExposableId() {
    const data: any = {};
    data['username'] = this.tokenStorageService.getUser();

    this.agentDetailsDataServiceService
      .getExposableIdByUserName(data)
      .pipe(takeUntil(this.unsubscribe$))

      .subscribe({
        next: (res) => {
          this.agentExposableId = res['responseDto']['agentExposableId'];
          this.getSignUpCountries();
          this.getAgentSenderDetails();
        },
      });
  }

  getSignUpCountries() {
    const data: any = {};
    data['agentExposableId'] = this.agentExposableId;
    this.countryDataService
      .getSignupAllCountries(data)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (res) => {
          this.countries = res['responseDto'];
        },
      });
  }

  getAllCompanyTypes() {
    this.companyDetailService.getAllCompanyType().subscribe({
      next: (res) => {
        this.companyTypes = res['responseDto'];
      },
    });
  }

  getConctRoleDetails() {
    this.createCorporateAccount.getContactRole().subscribe({
      next: (res) => {
        this.contactRoles = res['responseDto'];
      },
    });
  }

  getAgentSenderDetails() {
    const data: any = {};
    data['exposableId'] = this.agentExposableId;
    data['email'] = this.tokenStorageService.getUser();

    this.agentSerderDataService.getAgentSenderDataByEmail(data).subscribe({
      next: (res: any) => {
        this.agentSenderDetailsId = res['responseDto']['agentSenderDetailsId'];
        this.agentDetailsId = res['responseDto']['agentDetailsId'];
        this.userId = res['responseDto']['agentSenderDetailsId'];
      },
    });
  }

  checkSenderAvailability() {
    const data: any = {};

    data['email'] = this.companyEmail!.value;
    this.coporateSenderData.checkCoporateSenderAvailable(data).subscribe({
      next: (res) => {
        if (res['responseDto']) {
          this.isCoporateAccountAvailable = res['responseDto']['availability'];
          if (this.isCoporateAccountAvailable === false) {
            this.notificationService.create(
              'error',
              'Input Error',
              'Sorry, Email address is already registered',
              { nzStyle: { background: '#cc2d2d', color: '#fff' } }
            );
          }
        }
      },
    });
  }

  contactNumberValidation() {
    if (this.companyTelephone!.value) {
      let data = this.companyTelephone!.value.charAt(0);
      let currentData = '';
      if (data === '0') {
        for (let i = 1; i < this.companyTelephone!.value.length; i++) {
          currentData = currentData + this.companyTelephone!.value.charAt(i);
        }
        this.companyInfoForm.patchValue({
          companyTelephone: currentData,
        });
      }
    }
  }

  numberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  checkLength(event: any): any {
    if (this.companyTelephone!.value.length > 15) {
      let currentData = '';
      if (!event) {
        if (this.contactNumberDisabled) {
          return true;
        }
      } else {
        if (event.inputType === 'deleteContentBackward') {
          this.contactNumberDisabled = true;
        } else {
          this.contactNumberDisabled = false;
          for (let i = 0; i < this.companyTelephone!.value.length - 1; i++) {
            currentData = currentData + this.companyTelephone!.value.charAt(i);
          }
          this.companyInfoForm.patchValue({
            primaryContact: currentData,
          });
          this.notificationService.create(
            'error',
            'Invalid Contact Number',
            'Contact Number should be less than 15',
            { nzStyle: { background: '#cc2d2d', color: '#fff' } }
          );
        }
      }
    } else {
      this.contactNumberDisabled = false;
    }
  }

  checkLengthPostalCode(event: any): any {
    if (this.companyPostalCode!.value.length >= 7) {
      let currentData = '';
      if (!event) {
        if (this.postalCodeDisable) {
          return true;
        }
      } else {
        if (event.inputType === 'deleteContentBackward') {
          this.postalCodeDisable = true;
        } else {
          this.postalCodeDisable = false;
          for (let i = 0; i < this.companyTelephone!.value.length - 1; i++) {
            currentData = currentData + this.companyPostalCode!.value.charAt(i);
          }
          this.companyInfoForm.patchValue({
            companyPostalCode: currentData,
          });
          this.notificationService.create(
            'error',
            'Invalid Contact Number',
            'Contact Number should be less than 7',
            { nzStyle: { background: '#cc2d2d', color: '#fff' } }
          );
        }
      }
    } else {
      this.postalCodeDisable = false;
    }
  }

  disabledFutureDates = (current: Date): boolean => {
    return differenceInCalendarDays(current, this.todayDate) > 0;
  };

  nextPage(): any {
    if (this.current === 0) {
      // this.current = this.current + 1;
      return this.current + 1;
    } else {
      this.current = this.current - 1;
      // console.log('nextpagee eka call curret -');
    }
  }

  // getCurrentValue(): number {
  //   return this.current;
  // }

  closeModal() {}
}
