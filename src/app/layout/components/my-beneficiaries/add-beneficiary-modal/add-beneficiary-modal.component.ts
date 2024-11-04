import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import format from 'date-fns/format';
import { MyValidators } from 'src/app/_validators/custom-validator';
import { differenceInYears } from 'date-fns';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { TokenStorageServiceService } from 'src/app/_services/token-storage-service.service';
import { CorporateAccountsChangeService } from 'src/app/_services/corporate-accounts-change.service';

@Component({
  selector: 'app-add-beneficiary-modal',
  templateUrl: './add-beneficiary-modal.component.html',
  styleUrls: ['./add-beneficiary-modal.component.sass'],
})
export class AddBeneficiaryModalComponent {
  currentIndex = 0;

  data: any;

  todayDate = new Date();
  public beneficiaryDetailsForm!: FormGroup;
  agentCustomerData: any;
  agentExposableId: any;
  agentSenderDetailsId: any;

  public accountDetailsForm!: FormGroup;
  transferApprovedCountries: any;
  agentBeneficiaryDetailsId: any;
  isSriLankan = false;
  bankList = [];

  bankCodeLabel: any;
  swiftCodeLabel: any;
  routingNumberLabel: any;
  label4: any;
  label5: any;
  label6: any;

  pageNumber = 1;
  pageSize = 5;
  currentPageIndex = 1;
  totalRecords: any;
  bankAccountDetails = [];

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

  isBeneficiaryEditable = false;
  recipientCurrencies = [];

  bankaccountsList: any[] = [
    {
      bank_name: 'A',
      account_number: '123456789',
      branch: 'colombo',
      bankCode: '456',
      switftCode: 'Abc789',
    },
    {
      bank_name: 'A',
      account_number: '123456789',
      branch: 'colombo',
      bankCode: '456',
      switftCode: 'Abc789',
    },
    {
      bank_name: 'A',
      account_number: '123456789',
      branch: 'colombo',
      bankCode: '456',
      switftCode: 'Abc789',
    },
    {
      bank_name: 'A',
      account_number: '123456789',
      branch: 'colombo',
      bankCode: '456',
      switftCode: 'Abc789',
    },
  ];

  //temporary create services.
  dataService: any;
  notificationService: any;
  commonsService: any;
  agentDetailsDataService: any;
  agentSenderDataService: any;
  beneficiaryDataService: any;
  countryDataService: any;
  bankDataService: any;
  eventTriggerService: any;
  bankAccountDataService: any;
  nationalityDetailsService: any;
  countryCodeDataService: any;
  clientCurrencyDataService: any;

