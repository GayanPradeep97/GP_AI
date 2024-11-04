import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import format from 'date-fns/format';
import { DataService } from 'src/app/_services/shared-data/data.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { MyBeneficiaryService } from 'src/app/_services/my-beneficiary.service';
import { Subject, takeUntil } from 'rxjs';
import { CommonService } from 'src/app/_services/common.service';
import { TokenService } from 'src/app/_services/token.service';
import { SettingService } from 'src/app/_services/setting.service';
import { EventTriggerService } from 'src/app/_services/shared-data/event-trigger.service';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { MyValidators } from 'src/app/_validators/custom-validator';
import { TokenStorageServiceService } from 'src/app/_services/token-storage-service.service';
import { CorporateAccountsChangeService } from 'src/app/_services/corporate-accounts-change.service';
import { CountryDataService } from 'src/app/_services/country-data.service';

@Component({
  selector: 'app-view-beneficiary-modal',
  templateUrl: './view-beneficiary-modal.component.html',
  styleUrls: ['./view-beneficiary-modal.component.sass'],
})
export class ViewBeneficiaryModalComponent {
  currentIndex = 0;
  data: any;
  isActive = false;

  public beneficiaryDetailsForm!: FormGroup;
  agentCustomerData: any;
  agentExposableId: any;
  agentSenderDetailsId: any;
  currentUser: any;
  public accountDetailsForm!: FormGroup;
  transferApprovedCountries: any;
  agentBeneficiaryDetailsId: any;
  isSriLankan = false;
  bankList: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  bankCodeLabel: boolean = false;
  swiftCodeLabel: boolean = false;

  clientCurrencyData: any;
  pageNumber = 1;
  pageSize = 5;
  currentPageIndex = 1;
  totalRecords: any;
  bankAccountDetails: any;

  seletcedBeneficiaryData: any;
  isEditBeneficiary = false;
  isCoporate = false;
  currentActiveUserAccount: any;
  isDateOfBirthValid = false;
  nationalityData: any;
  statusValue: any;
  countryPhoneCode = false;
  countryPhoneName = true;
  clickCount = 0;
  clickattibute = 0;
  contactNumberDisabled = false;
  countryPhoneCode1 = false;
  countryPhoneName1 = true;
  clickCount1 = 0;
  clickattibute1 = 0;
  contactNumberDisabled1 = false;
  personalBeneficiaryData: any;
  isBeneficiaryEditable = false;
  recipientCurrencies: any;
  totalRecordsBank: any;
  //temporary data
  bankaccountsList: any;
  countryData: any;
  //temporary create services.
  commonsService: any;
  agentDetailsDataService: any;
  agentSenderDataService: any;
  countryDataService: any;
  bankDataService: any;
  bankLabelCode: any;
  bankAccountDataService: any;
  nationalityDetailsService: any;
  countryCodeDataService: any;
  clientCurrencyDataService: any;
  personalBeneficiary: any;
  receivingCountryData: any;
  receivingCountriesData: any;
  user_id: any;
  id: any;
  routingNumber!: boolean;
  bankCodeInput!: boolean;
  swiftCodeInput!: boolean;
  isIban!: boolean;
  isIfsc!: boolean;
  isbrnachCode!: boolean;
  beneficiaryEditable: any;
  isBankSl = false;
  selectedClientCountryIdValue: any;
  constructor(
    private formBuilder: FormBuilder,
    private notificationService: NzNotificationService,
    private beneficiaryDataService: MyBeneficiaryService,
    private modalRef: NzModalRef,
    private dataService: DataService,
    private commonService: CommonService,
    private tokenService: TokenService,
    private settingsService: SettingService,
    private eventTriggerService: EventTriggerService,
    private tokenStorageService: TokenStorageServiceService,
    private corporateAccountsChangeService: CorporateAccountsChangeService,
    private countryDataServices: CountryDataService
  ) {
    this.currentUser = this.commonService.parseJwt(tokenService.getToken());
  }

  ngOnInit() {
    const {
      required,
      customRequired,
      maxLength,
      minLength,
      customEmail,
      pattern,
      contactNumberLength,
      characterLength,
      alphanumericPatternWithoutSpace,
      alphanumericPattern,
      exactLength,
      specificPattern,
    } = MyValidators;
    this.beneficiaryDetailsForm = this.formBuilder.group({
      beneficiaryFirstName: [null, null],
      beneficiaryLastName: [
        null,
        [customRequired('Last Name'), characterLength('Last Name', 25)],
      ],
      code1: [null, null],
      code2: [null, Validators.required],
      beneficiaryTelephone: [
        null,
        [Validators.compose([minLength(9), maxLength(10)])],
      ],
      beneficiaryhandphone: [
        null,
        [
          Validators.compose([
            Validators.required,
            minLength(9),
            maxLength(10),
          ]),
        ],
      ],
      beneficiaryAddress: [
        null,
        [
          Validators.compose([
            Validators.required,
            minLength(5),
            maxLength(50),
          ]),
        ],
      ],
      dateOfBirth: [null, null],
      placeOfBirth: [null, null],
      nationality: [null, null],
      companyName: [
        null,
        [Validators.compose([Validators.required, maxLength(25)])],
      ],
      isCoporateBeneficiary: [false],
      providerDetailsDto: [null],
    });

    this.accountDetailsForm = this.formBuilder.group({
      country: [null, Validators.required],
      bankName: [null, Validators.required],
      accountNumber: [null, [Validators.required, maxLength(30)]],
      branchName: [null, [Validators.required, alphanumericPattern(5, 35)]],
      bankCode: [null, [Validators.required, exactLength('Bank Code', 3)]],
      swiftCode: [null, [Validators.required, alphanumericPattern(8, 11)]],
      supportCurrency: [null, Validators.required],
      routingNumberLabel: [
        null,
        [Validators.required, minLength(9), maxLength(9)],
      ],
      iban: [null, [Validators.required, alphanumericPattern(15, 34)]],
      ifsc: [null, [Validators.required, specificPattern()]],
      branchCode: [null, [Validators.required, exactLength('Branch Code', 5)]],
    });

    if (this.dataService.clickEventStatus === 'editBeneficiary') {
      this.isEditBeneficiary = true;
      this.getSelectedBeneficiaryData();
    } else {
      this.isBeneficiaryEditable = true;
    }
    this.eventTriggerService.executeOnchangeFunction.subscribe(() => {
      // this.getAllNationalityDetails();
      // this.getCountryCodesDetails();
      // this.getClientCurrency();
      // this.getAgentCountry();
    });
    this.getAllNationalityDetails();
    this.getCountryCodesDetails();
    // this.getClientCurrency();
    // this.getAgentCountry();
    // this.accountTypeChange();
    this.getExposableId();
    this.getCountry();

    // console.log(this.dataService.isBenEditable);
    if (
      this.dataService.isBenEditable === false &&
      this.dataService.clickEventStatus === 'editBeneficiary'
    ) {
      this.beneficiaryDetailsForm.disable();
    }
    this.personalBeneficiary = this.dataService.beneficiaryDataPersonal;
  }

  get beneficiaryFirstName() {
    return this.beneficiaryDetailsForm.get('beneficiaryFirstName');
  }
  get beneficiaryLastName() {
    return this.beneficiaryDetailsForm.get('beneficiaryLastName');
  }
  get companyName() {
    return this.beneficiaryDetailsForm.get('companyName');
  }
  get beneficiaryTelephone() {
    return this.beneficiaryDetailsForm.get('beneficiaryTelephone');
  }
  get beneficiaryhandphone() {
    return this.beneficiaryDetailsForm.get('beneficiaryhandphone');
  }
  get code1() {
    return this.beneficiaryDetailsForm.get('code1');
  }
  get code2() {
    return this.beneficiaryDetailsForm.get('code2');
  }
  get beneficiaryAddress() {
    return this.beneficiaryDetailsForm.get('beneficiaryAddress');
  }
  get dateOfBirth() {
    return this.beneficiaryDetailsForm.get('dateOfBirth');
  }
  get placeOfBirth() {
    return this.beneficiaryDetailsForm.get('placeOfBirth');
  }
  get nationality() {
    return this.beneficiaryDetailsForm.get('nationality');
  }
  get isCoporateBeneficiary() {
    return this.beneficiaryDetailsForm.get('isCoporateBeneficiary');
  }
  get providerDetailsDto() {
    return this.beneficiaryDetailsForm.get('providerDetailsDto');
  }
  get country() {
    return this.accountDetailsForm.get('country');
  }
  get bankName() {
    return this.accountDetailsForm.get('bankName');
  }
  get bank() {
    return this.accountDetailsForm.get('bank');
  }
  get accountNumber() {
    return this.accountDetailsForm.get('accountNumber');
  }
  get branchName() {
    return this.accountDetailsForm.get('branchName');
  }
  get bankCode() {
    return this.accountDetailsForm.get('bankCode');
  }
  get swiftCode() {
    return this.accountDetailsForm.get('swiftCode');
  }
  get supportCurrency() {
    return this.accountDetailsForm.get('supportCurrency');
  }
  get routingNumberLabel() {
    return this.accountDetailsForm.get('routingNumberLabel');
  }
  get iban() {
    return this.accountDetailsForm.get('iban');
  }
  get ifsc() {
    return this.accountDetailsForm.get('ifsc');
  }
  get branchCode() {
    return this.accountDetailsForm.get('branchCode');
  }