  constructor(
    private formBuilder: FormBuilder,
    // private notificationService: NotificationService,
    // private commonsService: CommonsService,
    // private agentDetailsDataService: AgentDetailsDataService,
    // private agentSenderDataService: AgentSenderDataService,
    // private beneficiaryDataService: BeneficiaryDataService,
    // private countryDataService: CountryDataService,
    // private bankDataService: BankDataService,
    private modalRef: NzModalRef, // private eventTriggerService: EventTriggerService, // private bankAccountDataService: BankAccountDataService, // private dataService: DataService, // private nationalityDetailsService: NationalityDetailsService, // private countryCodeDataService: CountryCodesDataService, // private clientCurrencyDataService: ClientCurrencyDataServiceService
    private tokenStorageService: TokenStorageServiceService,
    private corporateAccountsChangeService: CorporateAccountsChangeService
  ) {
    // this.agentCustomerData = this.commonsService.parseJwt(localStorage.getItem('currentAgentCustomer'));
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

    this.isBeneficiaryEditable = false;
    this.currentActiveUserAccount = localStorage.getItem(
      'currentActiveUserAccount'
    );

    this.beneficiaryDetailsForm = this.formBuilder.group({
      beneficiaryFirstName: [null, Validators.required],
      beneficiaryLastName: [null, Validators.required],
      code1: [null, Validators.required],
      code2: [null, Validators.required],
      beneficiaryTelephone: [
        null,
        Validators.compose([Validators.required, maxLength(15)]),
      ],
      beneficiaryhandphone: [
        null,
        Validators.compose([Validators.required, maxLength(15)]),
      ],
      beneficiaryAddress: [null, Validators.required],
      dateOfBirth: [null],
      placeOfBirth: [null],
      nationality: [null],
      companyName: [null, Validators.required],
      isCoporateBeneficiary: [false],
      providerDetailsDto: [null],
    });

    this.accountDetailsForm = this.formBuilder.group({
      country: [null, Validators.required],
      bankName: [null, Validators.required],
      bank: [null, Validators.required],
      accountNumber: [null, Validators.required],
      branchName: [null, Validators.required],
      bankCode: [null],
      swiftCode: [null],
      supportCurrency: [null, Validators.required],
    });

    if (this.dataService.clickEventStatus === 'editBeneficiary') {
      this.isEditBeneficiary = true;
      this.getSelectedBeneficiaryData();
    } else {
      this.isBeneficiaryEditable = true;
    }

    this.accountTypeChange();
    this.getExposableId();
    this.getAllNationalityDetails();
    this.getCountryCodesDetails();
    this.getClientCurrency();
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
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        if (!control.value && control.errors) {
          control.markAsDirty();
          control.updateValueAndValidity();
          const fieldName = this.getFieldName(field);
          this.notificationService.createNotification(
            'error',
            fieldName + ' cannot be empty',
            '#cc2d2d',
            'Input Error'
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
    this.currentIndex -= 1;
  }

  next() {
    this.currentIndex += 1;
  }

  // getExposableId() {
  //   // this.agentDetailsDataService.getAgentExposableId().subscribe(res => {
  //   this.corporateAccountsChangeService
  //     .getCorporateExposableId(this.tokenStorageService.getUser())
  //     .subscribe((res: any) => {
  //       this.agentExposableId = res['responseDto']['agentExposableId'];
  //       this.getAgentSenderDetails();
  //       this.getTransferApprovedCountries();
  //     });
  // }

  getExposableId() {
    // this.agentDetailsDataService.getAgentExposableId().subscribe(res => {

    const data: any = {};
    data['username'] = this.tokenStorageService.getUser();

    this.corporateAccountsChangeService
      .getCorporateExposableId(data)
      .subscribe((res: any) => {
        this.agentExposableId = res['responseDto']['agentExposableId'];
        this.getAgentSenderDetails();
        this.getTransferApprovedCountries();
      });
  }

  getAgentSenderDetails() {
    const data: any = {};
    data['exposableId'] = this.agentExposableId;
    data['email'] = this.tokenStorageService.getUser();

    this.agentSenderDataService
      .getAgentSenderData(data)
      .subscribe((res: any) => {
        if (res['responseDto']) {
          this.agentSenderDetailsId =
            res['responseDto']['agentSenderDetailsId'];
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
      this.notificationService.createNotification(
        'error',
        'First name should contain at least 3 characters',
        '#cc2d2d',
        'Error'
      );
      return;
    } else if (!this.isCoporate && this.beneficiaryLastName!.value.length < 3) {
      this.notificationService.createNotification(
        'error',
        'Last name should contain at least 3 characters',
        '#cc2d2d',
        'Error'
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
      this.getTransferApprovedCountries();
      this.next();
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
        nationalityDetailsId: this.nationality!.value.nationalityDetailsId,
      };
    }

    const formData = {
      agentBeneficiaryDetailsId: agentBeneficiaryDetailsIdResult,
      beneficiaryFirstName: this.isCoporate
        ? this.companyName!.value
        : this.beneficiaryFirstName!.value,
      beneficiaryLastName: this.isCoporate
        ? null
        : this.beneficiaryLastName!.value,
      contactNumber: this.beneficiaryTelephone!.value,
      handphoneNo: this.beneficiaryhandphone!.value,
      countryCode: this.code1!.value,
      countryCodeMobile: this.code2!.value,
      address: this.beneficiaryAddress!.value,
      dateOfBirth: this.isCoporate ? null : dateOfBirthResult,
      placeOfBirth: this.isCoporate ? null : this.placeOfBirth!.value,
      nationalityDetailsDto: nationalityDetailsDtoResult,
      isActive: true,
      isCoporateBeneficiary: this.isCoporateBeneficiary!.value,
      clientCountryDto: this.country!.value.clientCountryDto,
      agentSenderDetailsDto: {
        agentSenderDetailsId: this.agentSenderDetailsId,
      },
      providerDetailsDto: this.providerDetailsDto!.value,
    };
    this.beneficiaryDataService.saveAgentBeneficiaryDetails(formData).subscribe(
      (res: any) => {
        if (res['responseDto']) {
          this.agentBeneficiaryDetailsId =
            res['responseDto']['agentBeneficiaryDetailsId'];
          if (this.isEditBeneficiary) {
            this.notificationService.createNotification(
              'success',
              'Beneficiary details updated successfully',
              '#00A03E',
              'Success'
            );
            this.eventTriggerService.onReloadServiceData();

            // Send email
            // console.log('before call');
            this.agentSenderDetailsId =
              res['responseDto']['agentSenderDetailsDto'][
                'agentSenderDetailsId'
              ];
            const data: any = {};
            data['agentBeneficiaryDetailsId'] = this.agentBeneficiaryDetailsId;
            data['agentSenderDetailsId'] = this.agentSenderDetailsId;
            this.beneficiaryDataService
              .getCreatedTransactionDetails(data)
              .subscribe((res: any) => {
                if (res['responseDto']) {
                  // console.log('after call');
                }
              });
          } else {
            if (this.agentBeneficiaryDetailsId) {
              this.addBankAccount();
            }
          }
        }
      },
      () => {
        this.notificationService.createNotification(
          'error',
          'Beneficiary details saving failed',
          '#cc2d2d',
          'Error'
        );
      }
    );
  }

  addBankAccountDetails() {
    const data: any = {};
    data['exposableId'] = this.agentExposableId;
    data['countryId'] =
      this.country!.value.clientCountryDto.countryDto.countryId;
    data['requestType'] = 1;

    let bankNameResult;

    if (this.isSriLankan) {
      bankNameResult = this.bank!.value.bankDto.bankName;
    } else {
      bankNameResult = this.bankName!.value;
    }

    const formData = {
      bankName: bankNameResult,
      accountNumber: this.accountNumber!.value,
      branchName: this.branchName!.value,
      bankCode: this.bankCode!.value,
      swiftCode: this.swiftCode!.value,
      isActive: true,
      beneficiaryDetailsId: this.agentBeneficiaryDetailsId,
      supportCurrency: this.supportCurrency!.value,
    };

    this.bankDataService.saveAgentBankData(data, formData).subscribe(
      (res: any) => {
        if (res['responseDto'] != null) {
          if (res['responseDto']['message'] == null) {
            this.eventTriggerService.onReloadServiceData();
            if (this.isEditBeneficiary) {
              this.notificationService.createNotification(
                'success',
                'Account details added successfully',
                '#00A03E',
                'Success'
              );
              this.getBankAccountDetails();
              this.clearBankDetails();
            } else {
              this.notificationService.createNotification(
                'success',
                'Beneficiary details saved successfully',
                '#00A03E',
                'Success'
              );
              this.closeModal();
            }
          } else {
            this.notificationService.createNotification(
              'error',
              res['responseDto']['message'],
              '#cc2d2d',
              'Error'
            );
          }
        }
      },
      () => {
        this.notificationService.createNotification(
          'error',
          'Bank account details saving failed',
          '#cc2d2d',
          'Error'
        );
      }
    );
  }

  getTransferApprovedCountries() {
    const data = this.agentExposableId;
    this.countryDataService
      .getSendingReceivingCountriesByAgentExposableId(data)
      .subscribe((res: any) => {
        this.transferApprovedCountries = res['responseDto'];
      });
  }

  onChangeCountry() {
    this.clearBankDetails();
    if (
      this.country!.value.clientCountryDto.countryDto.countryName ===
      'Sri Lanka'
    ) {
      this.isSriLankan = true;
      this.bankName!.setValidators(null);
      this.bankCode!.setValidators(null);

      this.bankName!.updateValueAndValidity();
      this.bankCode!.updateValueAndValidity();

      this.bank!.setValidators(Validators.required);
      this.bank!.updateValueAndValidity();

      this.swiftCode!.setValidators(null);
      this.swiftCode!.updateValueAndValidity();

      this.getBankDetails();
    } else {
      this.isSriLankan = false;
      this.bank!.setValidators(null);
      this.bank!.updateValueAndValidity();

      this.bankName!.setValidators(Validators.required);
      this.bankCode!.setValidators(Validators.required);
      this.swiftCode!.setValidators(Validators.required);
    }

    if (this.country!.value) {
      this.bankCodeLabel =
        this.country!.value.clientCountryDto.countryDto.bankCodeLabel;
      this.swiftCodeLabel =
        this.country!.value.clientCountryDto.countryDto.swiftCodeLabel;
      this.routingNumberLabel =
        this.country!.value.clientCountryDto.countryDto.routingNumberLabel;
      this.label4 = this.country!.value.clientCountryDto.countryDto.label4;
      this.label5 = this.country!.value.clientCountryDto.countryDto.label5;
      this.label6 = this.country!.value.clientCountryDto.countryDto.label6;
    }
  }

  getBankDetails() {
    if (this.country!.value) {
      const data: any = {};
      data['countryId'] =
        this.country!.value.clientCountryDto.countryDto.countryId;
      data['exposableId'] = this.agentExposableId;

      this.bankDataService
        .getBankDetailsByExposableId(data)
        .subscribe((res: any) => {
          this.bankList = res['responseDto'];
        });
    } else {
      this.bankList = [];
    }
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

    if (!this.seletcedBeneficiaryData.isCoporateBeneficiary) {
      this.beneficiaryDetailsForm.patchValue({
        beneficiaryFirstName: this.seletcedBeneficiaryData.beneficiaryFirstName,
        beneficiaryLastName: this.seletcedBeneficiaryData.beneficiaryLastName,
        code1: this.seletcedBeneficiaryData.contactId,
        beneficiaryTelephone: this.seletcedBeneficiaryData.contactNumber,
        code2: this.seletcedBeneficiaryData.countryCodeMobile,
        beneficiaryhandphone: this.seletcedBeneficiaryData.handphoneNo,
        beneficiaryAddress: this.seletcedBeneficiaryData.address,
        dateOfBirth: this.seletcedBeneficiaryData.dateOfBirth,
        placeOfBirth: this.seletcedBeneficiaryData.placeOfBirth,
        nationality: this.seletcedBeneficiaryData.nationalityDetailsDto,
        isCoporateBeneficiary:
          this.seletcedBeneficiaryData.isCoporateBeneficiary,
        providerDetailsDto: this.seletcedBeneficiaryData.providerDetailsDto,
      });
      if (this.seletcedBeneficiaryData.dateOfBirth) {
        this.validateDob();
      }
    } else {
      this.beneficiaryDetailsForm.patchValue({
        companyName: this.seletcedBeneficiaryData.beneficiaryFirstName,
        code1: this.seletcedBeneficiaryData.contactId,
        beneficiaryTelephone: this.seletcedBeneficiaryData.contactNumber,
        code2: this.seletcedBeneficiaryData.countryCodeMobile,
        beneficiaryhandphone: this.seletcedBeneficiaryData.handphoneNo,
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
    data['agentBeneficiaryDetailsId'] = this.agentBeneficiaryDetailsId;
    data['pageNumber'] = this.pageNumber;
    data['pageSize'] = this.pageSize;

    this.bankAccountDataService
      .getAllBeneficiaryBankAccountDetails(data)
      .subscribe((res: any) => {
        if (res['responseDto'] === null) {
          this.totalRecords = 0;
          this.bankAccountDetails = [];
        } else {
          this.totalRecords = res['responseDto']['totalRecords'];
          this.bankAccountDetails = res['responseDto']['payload'];
        }
      });
  }

  updateBeneficiary() {
    if (!this.beneficiaryDetailsForm.valid) {
      this.validateAllFormFields(this.beneficiaryDetailsForm);
    } else if (this.dateOfBirth!.value && !this.isDateOfBirthValid) {
      this.validateDob();
    } else {
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
          nationalityDetailsId: this.nationality!.value.nationalityDetailsId,
        };
      }

      const formData = {
        agentBeneficiaryDetailsId: agentBeneficiaryDetailsIdResult,
        beneficiaryFirstName: this.isCoporate
          ? this.companyName!.value
          : this.beneficiaryFirstName!.value,
        beneficiaryLastName: this.isCoporate
          ? null
          : this.beneficiaryLastName!.value,
        contactNumber: this.beneficiaryTelephone!.value,
        handphoneNo: this.beneficiaryhandphone!.value,
        countryCode: this.code1!.value,
        countryCodeMobile: this.code2!.value,
        address: this.beneficiaryAddress!.value,
        dateOfBirth: this.isCoporate ? null : dateOfBirthResult,
        placeOfBirth: this.isCoporate ? null : this.placeOfBirth!.value,
        nationalityDetailsDto: nationalityDetailsDtoResult,
        isActive: true,
        isCoporateBeneficiary: this.isCoporateBeneficiary!.value,
        clientCountryDto: this.country!.value,
        agentSenderDetailsDto: {
          agentSenderDetailsId: this.agentSenderDetailsId,
        },
        providerDetailsDto: this.providerDetailsDto!.value,
      };

      this.beneficiaryDataService
        .saveAgentBeneficiaryDetails(formData)
        .subscribe(
          (res: any) => {
            if (res['responseDto']) {
              this.agentBeneficiaryDetailsId =
                res['responseDto']['agentBeneficiaryDetailsId'];
              if (this.isEditBeneficiary) {
                this.notificationService.createNotification(
                  'success',
                  'Beneficiary details updated successfully',
                  '#00A03E',
                  'Success'
                );
                this.eventTriggerService.onReloadServiceData();

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
                this.beneficiaryDataService
                  .getCreatedTransactionDetails(data)
                  .subscribe((res: any) => {
                    if (res['responseDto']) {
                      // console.log('after call');
                    }
                  });
              } else {
                if (this.agentBeneficiaryDetailsId) {
                  this.addBankAccount();
                }
              }
            }
          },
          () => {
            this.notificationService.createNotification(
              'error',
              'Beneficiary details updating failed',
              '#cc2d2d',
              'Error'
            );
          }
        );
    }
  }

  addBankAccount() {
    if (!this.accountDetailsForm.valid) {
      this.validateAllFormFields(this.accountDetailsForm);
      return;
    } else {
      this.addBankAccountDetails();
    }
  }

  // disabledFutureDates = (current: Date): boolean => {
  //   return differenceInCalendarDays(current, this.todayDate) > 0;
  // }

  closeModal() {
    this.modalRef.destroy();
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
      this.beneficiaryFirstName!.setValidators([Validators.required]);
      this.beneficiaryLastName!.setValidators([Validators.required]);
      this.companyName!.setValidators(null);
      this.beneficiaryFirstName!.updateValueAndValidity();
      this.beneficiaryLastName!.updateValueAndValidity();
      this.companyName!.updateValueAndValidity();

      this.dateOfBirth!.setValidators([Validators.required]);
      this.placeOfBirth!.setValidators([Validators.required]);
      this.nationality!.setValidators([Validators.required]);
      this.dateOfBirth!.updateValueAndValidity();
      this.placeOfBirth!.updateValueAndValidity();
      this.nationality!.updateValueAndValidity();
    } else {
      this.beneficiaryFirstName!.setValidators(null);
      this.beneficiaryLastName!.setValidators(null);
      this.companyName!.setValidators([Validators.required]);
      this.beneficiaryFirstName!.updateValueAndValidity();
      this.beneficiaryLastName!.updateValueAndValidity();
      this.companyName!.updateValueAndValidity();

      this.dateOfBirth!.setValidators(null);
      this.placeOfBirth!.setValidators(null);
      this.nationality!.setValidators(null);
      this.dateOfBirth!.updateValueAndValidity();
      this.placeOfBirth!.updateValueAndValidity();
      this.nationality!.updateValueAndValidity();
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
      this.notificationService.createNotification(
        'error',
        'Age can not be below 16 years',
        '#cc2d2d',
        'Input Error'
      );
      this.isDateOfBirthValid = false;
    } else {
      this.isDateOfBirthValid = true;
    }
  }

  clearBankDetails() {
    this.accountDetailsForm.patchValue({
      accountNumber: null,
      branchName: null,
      bankCode: null,
      swiftCode: null,
      supportCurrency: null,
    });

    this.accountDetailsForm.updateValueAndValidity();
    this.bankName!.reset();
    this.bankName!.updateValueAndValidity();
    this.bank!.reset();
    this.bank!.updateValueAndValidity();
  }

  getAllNationalityDetails() {
    this.nationalityDetailsService
      .getAllNationalityDetails()
      .subscribe((res: any) => {
        if (res['responseDto']) {
          this.nationalityData = res['responseDto'];
        } else {
          this.nationalityData = [];
        }
      });
  }

  changeStatus(receivedData: any) {
    let statusValueResult;

    if (this.statusValue === true) {
      statusValueResult = 1;
    } else {
      statusValueResult = 0;
    }

    const data: any = {};
    data['agentBeneficiaryBankAccountDetailsId'] =
      receivedData.agentBeneficiaryBankAccountDetailsId;
    data['isActive'] = statusValueResult;

    this.bankAccountDataService
      .setBeneficiaryBankAccountActiveStatus(data)
      .subscribe(
        (res: any) => {
          if (res['responseDto']) {
            if (res['responseDto'].isActive === true) {
              this.notificationService.createNotification(
                'success',
                'Activated successfully',
                '#00A03E',
                'Success'
              );
            } else {
              this.notificationService.createNotification(
                'success',
                'Deactivated successfully',
                '#00A03E',
                'Success'
              );
            }

            this.getBankAccountDetails();
          }
        },
        () => {
          this.notificationService.createNotification(
            'error',
            'Status update failed',
            '#cc2d2d',
            'Error'
          );
        }
      );
  }

  getCountryCodesDetails() {
    this.countryCodeDataService
      .getCountryCodesDetailsService()
      .subscribe((res: any) => {
        this.data = res['responseDto'];
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
    if (this.beneficiaryTelephone!.value.length > 15) {
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
          this.notificationService.createNotification(
            'error',
            'Contact Number should be less than 15',
            '#cc2d2d',
            'Invalid Contact Number'
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
    if (this.beneficiaryhandphone!.value.length > 15) {
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
          this.notificationService.createNotification(
            'error',
            'Mobile Number should be less than 15',
            '#cc2d2d',
            'Invalid Contact Number'
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
      this.beneficiaryDataService
        .checkBeneficiaryDetailsIsEditable(data)
        .subscribe((res: any) => {
          if (res['responseDto']) {
            if (res['responseDto']['isEditable'] === true) {
              this.isBeneficiaryEditable = true;
            } else {
              this.isBeneficiaryEditable = false;
            }
          }
        });
    }
  }

  customSearchFn(term: string, item: any) {
    term = term.toLocaleLowerCase();
    return item.countryId.countryName.toLocaleLowerCase().indexOf(term) > -1;
  }

  getClientCurrency() {
    this.clientCurrencyDataService
      .getClientCurrencyDataByClientCode(this.agentCustomerData.client_code)
      .subscribe((res: any) => {
        this.recipientCurrencies = res['responseDto'];
      });
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
}