  getFieldName(option: any): any {
    switch (option) {
      case 'beneficiaryFirstName': {
        return 'Beneficiary First Name';
      }
      case 'beneficiaryLastName': {
        return 'Beneficiary Last Name';
      }
      case 'companyName': {
        return 'Company Name';
      }
      case 'beneficiaryTelephone': {
        return 'Contact Number';
      }
      case 'beneficiaryhandphone': {
        return 'Mobile Number';
      }
      case 'code1': {
        return 'Country Code';
        break;
      }
      case 'code2': {
        return 'Country Code';
        break;
      }
      case 'beneficiaryAddress': {
        return 'Address';
      }
      case 'dateOfBirth': {
        return 'Date of Birth';
      }
      case 'placeOfBirth': {
        return 'Place of Birth';
      }
      case 'nationality': {
        return 'Nationality';
      }
      case 'isCoporateBeneficiary': {
        return ' Benificiary Account Type';
      }
      case 'country': {
        return 'Country';
      }
      case 'bankName': {
        return 'Bank Name';
      }
      case 'bank': {
        return 'Bank Name';
      }
      case 'accountNumber': {
        return 'Account Number';
      }
      case 'branchName': {
        return 'Branch Name';
      }
      case 'bankCode': {
        return 'Bank Code';
      }
      case 'swiftCode': {
        return 'Swift Code';
      }
      case 'supportCurrency': {
        return 'Currency';
      }
      case 'routingNumberLabel': {
        return 'Routing Number';
      }
    }
  }
  getExposableId() {
    const data: any = {};
    data['username'] = this.tokenStorageService.getUser();
    this.settingsService
      .getExposableIdByUsername(data)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.user_id = res['responseDto'];
          this.getAgentSenderDetails(this.user_id.agentExposableId);
          this.getClientCurrency(this.user_id.agentExposableId);
          // console.log('id', this.user_id.agentExposableId);
        },
      });
  }
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        if (!control.value && control.errors) {
          control.markAsDirty();
          control.updateValueAndValidity();
          const fieldName = this.getFieldName(field);
          // this.notificationService.createNotification('error', fieldName + ' cannot be empty', '#cc2d2d', 'Input Error');
          this.createNotification(
            'error',
            'Input Error',
            fieldName + ' cannot be empty',
            '#ffffff',
            '#cc2d2d'
          );
        } else {
          // this.isFieldValid(field);
        }
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  prev(): void {
    this.currentIndex = 0;
    this.clearBenefidata();
  }

  clearBenefidata() {
    this.beneficiaryLastName?.reset();
    this.beneficiaryFirstName?.reset();
    this.companyName?.reset();
    this.code1?.reset();
    this.beneficiaryTelephone?.reset();
    this.code2?.reset();
    this.beneficiaryhandphone?.reset();
    this.beneficiaryAddress?.reset();
    this.dateOfBirth?.reset();
    this.placeOfBirth?.reset();
    this.nationality?.reset();
  }

  next() {
    this.currentIndex = this.currentIndex + 1;
    // console.log('next go');
  }

  getAgentSenderDetails(receivedId: any) {
    const data: any = {};
    data['agentExposableId'] = receivedId;
    data['email'] = this.tokenStorageService.getUser();

    this.beneficiaryDataService.getAgentSender(data).subscribe((res: any) => {
      if (res['responseDto']) {
        this.agentSenderDetailsId = res['responseDto']['agentSenderDetailsId'];
        console.log(
          'clkient currency id check is available.',
          res['responseDto']
        );

        this.dataService.clientCountryId = res['responseDto'].signUpCountryId;
      }
    });
  }

  firstStepContinue() {
    if (!this.beneficiaryDetailsForm.valid) {
      this.validateAllFormFields(this.beneficiaryDetailsForm);
    } else if (
      !this.isCoporate &&
      this.beneficiaryFirstName!.value.length < 3
    ) {
      this.createNotification(
        'error',
        'Input Error',
        'First name should contain at least 3 characters',
        '#ffffff',
        '#cc2d2d'
      );
      return;
    } else if (!this.isCoporate && this.beneficiaryLastName!.value.length < 3) {
      this.createNotification(
        'error',
        'Input Error',
        'Last name should contain at least 3 characters',
        '#ffffff',
        '#cc2d2d'
      );
      return;
    } else if (
      !this.isCoporate &&
      this.dateOfBirth!.value &&
      !this.isDateOfBirthValid
    ) {
      this.validateDob();
    } else if (this.contactNumberDisabled) {
      this.checkLength(null);
      return;
    } else if (this.contactNumberDisabled1) {
      this.checkLength1(null);
      return;
    } else {
      this.addBeneficiaryDetails();
      // this.next();
    }
  }

  secondStepContinue() {
    if (!this.accountDetailsForm.valid) {
      this.validateAllFormFields(this.accountDetailsForm);
    } else {
      this.addBeneficiaryDetails();
    }
  }

  addBeneficiaryDetails() {
    let dateOfBirthResult;
    let agentBeneficiaryDetailsIdResult;
    let nationalityDetailsDtoResult;

    if (this.isEditBeneficiary) {
      agentBeneficiaryDetailsIdResult = this.agentBeneficiaryDetailsId;

      if (this.dateOfBirth!.value) {
        dateOfBirthResult = this.dateOfBirth!.value;
      }
    } else {
      agentBeneficiaryDetailsIdResult = null;

      if (this.dateOfBirth!.value) {
        dateOfBirthResult = format(this.dateOfBirth!.value, 'yyyy-MM-dd');
      }
    }

    if (this.isCoporate) {
      nationalityDetailsDtoResult = null;
    } else {
      nationalityDetailsDtoResult = {
        nationalityDetailsId: this.nationality!.value?.nationalityDetailsId,
      };
    }
    if (!this.beneficiaryDetailsForm.valid) {
      this.validateAllFormFields(this.beneficiaryDetailsForm);
      return;
    } else {
      const formData = {
        // agentBeneficiaryDetailsId: agentBeneficiaryDetailsIdResult,
        beneficiaryFirstName: this.isCoporate
          ? this.companyName!.value?.trim()
          : this.beneficiaryFirstName!.value?.trim(),
        beneficiaryLastName: this.isCoporate
          ? null
          : this.beneficiaryLastName!.value?.trim(),
        contactNumber: this.beneficiaryTelephone!.value,
        mobileNumber: this.beneficiaryhandphone!.value,
        contactId: this.code1!.value,
        mobileId: this.code2!.value,
        address: this.beneficiaryAddress!.value?.trim(),
        dateOfBirth: this.isCoporate ? null : dateOfBirthResult,
        placeOfBirth: this.isCoporate ? null : this.placeOfBirth!.value?.trim(),
        nationalityDetailsId: this.nationality?.value,
        isActive: true,
        isCoporateBeneficiary: this.isCoporateBeneficiary!.value,
        // clientCountryId: this.dataService.clientCountryId,
        agentSenderDetailsDto: {
          agentSenderDetailsId: this.agentSenderDetailsId,
        },
      };

      this.beneficiaryDataService
        .saveAgentBeneficiaryDetails(formData)
        .subscribe(
          (res: any) => {
            if (res['responseDto']) {
              this.id = res['responseDto']['id'];
              if (this.isEditBeneficiary === false) {
                // this.notificationService.createNotification('success', 'Beneficiary details updated successfully', '#00A03E', 'Success');
                this.createNotification(
                  'success',
                  'Success',
                  'Beneficiary details Added successfully',
                  '#ffffff',
                  '#00A03E'
                );

                this.dataService.newBenifisaryId = this.id;
                // this.addBankAccountNew(this.id);
                // this.closeModal();
                // this.eventTriggerService.onReloadServiceData();

                // Send email
                console.log('before call');
                // this.agentSenderDetailsId =
                //   res['responseDto']['agentSenderDetailsDto'][
                //     'agentSenderDetailsId'
                //   ];
                // const data: any = {};
                // data['agentBeneficiaryDetailsId'] = this.agentBeneficiaryDetailsId;
                // data['agentSenderDetailsId'] = this.agentSenderDetailsId;
                // this.beneficiaryDataService
                //   .getCreatedTransactionDetails(data)
                //   .subscribe((res: any) => {
                //     if (res['responseDto']) {
                //       console.log('after call');
                //     }
                //   });
                this.next();
                // this.code1!.reset();
                // this.beneficiaryTelephone!.reset();
                // this.code2!.reset();
                // this.beneficiaryhandphone!.reset();
                // this.beneficiaryAddress!.reset();
                // this.companyName!.reset();
                // this.beneficiaryFirstName!.reset();
                // this.beneficiaryLastName!.reset();
                // this.dateOfBirth!.reset();
                // this.placeOfBirth!.reset();
                // this.nationality!.reset();
              } else {
                if (this.agentBeneficiaryDetailsId) {
                }
              }
            } else {
              this.createNotification(
                'error',
                'Error',
                res.errorDescription,
                '#ffffff',
                '#cc2d2d'
              );
            }
          },
          () => {
            // this.notificationService.createNotification('error', 'Beneficiary details saving failed', '#cc2d2d', 'Error');
            this.createNotification(
              'error',
              'Error',
              'Beneficiary details saving failed',
              '#ffffff',
              '#cc2d2d'
            );
          }
        );
    }
  }

  addBankAccountDetails() {
    console.log('add bank account function');
    // console.log('age', this.dataService.selectedData);
    // console.log('age2', this.dataService.beneficiaryDataPersonalId);
    const data: any = {};
    data['ExposableId'] = this.user_id.agentExposableId;
    data['countryId'] = this.country?.value;

    let bankNameResult;

    // if (this.isSriLankan) {
    //   bankNameResult = this.bank!.value.bankDto.bankName;
    // } else {
    //   bankNameResult = this.bankName!.value;
    // }

    const formData = {
      bankName: this.isBankSl
        ? this.bankName?.value.bankname
        : this.bankName?.value,
      bankCode: this.isBankSl
        ? this.bankName?.value.bankCode
        : this.bankCode?.value
        ? this.bankCode?.value
        : undefined,
      accountNumber: this.accountNumber?.value
        ? this.accountNumber?.value
        : undefined,
      branchName: this.branchName?.value,
      swiftCode: this.swiftCode?.value?.trim()
        ? this.swiftCode?.value?.trim()
        : undefined,
      isActive: true,
      routingNumber: this.routingNumberLabel?.value
        ? this.routingNumberLabel?.value
        : undefined,
      clientCurrencyId: this.supportCurrency?.value.clientCurrencyId,
      // beneficiaryDetailsId: this.isCoporate
      //   ? this.dataService.selectedData.agentBeneficiaryDetailsId
      //   : this.dataService.beneficiaryDataPersonalId.agentBeneficiaryDetailsId,
      // beneficiaryDetailsId: this.dataService.newBenifisaryId
      //   ? this.dataService.newBenifisaryId
      //   : this.seletcedBeneficiaryData.agentBeneficiaryDetailsId,
      beneficiaryDetailsId:
        this.dataService.clickEventStatus === 'addBeneficiary'
          ? this.dataService.newBenifisaryId
          : this.dataService.clickEventStatus === 'editBeneficiary'
          ? this.dataService.newAgentBnifisaryId
          : null,
      // beneficiaryDetailsId: this.dataService.newAgentBnifisaryId,
      label4: this.ifsc?.value ? this.ifsc?.value : undefined,
      label5: this.iban?.value ? this.iban?.value : undefined,
      label6: this.branchCode?.value ? this.branchCode?.value : undefined,
    };

    this.beneficiaryDataService.addBank(data, formData).subscribe(
      (res: any) => {
        if (res['responseDto']) {
          // this.notificationService.createNotification('success', 'Account details added successfully', '#00A03E', 'Success');
          this.createNotification(
            'success',
            'Success',
            'Account details added successfully',
            '#ffffff',
            '#00A03E'
          );
          console.log('add bank account function correct or not first');
          console.log(formData);
          console.log('branch code value', this.branchCode?.value);
          // this.closeModal();
          this.getBankAccountDetails();

          this.clearBankDetails();
          // this.updateBeneficiary();
        } else {
          console.log('add benifisary account function correct or not second');
          // this.notificationService.createNotification('error', 'Bank account details saving failed', '#cc2d2d', 'Error');
          this.createNotification(
            'error',
            'Error',
            res.errorDescription,
            '#ffffff',
            '#cc2d2d'
          );
        }
      },
      () => {
        // this.notificationService.createNotification('error', 'Bank account details saving failed', '#cc2d2d', 'Error');
        this.createNotification(
          'error',
          'Error',
          'Bank account details saving failed',
          '#ffffff',
          '#cc2d2d'
        );
      }
    );
  }

  addBankAccountDetailsNew(benId: any) {
    // console.log('age', this.dataService.selectedData);
    // console.log('age2', this.dataService.beneficiaryDataPersonalId);
    const data: any = {};
    data['ExposableId'] = this.user_id.agentExposableId;
    data['countryId'] = this.country?.value;

    let bankNameResult;

    // if (this.isSriLankan) {
    //   bankNameResult = this.bank!.value.bankDto.bankName;
    // } else {
    //   bankNameResult = this.bankName!.value;
    // }

    const formData = {
      bankName: this.isBankSl
        ? this.bankName?.value.bankname
        : this.bankName?.value,
      bankCode: this.isBankSl
        ? this.bankName?.value.bankCode
        : this.bankCode?.value
        ? this.bankCode?.value
        : undefined,
      accountNumber: this.accountNumber?.value
        ? this.accountNumber?.value
        : undefined,
      branchName: this.branchName?.value,
      swiftCode: this.swiftCode?.value?.trim()
        ? this.swiftCode?.value?.trim()
        : undefined,
      isActive: true,
      routingNumber: this.routingNumberLabel?.value
        ? this.routingNumberLabel?.value
        : undefined,

      clientCurrencyId: this.supportCurrency?.value.clientCurrencyId,
      beneficiaryDetailsId: benId,
      label4: this.ifsc?.value?.trim() ? this.ifsc?.value?.trim() : undefined,
      label5: this.iban?.value?.trim() ? this.iban?.value?.trim() : undefined,
      label6: this.branchCode?.value?.trim()
        ? this.branchCode?.value?.trim()
        : undefined,
    };

    this.beneficiaryDataService.addBank(data, formData).subscribe(
      (res: any) => {
        if (res['responseDto']) {
          // this.notificationService.createNotification('success', 'Account details added successfully', '#00A03E', 'Success');
          this.createNotification(
            'success',
            'Success',
            'Account details added successfully',
            '#ffffff',
            '#00A03E'
          );
          // this.closeModal();
          this.getBankAccountDetails();
          this.modalRef.close();
        } else {
          // this.notificationService.createNotification('error', 'Bank account details saving failed', '#cc2d2d', 'Error');
          this.createNotification(
            'error',
            'Error',
            res.errorDescription,
            '#ffffff',
            '#cc2d2d'
          );
        }
      },
      () => {
        // this.notificationService.createNotification('error', 'Bank account details saving failed', '#cc2d2d', 'Error');
        this.createNotification(
          'error',
          'Error',
          'Bank account details saving failed',
          '#ffffff',
          '#cc2d2d'
        );
      }
    );
  }

  // getAgentCountry() {
  //   const data: any = {};
  //   data['exposableId'] = 'JVb3mfaNS29';
  //   this.beneficiaryDataService
  //     .getAgentReceivingCountry(data)
  //     .subscribe((res: any) => {
  //       if (res['responseDto']) {
  //         this.receivingCountryData = res['responseDto'];
  //       }
  //     });
  // }

  getCountry() {
    this.countryDataServices.getCountryForContctPage().subscribe({
      next: (res: any) => {
        if (res['responseDto']) {
          this.receivingCountryData = res['responseDto'];
        }
      },
      error: () => {
        this.receivingCountryData = '';
      },
    });
  }
  getReceivingCountry(countryId: any) {
    const selectedClientCountryId = this.receivingCountryData.find(
      (query: any) => query.countryId === countryId
    );
    if (selectedClientCountryId) {
      this.selectedClientCountryIdValue =
        selectedClientCountryId.clientCountryId;
      console.log('client country id', this.selectedClientCountryIdValue);
    }

    this.getAgentReceivingCountries();
    if (countryId == 1) {
      this.getBankList(countryId);
      this.bankName?.setValidators([Validators.required]);
      this.bankName?.updateValueAndValidity();
    } else {
      this.isBankSl = false;
      this.bankName?.setValidators([
        Validators.required,
        MyValidators.alphanumericPattern(5, 35),
      ]);
      this.bankName?.updateValueAndValidity();
    }
  }
  getAgentReceivingCountries() {
    const data: any = {};
    data['clientcurrencyid'] = this.country?.value;
    this.beneficiaryDataService
      .getAgentReceivingCountries(data)
      .subscribe((res: any) => {
        if (res['responseDto']) {
          this.receivingCountriesData = res['responseDto'];
          const IsSrilanka = res['responseDto']['referenceCountryCode'];

          if (IsSrilanka === 'LK') {
            this.bankCodeInput = this.receivingCountriesData.bankCodeLabel =
              false;
          } else {
            this.bankCodeInput = this.receivingCountriesData.bankCodeLabel
              ? true
              : false;
          }
          this.isIban = this.receivingCountriesData.label5 ? true : false;
          this.isIfsc = this.receivingCountriesData.label4 ? true : false;
          this.isbrnachCode = this.receivingCountriesData.label6 ? true : false;
          this.swiftCodeInput = this.receivingCountriesData.swiftCodeLabel
            ? true
            : false;
          this.routingNumber = this.receivingCountriesData.routingNumberLabel
            ? true
            : false;
        }
        // console.log('curr', this.bankCodeInput);
        // console.log('curr2', this.swiftCodeInput);
        // console.log('curr3', this.routingNumber);
        this.addbankType();
      });
  }

  pageIndexChange(selectedIndex: any) {
    this.currentPageIndex = selectedIndex;
    this.pageNumber = selectedIndex;
    this.getBankAccountDetails();
  }

  getSelectedBeneficiaryData() {
    this.seletcedBeneficiaryData = this.dataService.selectedData;
    this.agentBeneficiaryDetailsId =
      this.seletcedBeneficiaryData.agentBeneficiaryDetailsId;
    this.isCoporate = this.seletcedBeneficiaryData.isCoporateBeneficiary;
    // console.log('selected Data', this.dataService.selectedData);
    // console.log(
    //   'Coporate Data',
    //   this.seletcedBeneficiaryData.isCoporateBeneficiary
    // );
    if (!this.seletcedBeneficiaryData.isCoporateBeneficiary) {
      this.beneficiaryDetailsForm.patchValue({
        beneficiaryFirstName: this.seletcedBeneficiaryData.beneficiaryFirstName,
        beneficiaryLastName: this.seletcedBeneficiaryData.beneficiaryLastName,
        code1: this.seletcedBeneficiaryData.countryCode,
        beneficiaryTelephone: this.seletcedBeneficiaryData.contactNumber,
        code2: this.seletcedBeneficiaryData.mobileCountryCode,
        beneficiaryhandphone:
          this.seletcedBeneficiaryData.beneficiaryMobileNumber,
        beneficiaryAddress: this.seletcedBeneficiaryData.beneficiaryAddress,
        dateOfBirth: this.seletcedBeneficiaryData.dateOfBirth,
        placeOfBirth: this.seletcedBeneficiaryData.beneficiaryPlaceOfBirth,
        nationality: this.seletcedBeneficiaryData.nationalityDetailId,
      });
      if (this.seletcedBeneficiaryData.dateOfBirth) {
        this.validateDob();
      }
    } else {
      this.beneficiaryDetailsForm.patchValue({
        companyName: this.seletcedBeneficiaryData.beneficiaryFullName,
        code1: this.seletcedBeneficiaryData.contactId,
        beneficiaryTelephone: this.seletcedBeneficiaryData.contactNumber,
        code2: this.seletcedBeneficiaryData.mobileId,
        beneficiaryhandphone: this.seletcedBeneficiaryData.mobileNumber,
        beneficiaryAddress: this.seletcedBeneficiaryData.address,
        dateOfBirth: this.seletcedBeneficiaryData.dateOfBirth,
        placeOfBirth: this.seletcedBeneficiaryData.placeOfBirth,
        nationality: this.seletcedBeneficiaryData.nationalityDetailsDto,
        isCoporateBeneficiary:
          this.seletcedBeneficiaryData.isCoporateBeneficiary,
        providerDetailsDto: this.seletcedBeneficiaryData.providerDetailsDto,
      });
    }

    this.checkBeneficiaryIsEditable(
      this.seletcedBeneficiaryData.agentBeneficiaryDetailsId
    );

    this.focusOutFun1();
    this.focusOutFun();

    this.getBankAccountDetails();
  }

  getBankAccountDetails() {
    const data: any = {};
    data['agentBeneficiaryDetailsId'] = this.isCoporate
      ? this.dataService.selectedData?.agentBeneficiaryDetailsId
      : this.dataService.beneficiaryDataPersonalId?.agentBeneficiaryDetailsId;
    data['pageNumber'] = this.pageNumber;
    data['pageSize'] = this.pageSize;
    this.beneficiaryDataService
      .getAgentBeneficiryBankAccount(data)
      .subscribe((res: any) => {
        if (res['responseDto']) {
          this.bankaccountsList = res['responseDto']['payload'];
          this.totalRecordsBank = res['responseDto']['totalRecords'];
        }
      });
  }

  updateBeneficiary() {
    if (!this.beneficiaryDetailsForm.valid) {
      this.validateAllFormFields(this.beneficiaryDetailsForm);
    } else if (this.dateOfBirth?.value && !this.isDateOfBirthValid) {
      this.validateDob();
    } else {
      let dateOfBirthResult;
      let agentBeneficiaryDetailsIdResult;

      if (this.isEditBeneficiary) {
        agentBeneficiaryDetailsIdResult = this.agentBeneficiaryDetailsId;

        if (this.dateOfBirth!.value) {
          dateOfBirthResult = this.dateOfBirth!.value;
        }
      } else {
        agentBeneficiaryDetailsIdResult = null;

        if (this.dateOfBirth!.value) {
          dateOfBirthResult = format(this.dateOfBirth!.value, 'yyyy-MM-dd');
        }
      }

      const formData = {
        agentBeneficiaryDetailsId: this.dataService.newBenifisaryId
          ? this.dataService.newBenifisaryId
          : this.isCoporate
          ? agentBeneficiaryDetailsIdResult
          : this.dataService.beneficiaryDataPersonalId
              .agentBeneficiaryDetailsId,
        beneficiaryFirstName: this.isCoporate
          ? this.companyName!.value?.trim()
          : this.beneficiaryFirstName!.value?.trim(),
        beneficiaryLastName: this.isCoporate
          ? null
          : this.beneficiaryLastName!.value?.trim(),
        contactNumber: this.beneficiaryTelephone!.value,
        mobileNumber: this.beneficiaryhandphone!.value,
        contactId: this.code1!.value,
        mobileId: this.code2!.value,
        address: this.beneficiaryAddress!.value?.trim(),
        dateOfBirth: this.isCoporate ? null : dateOfBirthResult,
        placeOfBirth: this.isCoporate ? null : this.placeOfBirth!.value?.trim(),
        nationalityDetailsId: this.isCoporate ? null : this.nationality?.value,
        isActive: true,
        isCoporateBeneficiary: this.isCoporate ? true : false,
        clientCountryId: this.selectedClientCountryIdValue
          ? this.selectedClientCountryIdValue
          : this.seletcedBeneficiaryData.clientCountryid,
        agentSenderDetailsDto: {
          agentSenderDetailsId: this.agentSenderDetailsId,
        },
      };

      this.beneficiaryDataService.updateBeneficiary(formData).subscribe(
        (res: any) => {
          if (res['responseDto']) {
            this.agentBeneficiaryDetailsId =
              res['responseDto']['agentBeneficiaryDetailsId'];
            if (this.isEditBeneficiary) {
              // this.notificationService.createNotification('success', 'Beneficiary details updated successfully', '#00A03E', 'Success');
              this.createNotification(
                'success',
                'Success',
                'Update Successfully',
                '#ffffff',
                '#00A03E'
              );
              console.log('add benifisary account function correct or not');
              if (!this.isEditBeneficiary) {
                this.addBankAccountDetails();
              }

              this.eventTriggerService.onReloadServiceData();

              // this.closeModal();

              // Send email
              // console.log('before call');
              this.agentSenderDetailsId =
                res['responseDto']['agentSenderDetailsDto'][
                  'agentSenderDetailsId'
                ];
              const data: any = {};
              data['agentBeneficiaryDetailsId'] =
                this.agentBeneficiaryDetailsId;
              data['agentSenderDetailsId'] = this.agentSenderDetailsId;
              this.beneficiaryDataService;
            } else {
              this.addBankAccountDetails();
              console.log('add benifisary account function correct or not');
              if (this.agentBeneficiaryDetailsId) {
                this.addBankAccount();
              }
            }
          } else if (res['errorDescription']) {
            console.log('add benifisary account function correct or not');
            this.createNotification(
              'error',
              'Error',
              res['errorDescription'],
              '#ffffff',
              '#cc2d2d'
            );
          }
        },
        () => {
          // this.notificationService.createNotification('error', 'Beneficiary details updating failed', '#cc2d2d', 'Error');
          this.createNotification(
            'error',
            'Error',
            'Beneficiary details updating failed',
            '#ffffff',
            '#cc2d2d'
          );
        }
      );
    }
  }

  addBankAccount() {
    console.log('isEditbenifisry values', this.isEditBeneficiary);
    if (this.isEditBeneficiary === true) {
      if (!this.accountDetailsForm.valid) {
        this.validateAllFormFields(this.accountDetailsForm);
        return;
      } else {
        this.addBankAccountDetails();
      }
    } else {
      if (!this.accountDetailsForm.valid) {
      } else {
        // this.addBankAccountDetails();
        this.updateBeneficiary();
      }
    }
  }
  addBankAccountNew(id: any) {
    if (!this.accountDetailsForm.valid) {
      this.validateAllFormFields(this.accountDetailsForm);
      return;
    } else {
      this.addBankAccountDetailsNew(this.dataService.newBenifisaryId);
    }
  }

  // disabledFutureDates = (current: Date): boolean => {
  //   return differenceInCalendarDays(current, this.todayDate) > 0;
  // }

  closeModal() {
    this.modalRef.destroy();
    // window.location.reload();
  }

  bankDetailsMapping() {
    if (this.bank!.value) {
      this.accountDetailsForm.patchValue({
        bankCode: this.bank!.value.bankDto.bankCode,
        swiftCode: this.bank!.value.bankDto.swiftCode,
      });
    } else {
      this.accountDetailsForm.patchValue({
        bankCode: null,
        swiftCode: null,
      });
    }
  }

  numberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  accountTypeChange() {
    if (!this.isCoporate) {
      this.beneficiaryFirstName!.setValidators(
        Validators.compose([
          Validators.required,
          MyValidators.characterLength('First Name', 25),
        ])
      );
      this.beneficiaryLastName!.setValidators(
        Validators.compose([
          Validators.required,
          MyValidators.characterLength('Last Name', 25),
        ])
      );
      this.companyName!.setValidators(null);
      this.beneficiaryFirstName!.updateValueAndValidity();
      this.beneficiaryLastName!.updateValueAndValidity();
      this.companyName!.updateValueAndValidity();
      this.dateOfBirth!.setValidators(
        Validators.compose([Validators.required])
      );
      this.placeOfBirth!.setValidators(
        Validators.compose([Validators.required])
      );
      this.nationality!.setValidators(null);
      this.dateOfBirth!.updateValueAndValidity();
      this.placeOfBirth!.updateValueAndValidity();
      this.nationality!.updateValueAndValidity();
      if (this.dataService.clickEventStatus === 'addBeneficiary') {
        this.code1!.reset();
        this.beneficiaryTelephone!.reset();
        this.code2!.reset();
        this.beneficiaryhandphone!.reset();
        this.beneficiaryAddress!.reset();
        this.companyName!.reset();
      }
    } else {
      this.beneficiaryFirstName!.setValidators(null);
      this.beneficiaryLastName!.setValidators(null);
      this.companyName!.setValidators(
        Validators.compose([
          Validators.required,
          MyValidators.characterLength('Company Name', 25),
        ])
      );
      this.beneficiaryFirstName!.updateValueAndValidity();
      this.beneficiaryLastName!.updateValueAndValidity();
      this.companyName!.updateValueAndValidity();
      this.dateOfBirth!.setValidators([]);
      this.placeOfBirth!.setValidators([]);
      this.nationality!.setValidators([]);
      this.dateOfBirth!.updateValueAndValidity();
      this.placeOfBirth!.updateValueAndValidity();
      this.nationality!.updateValueAndValidity();

      if (this.dataService.clickEventStatus === 'addBeneficiary') {
        this.beneficiaryFirstName!.reset();
        this.beneficiaryLastName!.reset();
        this.dateOfBirth!.reset();
        this.placeOfBirth!.reset();
        this.nationality!.reset();
        this.code1!.reset();
        this.beneficiaryTelephone!.reset();
        this.code2!.reset();
        this.beneficiaryhandphone!.reset();
        this.beneficiaryAddress!.reset();
      }
    }
  }
  addbankType() {
    if (this.bankCodeInput) {
      this.bankCode?.setValidators([Validators.required]);
      this.bankCode?.updateValueAndValidity();
    } else {
      this.bankCode?.setValidators(null);
      this.bankCode?.updateValueAndValidity();
    }

    if (this.swiftCodeInput) {
      this.swiftCode?.setValidators([
        Validators.required,
        MyValidators.alphanumericPattern(8, 11),
      ]);
      this.swiftCode?.updateValueAndValidity();
    } else {
      this.swiftCode?.setValidators(null);
      this.swiftCode?.updateValueAndValidity();
    }
    if (this.routingNumber) {
      this.routingNumberLabel?.setValidators([
        Validators.required,
        MyValidators.exactLength('Routing Number', 9),
      ]);
      this.routingNumberLabel?.updateValueAndValidity();
    } else {
      this.routingNumberLabel?.setValidators(null);
      this.routingNumberLabel?.updateValueAndValidity();
    }
    if (this.isIban) {
      this.iban?.setValidators([
        Validators.required,
        MyValidators.alphanumericPattern(15, 34),
      ]);
      this.iban?.updateValueAndValidity();
    } else {
      this.iban?.setValidators(null);
      this.iban?.updateValueAndValidity();
    }
    if (this.isIfsc) {
      this.ifsc?.setValidators([
        Validators.required,
        MyValidators.specificPattern(),
      ]);
      this.ifsc?.updateValueAndValidity();
    } else {
      this.ifsc?.setValidators(null);
      this.ifsc?.updateValueAndValidity();
    }
    if (this.isbrnachCode) {
      this.branchCode?.setValidators([
        Validators.required,
        MyValidators.exactLength('Branch Code', 5),
      ]);
      this.branchCode?.updateValueAndValidity();
    } else {
      this.branchCode?.setValidators(null);
      this.branchCode?.updateValueAndValidity();
    }
  }

  disabledDate = (current: NzSafeAny): boolean => {
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - 16); // set the maximum allowed date to 16 years ago
    return current > maxDate;
  };

  validateDob() {
    let currentDate = new Date();
    let selectionDate =
      Number(format(new Date(this.dateOfBirth!.value), 'yyyy')) * 365 +
      Number(format(new Date(this.dateOfBirth!.value), 'MM')) * 30 +
      Number(format(new Date(this.dateOfBirth!.value), 'dd'));
    let formatterCurrentDate =
      Number(format(new Date(currentDate), 'yyyy')) * 365 +
      Number(format(new Date(currentDate), 'MM')) * 30 +
      Number(format(new Date(currentDate), 'dd'));

    let validate = formatterCurrentDate - selectionDate;

    if (validate < 16 * 365) {
      // this.notificationService.createNotification('error', 'Age can not be below 16 years', '#cc2d2d', 'Input Error');
      this.createNotification(
        'error',
        'Input Error',
        'Age can not be below 16 years',
        '#ffffff',
        '#cc2d2d'
      );
      this.isDateOfBirthValid = false;
    } else {
      this.isDateOfBirthValid = true;
      0;
    }
  }

  clearBankDetails() {
    // this.accountDetailsForm.patchValue({
    //   accountNumber: null,
    //   branchName: null,
    //   bankCode: null,
    //   swiftCode: null,
    //   supportCurrency: null,
    // });

    if (this.isEditBeneficiary === false) {
      this.closeModal();
    }

    this.accountDetailsForm.updateValueAndValidity();
    this.bankName!.reset();
    this.bankName!.updateValueAndValidity();
    this.country?.reset();
    this.country!.updateValueAndValidity();
    this.accountNumber?.reset();
    this.accountNumber!.updateValueAndValidity();
    this.branchName?.reset();
    this.branchName!.updateValueAndValidity();
    this.supportCurrency?.reset();
    this.supportCurrency!.updateValueAndValidity();
    this.bankCode?.reset();
    this.bankCode!.updateValueAndValidity();
    this.swiftCode?.reset();
    this.swiftCode!.updateValueAndValidity();
    this.routingNumberLabel?.reset();
    this.routingNumberLabel!.updateValueAndValidity();
    this.routingNumberLabel?.reset();
    this.routingNumberLabel!.updateValueAndValidity();
    this.bank?.reset();
    this.bank!.updateValueAndValidity();
    this.iban?.reset();
    this.iban!.updateValueAndValidity();
    this.ifsc?.reset();
    this.ifsc!.updateValueAndValidity();
    this.branchCode?.reset();
    this.branchCode!.updateValueAndValidity();
  }

  getAllNationalityDetails() {
    this.beneficiaryDataService.getNationality().subscribe((res: any) => {
      if (res['responseDto']) {
        this.nationalityData = res['responseDto'];
      } else {
        this.nationalityData = [];
      }
    });
  }

  changeStatus(receivedData: any) {
    // console.log(receivedData);
    const data: any = {};
    data['agentBeneficiaryBankAccountDetailsId'] =
      receivedData.agentBeneficiaryBankAccountDetailsId;
    data['isActive'] = !receivedData.isActive;

    this.beneficiaryDataService
      .updateAgentBeneficiaryBankAccountStatus(data)
      .subscribe(
        (res: any) => {
          if (res['responseDto']) {
            if (res['responseDto']) {
              this.createNotification(
                'success',
                'Success',
                'Status Changed Successfully',
                '#ffffff',
                '#00A03E'
              );
            } else {
              this.createNotification(
                'success',
                'Success',
                'Deactivated successfully',
                '#ffffff',
                '#00A03E'
              );
            }
            this.getBankAccountDetails();
          }
        },
        () => {
          this.createNotification(
            'error',
            'Error',
            'Status update failed',
            '#ffffff',
            '#cc2d2d'
          );
        }
      );
  }

  getCountryCodesDetails() {
    this.beneficiaryDataService.getCountryCode().subscribe((res: any) => {
      this.countryData = res['responseDto'];
      // console.log('Country', this.countryData);
    });
  }
  mapCountryCodeDetails() {
    if (this.clickCount === 0) {
      this.countryPhoneCode = true;
      this.countryPhoneName = false;
      this.clickCount = 1;
      this.clickattibute = 0;
    }
  }
  // getClientCurrency() {
  //   this.beneficiaryDataService.getClientCurrency().subscribe((res: any) => {
  //     if (res['responseDto']) {
  //       this.clientCurrencyData = res['responseDto'];
  //     }
  //   });
  // }

  getClientCurrency(exposableId: any) {
    const data: any = {};
    data['exposableId'] = exposableId;
    this.beneficiaryDataService
      .getAgentReceivingCurrency(data)
      .subscribe((res: any) => {
        if (res['responseDto']) {
          this.clientCurrencyData = res['responseDto'];
          console.log('agentReceving currencies', this.clientCurrencyData);
        }
      });
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
  focusOutFun() {
    if (this.code1!.value) {
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
  checkLength(event: any): any {
    if (this.beneficiaryTelephone!.value.length > 10) {
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
          for (
            let i = 0;
            i < this.beneficiaryTelephone!.value.length - 1;
            i++
          ) {
            currentData =
              currentData + this.beneficiaryTelephone!.value.charAt(i);
          }
          this.beneficiaryDetailsForm.patchValue({
            beneficiaryTelephone: currentData,
          });
          // this.notificationService.createNotification('error', 'Contact Number should be less than 15', '#cc2d2d', 'Invalid Contact Number');
          this.createNotification(
            'error',
            'Invalid Contact Number',
            'Contact Number should be less than 10',
            '#ffffff',
            '#cc2d2d'
          );
        }
      }
    } else {
      this.contactNumberDisabled = false;
    }
  }
  contactNumberValidation() {
    if (this.beneficiaryTelephone!.value) {
      let data = this.beneficiaryTelephone!.value.charAt(0);
      let currentData = '';
      if (data === '0') {
        for (let i = 1; i < this.beneficiaryTelephone!.value.length; i++) {
          currentData =
            currentData + this.beneficiaryTelephone!.value.charAt(i);
        }
        this.beneficiaryDetailsForm.patchValue({
          beneficiaryTelephone: currentData,
        });
      }
    }
  }
  mapCountryCodeDetails1() {
    if (this.clickCount1 === 0) {
      this.countryPhoneCode1 = true;
      this.countryPhoneName1 = false;
      this.clickCount1 = 1;
      this.clickattibute1 = 0;
    }
  }
  phoneCodeChange1() {
    if (this.clickCount1 === 1 && this.clickattibute1 === 1) {
      this.countryPhoneCode1 = false;
      this.countryPhoneName1 = true;
      this.clickCount1 = 0;
      this.clickattibute1 = 0;
    } else if (this.clickCount1 === 1 && this.clickattibute1 === 0) {
      this.clickattibute1 = 1;
    }
  }
  focusOutFun1() {
    if (this.code2!.value) {
      this.countryPhoneCode1 = true;
      this.countryPhoneName1 = false;
      this.clickCount1 = 1;
      this.clickattibute1 = 1;
    }
  }
  phoneCodeInput1() {
    this.countryPhoneCode1 = false;
    this.countryPhoneName1 = true;
  }
  checkLength1(event: any): any {
    if (this.beneficiaryhandphone!.value.length > 10) {
      let currentData = '';
      if (!event) {
        if (this.contactNumberDisabled1) {
          return true;
        }
      } else {
        if (event.inputType === 'deleteContentBackward') {
          this.contactNumberDisabled1 = true;
        } else {
          this.contactNumberDisabled1 = false;
          for (
            let i = 0;
            i < this.beneficiaryhandphone!.value.length - 1;
            i++
          ) {
            currentData =
              currentData + this.beneficiaryhandphone!.value.charAt(i);
          }
          this.beneficiaryDetailsForm.patchValue({
            beneficiaryhandphone: currentData,
          });
          // this.notificationService.createNotification('error', 'Mobile Number should be less than 15', '#cc2d2d', 'Invalid Contact Number');
          this.createNotification(
            'error',
            'Invalid Contact Number',
            'Mobile Number should be less than 10',
            '#ffffff',
            '#cc2d2d'
          );
        }
      }
    } else {
      this.contactNumberDisabled1 = false;
    }
  }
  // checkLength1() {
  //   if (this.beneficiaryhandphone.value.length > 15) {
  //     this.contactNumberDisabled1 = true;
  //     this.notificationService.createNotification('error', 'Mobile Number should be less than 15', '#cc2d2d', 'Invalid Contact Number');
  //     if (this.beneficiaryhandphone.value.length >= 17) {
  //       this.beneficiaryDetailsForm.patchValue({
  //         beneficiaryhandphone: null
  //       })
  //     }
  //   } else {
  //     this.contactNumberDisabled1 = false;
  //   }
  // }
  contactNumberValidation1() {
    if (this.beneficiaryhandphone!.value) {
      let data = this.beneficiaryhandphone!.value.charAt(0);
      let currentData = '';
      if (data === '0') {
        for (let i = 1; i < this.beneficiaryhandphone!.value.length; i++) {
          currentData =
            currentData + this.beneficiaryhandphone!.value.charAt(i);
        }
        this.beneficiaryDetailsForm.patchValue({
          beneficiaryhandphone: currentData,
        });
      }
    }
  }

  checkBeneficiaryIsEditable(agentBeneficiaryDetailsId: any) {
    const data: any = {};
    data['beneficiaryDetailsId'] = agentBeneficiaryDetailsId;
    data['pageNumber'] = 1;
    data['pageSize'] = 20;

    if (!this.isCoporate) {
      if (
        !this.dateOfBirth!.value ||
        !this.placeOfBirth!.value ||
        !this.nationality!.value
      ) {
        this.isBeneficiaryEditable = true;
      }
    }

    if (!this.isBeneficiaryEditable) {
      this.beneficiaryDataService;
      // .checkBeneficiaryDetailsIsEditable(data)
      // .subscribe((res: any) => {
      //   if (res['responseDto']) {
      //     if (res['responseDto']['isEditable'] === true) {
      //       this.isBeneficiaryEditable = true;
      //     } else {
      //       this.isBeneficiaryEditable = false;
      //     }
      //   }
      // });
    }
  }

  customSearchFn(term: string, item: any) {
    term = term.toLocaleLowerCase();
    return item.countryId.countryName.toLocaleLowerCase().indexOf(term) > -1;
  }

  letterOnly(event: any): Boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (
      (charCode < 32 || charCode > 32) &&
      (charCode < 65 || charCode > 90) &&
      (charCode < 97 || charCode > 122)
    ) {
      return false;
    }
    return true;
  }

  createNotification(
    type: string,
    title: string,
    content: string,
    color: string,
    background: string
  ): void {
    this.notificationService.create(type, title, content, {
      nzStyle: {
        background: background,
        color: color,
      },
    });
  }

  getBankList(id: any) {
    const data: any = {};
    data['exposableId'] = this.user_id.agentExposableId;
    data['countryId'] = id;
    return this.beneficiaryDataService
      .getBankDetails(data)
      .subscribe((res: any) => {
        if (res['responseDto']) {
          this.bankList = res['responseDto'];
          if (this.bankList != null) {
            this.isBankSl = true;
          } else {
            this.isBankSl = false;
          }
        }
      });
  }
}
