import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { format } from 'date-fns';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Subject, takeUntil } from 'rxjs';
import { CommonService } from 'src/app/_services/common.service';
import { CorporateAccountsChangeService } from 'src/app/_services/corporate-accounts-change.service';
import { CountryDataService } from 'src/app/_services/country-data.service';
import { MyTansactionService } from 'src/app/_services/my-tansaction.service';
import { DataService } from 'src/app/_services/shared-data/data.service';
import { EventTriggerService } from 'src/app/_services/shared-data/event-trigger.service';
import { TokenStorageServiceService } from 'src/app/_services/token-storage-service.service';
import { TokenService } from 'src/app/_services/token.service';
import { TransferFlow2Service } from 'src/app/_services/transfer-flow2.service';
import { MyValidators } from 'src/app/_validators/custom-validator';

@Component({
  selector: 'app-benificary-details',
  templateUrl: './benificary-details.component.html',
  styleUrls: ['./benificary-details.component.sass'],
})
export class BenificaryDetailsComponent {
  @Input() mode: any;
  public beneficiaryDetailsForm!: FormGroup;
  countryCodes: any;
  disabledFutureDates: any;

  receivedTransactionData: any;
  invoiceId = 6720;
  transferNumber = 'USSPESFZC';
  transactionDate = '20/07/2023';
  SenderName = 'Test User';
  transferedAmount = 1.0;
  beneficiaryName = 'Test Ben';
  serviceMode = 'SpotOnPay';
  receivedAmount = 10.0;

  isSwiftCodeLable: any;

  isCashPickup = false;
  isCoporate = false;
  viewProviderField = false;

  currentActiveUserAccount: any;
  isBeneficiaryEditable = false;
  isBankDetailsEditable = false;
  agentExposableId: any;
  agentSenderDetailsId: any;
  bankList = [];
  nationalityData = [];
  transferApprovedCountries = [];

  isSriLankan = false;

  bankCodeLabel: any;
  swiftCodeLabel: any;
  routingNumberLabel: any;
  label4: any;
  label5: any;
  label6: any;
  ibanValue: any;
  bankcodeValue: any;
  IfscValue: any;
  routingNumberValue: any;
  transitNumberValue: any;
  cnapsCodeValue: any;
  swiftCodeValue: any;

  IfsccodeLable: any;
  IbanCodeLable: any;
  BranchCodeLable: any;

  todayDate = new Date();
  isDateOfBirthValid = false;
  agentBeneficiaryDetailsId: any;
  agentBeneficiaryBankAccountDetailsId: any;
  beneficiaryDateOfBirth: any;
  isUpdatebuttonDisabled = true;
  agentTransactionDetailId: any;

  // countryCodes = [];
  recipientCurrencies = [];
  agentCustomerData: any;

  AllTransactionData: any;
  clientData: any;
  allNationality: any;
  allCountryCodes: any;
  allCilentCurrency: any;
  allReceivingCountry: any;
  isBenifisaryEditable: any;
  // isBenifisaryBankEditable: any;
  public distroy$ = new Subject<void>();

  codeId: any;
  codeId2: any;
  SelectNationalityId: any;
  personalValidators: any;
  allBenifisaryDetaisl: any;

  //bankcodes
  bankcodeLable: any;
  // swiftCodeLabel: any;
  isIban = false;
  isBankCode = false;
  isIfsc = false;
  isRoutingNumber = false;
  isRoutingNumber1 = false;
  isTransitNumber = false;
  isCnapsCode = false;
  isSwiftCode = false;

  CountryType: any;
  allBenifisaryDetails: any;
  benCountryId: any;
  benCountryName: any;

  constructor(
    private formBuilder: FormBuilder,
    private notificationService: NzNotificationService,
    private myTansactionService: MyTansactionService,
    private commonsService: CommonService,
    private tokenService: TokenService,
    private dataservice: DataService,
    private transferFlow2Service: TransferFlow2Service,
    private tokenStorageService: TokenStorageServiceService,
    private corporateAccountsChangeService: CorporateAccountsChangeService,
    private eventTriggerService: EventTriggerService,
    private countryDataServices: CountryDataService
  ) {
    this.clientData = this.commonsService.parseJwt(tokenService.getToken());
    this.getAllCountryCode();
    console.log(
      'new client currency Id chcking',
      this.dataservice.newBankCliendcurrencId
    );
  }

  ngOnInit() {
    // this.eventTriggerService.executeOnchangeFunction.subscribe({
    //   next: (res: any) => {
    //     if (res === 'benUpdated') {
    //       this.getCostomerTransactionDetails();
    //     }
    //   },
    // });
    this.benCountryId =
      this.dataservice.saveAllTransactionData.beneficiaryCountryId;
    this.benCountryName =
      this.dataservice.saveAllTransactionData.beneficiaryCountry;
    const {
      required,
      customRequired,
      maxLength,
      minLength,
      customEmail,
      pattern,
    } = MyValidators;

    this.beneficiaryDetailsForm = this.formBuilder.group({
      beneficiaryFirstName: [null, Validators.required],
      beneficiaryLastName: [null, Validators.required],
      companyName: [null, Validators.required],
      code2: [null, Validators.required],
      contactNumber: [null, Validators.compose([maxLength(15)])],
      mobileNumber: [
        null,
        Validators.compose([
          Validators.required,
          maxLength(15),
          Validators.required,
        ]),
      ],
      address: [null, Validators.required],
      dateOfBirth: [null, Validators.required],
      placeOfBirth: [null, Validators.required],
      nationality: [null, null],
      isCoporateBeneficiary: [false],
      code1: [null, null],
      providerDetailsDto: [null],
      country: [null, Validators.required],
      bankName: [null],
      bank: [null],
      accountNumber: [null, Validators.required],
      branchName: [null, Validators.required],
      bankcodes: [null],
      swiftCode: [null],
      iban: [null],
      ifsc: [null],
      routingNumber: [null],
      transitNumber: [null],
      cnapsCode: [null],
      supportCurrency: [null, Validators.required],
    });

    if (this.dataservice.isBenifisaryBankEditable === false) {
      this.beneficiaryDetailsForm.get('country')?.disable();
      this.beneficiaryDetailsForm.get('bankName')?.disable();
      this.beneficiaryDetailsForm.get('accountNumber')?.disable();
      this.beneficiaryDetailsForm.get('branchName')?.disable();
      this.beneficiaryDetailsForm.get('supportCurrency')?.disable();
      this.beneficiaryDetailsForm.get('bankcodes')?.disable();
      this.beneficiaryDetailsForm.get('swiftCode')?.disable();
      this.beneficiaryDetailsForm.get('iban')?.disable();
      this.beneficiaryDetailsForm.get('ifsc')?.disable();
      this.beneficiaryDetailsForm.get('routingNumber')?.disable();
      this.beneficiaryDetailsForm.get('transitNumber')?.disable();
      this.beneficiaryDetailsForm.get('cnapsCode')?.disable();
      this.beneficiaryDetailsForm.get('cnapsCode')?.disable();
    }

    if (this.dataservice.isBenifisaryEditable === false) {
      this.beneficiaryDetailsForm.get('beneficiaryFirstName')?.disable();
      this.beneficiaryDetailsForm.get('beneficiaryLastName')?.disable();
      this.beneficiaryDetailsForm.get('code1')?.disable();
      this.beneficiaryDetailsForm.get('contactNumber')?.disable();
      this.beneficiaryDetailsForm.get('code2')?.disable();
      this.beneficiaryDetailsForm.get('mobileNumber')?.disable();
      this.beneficiaryDetailsForm.get('address')?.disable();
      this.beneficiaryDetailsForm.get('dateOfBirth')?.disable();
      this.beneficiaryDetailsForm.get('placeOfBirth')?.disable();
      this.beneficiaryDetailsForm.get('companyName')?.disable();
      // this.beneficiaryDetailsForm.get('isCoporateBeneficiary')?.disable();
      this.beneficiaryDetailsForm.get('nationality')?.disable();
    }
    // console.log(this.dataservice.saveAllTransactionData);
    this.getBeneficiary();

    this.isCoporate = this.dataservice.saveAllTransactionData.isCorporate;
    console.log(this.isCoporate);

    this.beneficiaryDetailsForm.get('isCoporateBeneficiary')?.disable();

    this.getCostomerTransactionDetails();
    this.getAllNationality();
    // this.getAllCountryCode();
    // this.getAllClientCurrency();
    this.getExposableId();
    // this.getAgentReceivingCountry();
    this.getCountry();

    this.beneficiaryDetailsForm
      .get('code1')!
      .valueChanges.pipe(takeUntil(this.distroy$))
      .subscribe((selectedCode: any) => {
        const selectedCodeType = this.allCountryCodes?.find(
          (CodeValue: any) => CodeValue.phonePrefix === selectedCode
        );
        if (selectedCodeType) {
          this.codeId = selectedCodeType.countryCodeId;
          this.beneficiaryDetailsForm.patchValue({
            code1: this.codeId,
          });
        }
      });
    this.beneficiaryDetailsForm
      .get('code2')!
      .valueChanges.pipe(takeUntil(this.distroy$))
      .subscribe((selectedCode: any) => {
        const selectedCodeType = this.allCountryCodes?.find(
          (CodeValue: any) => CodeValue.phonePrefix === selectedCode
        );
        if (selectedCodeType) {
          this.codeId2 = selectedCodeType.countryCodeId;
          this.beneficiaryDetailsForm.patchValue({
            code2: this.codeId2,
          });
        }
      });
    // this.beneficiaryDetailsForm
    //   .get('nationality')!
    //   .valueChanges.pipe(takeUntil(this.distroy$))
    //   .subscribe((selectedCNationality: any) => {
    //     const selectedNationalType = this.allNationality.find(
    //       (NationalityaValue: any) =>
    //         NationalityaValue.nationality === selectedCNationality
    //     );
    //     if (selectedNationalType) {
    //       this.SelectNationalityId = selectedNationalType.countryCodeId;
    //     }
    //   });

    // console.log('data service search ', this.dataservice.isBenifisaryEditable);
    // console.log(
    //   'data service search ',
    //   this.dataservice.isBenifisaryBankEditable
    // );
  }

  get beneficiaryFirstName() {
    return this.beneficiaryDetailsForm.get('beneficiaryFirstName');
  }
  get beneficiaryLastName() {
    return this.beneficiaryDetailsForm.get('beneficiaryLastName');
  }
  get contactNumber() {
    return this.beneficiaryDetailsForm.get('contactNumber');
  }
  get mobileNumber() {
    return this.beneficiaryDetailsForm.get('mobileNumber');
  }
  get address() {
    return this.beneficiaryDetailsForm.get('address');
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
  get companyName() {
    return this.beneficiaryDetailsForm.get('companyName');
  }
  get isCoporateBeneficiary() {
    return this.beneficiaryDetailsForm.get('isCoporateBeneficiary');
  }
  get code1() {
    return this.beneficiaryDetailsForm.get('code1');
  }
  get code2() {
    return this.beneficiaryDetailsForm.get('code2');
  }
  get providerDetailsDto() {
    return this.beneficiaryDetailsForm.get('providerDetailsDto');
  }
  get country() {
    return this.beneficiaryDetailsForm.get('country');
  }
  get bankName() {
    return this.beneficiaryDetailsForm.get('bankName');
  }
  get bank() {
    return this.beneficiaryDetailsForm.get('bank');
  }
  get accountNumber() {
    return this.beneficiaryDetailsForm.get('accountNumber');
  }
  get branchName() {
    return this.beneficiaryDetailsForm.get('branchName');
  }
  // get bankCode() {
  //   return this.beneficiaryDetailsForm.get('bankCode');
  // }
  get swiftCode() {
    return this.beneficiaryDetailsForm.get('swiftCode');
  }
  get supportCurrency() {
    return this.beneficiaryDetailsForm.get('supportCurrency');
  }
  get bankcodes() {
    return this.beneficiaryDetailsForm?.get('bankcodes');
  }
  get iban() {
    return this.beneficiaryDetailsForm?.get('iban');
  }
  get ifsc() {
    return this.beneficiaryDetailsForm?.get('ifsc');
  }
  get routingNumber() {
    return this.beneficiaryDetailsForm?.get('routingNumber');
  }
  get transitNumber() {
    return this.beneficiaryDetailsForm?.get('transitNumber');
  }
  get cnapsCode() {
    return this.beneficiaryDetailsForm?.get('cnapsCode');
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        if (!control.value && control.errors) {
          control.markAsDirty();
          control.updateValueAndValidity();
          const fieldName = this.getFieldName(field);
          this.notificationService.create(
            'error',
            'Input Error',
            fieldName + ' cannot be empty',
            { nzStyle: { background: '#cc2d2d', color: '#fff' } }
          );
        } else {
          // this.isFieldValid(field);
        }
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  checkFromFieldValidate() {
    if (this.isCoporate === false) {
      this.beneficiaryDetailsForm.get('companyName')?.setValidators(null);
      this.beneficiaryDetailsForm.get('companyName')?.updateValueAndValidity();
      // this.validateAllFormFields(this.beneficiaryDetailsForm);
      this.personalValidators = true;
    } else {
      this.beneficiaryDetailsForm
        .get('beneficiaryFirstName')
        ?.setValidators(null);
      this.beneficiaryDetailsForm
        .get('beneficiaryFirstName')
        ?.updateValueAndValidity();
      this.beneficiaryDetailsForm
        .get('beneficiaryLastName')
        ?.setValidators(null);
      this.beneficiaryDetailsForm
        .get('beneficiaryLastName')
        ?.updateValueAndValidity();
      this.beneficiaryDetailsForm.get('placeOfBirth')?.setValidators(null);
      this.beneficiaryDetailsForm.get('placeOfBirth')?.updateValueAndValidity();
      this.beneficiaryDetailsForm.get('nationality')?.setValidators(null);
      this.beneficiaryDetailsForm.get('nationality')?.updateValueAndValidity();
      // this.validateAllFormFields(this.beneficiaryDetailsForm);
      this.personalValidators = false;
    }
  }

  getFieldName(option: any): any {
    switch (option) {
      case 'beneficiaryFirstName': {
        return 'beneficiary FirstName';
      }
      case 'beneficiaryLastName': {
        return 'beneficiary LastName';
      }
      case 'companyName': {
        return 'company Name';
      }
      case 'code2': {
        return 'Country code';
      }
      case 'contactNumber': {
        return 'Contact Number';
      }
      case 'mobileNumber': {
        return 'Mobile Number';
      }
      case 'address': {
        return 'Address';
      }
      case 'dateOfBirth': {
        return 'Date Of Birth';
      }
      case 'placeOfBirth': {
        return 'Place Of Birth';
      }
      case 'nationality': {
        return 'Nationality';
      }
      case 'code1': {
        return 'Country code';
      }
      case 'country': {
        return 'Country';
      }
      case 'bankName': {
        return 'BankName';
      }
      case 'accountNumber': {
        return 'Account Number';
      }
      case 'branchName': {
        return 'BranchName';
      }
      case 'bankcodes': {
        return 'Bank codes';
      }
      case 'iban': {
        return 'IBAN';
      }
      case 'ifsc': {
        return 'IFSC';
      }
      case 'routingNumber': {
        return 'Routing Number';
      }
      case 'transitNumber': {
        return 'Transit Number';
      }
      case 'cnapsCode': {
        return 'CNAPS Code';
      }
    }
  }

  getExposableId() {
    const data: any = {};
    data['username'] = this.tokenStorageService.getUser();
    this.corporateAccountsChangeService
      .getCorporateExposableId(data)
      .pipe(takeUntil(this.distroy$))
      .subscribe((res: any) => {
        if (res['responseDto']) {
          this.agentExposableId = res['responseDto']['agentExposableId'];
          this.getbenifisaryDetails(this.agentExposableId);
          this.getAllClientCurrency(this.agentExposableId);
        }
      });
  }
  getAllNationality() {
    const data: any = {};
    this.myTansactionService
      .getNationality()
      .pipe(takeUntil(this.distroy$))
      .subscribe((res: any) => {
        if (res['responseDto']) {
          this.allNationality = res['responseDto'];

          const nationalityName =
            this.dataservice.saveAllTransactionData.userNationalityName;

          const selectedNationality = this.allNationality?.find(
            (code: { nationality: any }) => code.nationality === nationalityName
          );

          if (selectedNationality) {
            this.SelectNationalityId =
              selectedNationality?.nationalityDetailsId;
          }
          // this.beneficiaryDetailsForm.patchValue({
          //   nationality: selectedNationality
          //     ? selectedNationality.nationality
          //     : null,
          // });
        }
      });
  }

  updateNationality(value: any) {
    if (value != null || value != undefined) {
      const selectedNationalType = this.allNationality?.find(
        (NationalityaValue: any) =>
          NationalityaValue.nationalityDetailsId === value
      );
      if (selectedNationalType) {
        this.SelectNationalityId = selectedNationalType?.nationalityDetailsId;
      }
    }
  }

  getAllCountryCode() {
    this.myTansactionService
      .getCountryCode()
      .pipe(takeUntil(this.distroy$))
      .subscribe((res: any) => {
        if (res['responseDto']) {
          this.allCountryCodes = res['responseDto'];

          const benifisaryCountryCodeId =
            this.dataservice.saveAllTransactionData.countryCode;

          const selectedCounrtyCode = this.allCountryCodes?.find(
            (code: { phonePrefix: any }) =>
              code.phonePrefix === benifisaryCountryCodeId
          );
          const benifisaryCountryCodeId2 =
            this.dataservice.saveAllTransactionData.beneficiaryMobileCode;

          const selectedCounrtyCode2 = this.allCountryCodes?.find(
            (code: { phonePrefix: any }) =>
              code.phonePrefix === benifisaryCountryCodeId2
          );

          // this.beneficiaryDetailsForm.patchValue({
          //   code1: selectedCounrtyCode ? selectedCounrtyCode.phonePrefix : null,
          //   code2: selectedCounrtyCode2
          //     ? selectedCounrtyCode2.phonePrefix
          //     : null,
          // });
        }
      });
  }

  // getAllClientCurrency() {
  //   this.myTansactionService
  //     .getClientCurrency()
  //     .pipe(takeUntil(this.distroy$))
  //     .subscribe((res: any) => {
  //       if (res['responseDto']) {
  //         this.allCilentCurrency = res['responseDto'];
  //         const receivingCurrncy =
  //           this.dataservice.saveAllTransactionData.recipientCurrency;

  //         const selectedCounrtyId = this.allCilentCurrency.find(
  //           (code: { currencyCode: any }) =>
  //             code.currencyCode === receivingCurrncy
  //         );
  //         this.getAgentReceivingCountry(selectedCounrtyId.currencyId);
  //         this.beneficiaryDetailsForm.patchValue({
  //           supportCurrency: selectedCounrtyId
  //             ? selectedCounrtyId.currencyId
  //             : null,
  //         });
  //       }
  //     });
  // }

  getAllClientCurrency(values: any) {
    console.log(
      'new client currency Id chcking',
      this.dataservice.newBankCliendcurrencId
    );
    const data: any = {};
    data['exposableId'] = values;
    this.myTansactionService
      .getAgentReceivingCurrency(data)
      .pipe(takeUntil(this.distroy$))
      .subscribe((res: any) => {
        if (res['responseDto']) {
          this.allCilentCurrency = res['responseDto'];
          const receivingCurrncy =
            this.dataservice.saveAllTransactionData.recipientCurrency;

          const selectedCounrtyId = this.allCilentCurrency?.find(
            (code: { currencyCode: any }) =>
              code.currencyCode === receivingCurrncy
          );
          // this.getAgentReceivingCountry(selectedCounrtyId.currencyId);
          // this.beneficiaryDetailsForm.patchValue({
          //   supportCurrency: this.dataservice.newBankCliendcurrencId
          //     ? this.dataservice.newBankCliendcurrencId
          //     : null,
          // });
        }
      });
  }
  getCountry() {
    this.countryDataServices.getCountryForContctPage().subscribe({
      next: (res: any) => {
        if (res['responseDto']) {
          this.allReceivingCountry = res['responseDto'];
        }
      },
      error: () => {
        this.allReceivingCountry = '';
      },
    });
  }

  // getAgentReceivingCountry(currency: any) {
  //   const data: any = {};
  //   data['clientCountryId'] = currency;
  //   this.myTansactionService
  //     .getAgentReceivingCountry(data)
  //     .pipe(takeUntil(this.distroy$))
  //     .subscribe((res: any) => {
  //       if (res['responseDto']) {
  //         this.allReceivingCountry = res['responseDto'];

  //         const clientCountry =
  //           this.dataservice.saveAllTransactionData.beneficiaryBankCountryId;

  //         this.getCustomerReceivingCountries(clientCountry);

  //         const selectedCounrtyId = this.allReceivingCountry?.find(
  //           (countryNameVlaue: any) =>
  //             countryNameVlaue.clientCountryId ===
  //             this.dataservice.saveAllTransactionData.beneficiaryBankCountryId
  //         );

  //         const clientCountryName =
  //           this.dataservice.saveAllTransactionData.beneficiaryCountry;

  //         const selectedCounrtyId2 = this.allReceivingCountry?.find(
  //           (countryNameVlaue: any) =>
  //             countryNameVlaue.countryName ===
  //             this.dataservice.saveAllTransactionData.beneficiaryCountry
  //         );

  //         if (selectedCounrtyId2) {
  //           this.CountryType = selectedCounrtyId.clientCountryId;
  //           this.getCustomerReceivingCountries(this.CountryType);
  //         }

  //         this.beneficiaryDetailsForm.patchValue({
  //           country: selectedCounrtyId
  //             ? selectedCounrtyId.clientCountryId
  //             : selectedCounrtyId2
  //             ? selectedCounrtyId2.clientCountryId
  //             : null,
  //         });

  //       }
  //     });
  // }

  getbenifisaryDetails(exposablId: any) {
    const data: any = {};
    data['exposableId'] = exposablId;
    data['agentSenderDetailsId'] =
      this.dataservice.saveAllTransactionData.agentSenderDetailId;
    this.myTansactionService
      .getAgentBenifisaryDetails(data)
      .pipe(takeUntil(this.distroy$))
      .subscribe((res: any) => {
        if (res['responseDto']) {
          this.allBenifisaryDetaisl = res['responseDto'];
        }
      });
  }

  getCustomerReceivingCountries(value: any) {
    const data: any = [];
    data['clientcurrencyid'] = value;

    this.transferFlow2Service
      .getAgentReceivingCountries(data)
      .subscribe((res: any) => {
        if (res['responseDto']) {
          this.bankcodeLable = res['responseDto']['bankCodeLabel'];
          this.swiftCodeLabel = res['responseDto']['swiftCodeLabel'];
          this.routingNumberLabel = res['responseDto']['routingNumberLabel'];
          this.IfsccodeLable = res['responseDto']['label4'];
          this.IbanCodeLable = res['responseDto']['label5'];
          this.BranchCodeLable = res['responseDto']['label6'];

          if (res['responseDto']['countryName'] === 'Sri Lanka') {
            this.isSriLankan = true;
          }

          if (this.IfsccodeLable != null) {
            this.isIfsc = true;
          }
          if (this.IbanCodeLable != null) {
            this.isIban = true;
          }
          if (this.BranchCodeLable != null) {
            this.isTransitNumber = true;
          }

          if (this.swiftCodeLabel === 'Swift Code') {
            this.isSwiftCode = true;
          } else {
            this.isSwiftCode = false;
          }

          if (this.routingNumberLabel === 'Routing Number') {
            this.isRoutingNumber = true;
          } else {
            this.isRoutingNumber = false;
          }
          if (this.bankcodeLable === 'Bank Code') {
            this.isBankCode = true;
          }

          // if (this.bankcodeLable === 'IBAN') {
          //   this.isIban = true;
          //   this.isBankCode = false;
          //   this.isIfsc = false;
          //   this.isRoutingNumber1 = false;
          //   this.isTransitNumber = false;
          //   this.isCnapsCode = false;
          // } else if (this.bankcodeLable === 'Bank Code') {
          //   this.isBankCode = true;
          //   this.isIban = false;
          //   this.isIfsc = false;
          //   this.isRoutingNumber1 = false;
          //   this.isTransitNumber = false;
          //   this.isCnapsCode = false;
          // } else if (this.bankcodeLable === 'IFSC') {
          //   this.isIfsc = true;
          //   this.isBankCode = false;
          //   this.isIban = false;
          //   this.isRoutingNumber1 = false;
          //   this.isTransitNumber = false;
          //   this.isCnapsCode = false;
          // } else if (this.bankcodeLable === 'Routing Number') {
          //   this.isRoutingNumber1 = true;
          //   this.isIfsc = false;
          //   this.isBankCode = false;
          //   this.isIban = false;
          //   this.isTransitNumber = false;
          //   this.isCnapsCode = false;
          // } else if (this.bankcodeLable === 'Transit Number') {
          //   this.isTransitNumber = true;
          //   this.isRoutingNumber1 = false;
          //   this.isIfsc = false;
          //   this.isBankCode = false;
          //   this.isIban = false;
          //   this.isCnapsCode = false;
          // } else if (this.bankcodeLable === 'CNAPS Code') {
          //   this.isCnapsCode = true;
          //   this.isTransitNumber = false;
          //   this.isRoutingNumber1 = false;
          //   this.isIfsc = false;
          //   this.isBankCode = false;
          //   this.isIban = false;
          //   this.isCnapsCode = false;
          // }
          // if (this.swiftCodeLabel === 'Swift Code') {
          //   this.isSwiftCode = true;
          // } else {
          //   this.isSwiftCode = false;
          // }
          // if (this.routingNumberLabel === 'Routing Number') {
          //   this.isRoutingNumber = true;
          // } else {
          //   this.isRoutingNumber = false;
          // }

          this.beneficiaryDetailsForm.patchValue({
            iban: this.dataservice.saveAllTransactionData.benelabel5,
            bankcodes:
              this.dataservice.saveAllTransactionData.beneficiaryBankCode,
            ifsc: this.dataservice.saveAllTransactionData.benelabel4,
            routingNumber:
              this.dataservice.saveAllTransactionData.beneficiaryRoutingNumber,
            transitNumber: this.dataservice.saveAllTransactionData.benelabel6,
            cnapsCode:
              this.dataservice.saveAllTransactionData.beneficiaryBankCode,
            swiftCode:
              this.dataservice.saveAllTransactionData.beneficiarySwiftCode,
          });
        }
      });
  }
  getBeneficiary() {
    const data: any = {};
    data['agentBeneficiaryDetailsId'] =
      this.dataservice.saveAllTransactionData.agentBeneficiaryDetailsId;
    this.transferFlow2Service
      .getAllExistingBenificaryDetailsForPatchData(data)
      .subscribe((res: any) => {
        if (res['responseDto']) {
          this.allBenifisaryDetails = res['responseDto'];
        }
        this.isCoporate = this.allBenifisaryDetails.isCorporate;

        console.log('contact id', this.allBenifisaryDetails.contactId);
        this.beneficiaryDetailsForm.patchValue({
          beneficiaryFirstName: this.allBenifisaryDetails.beneficiaryFirstName,
          beneficiaryLastName: this.allBenifisaryDetails.beneficiaryLastName,
          code1: this.allBenifisaryDetails.contactId,
          contactNumber: this.allBenifisaryDetails.contactNumber,
          code2: this.allBenifisaryDetails.mobileCountryCode,
          mobileNumber: this.allBenifisaryDetails.beneficiaryMobileNumber,
          address: this.allBenifisaryDetails.beneficiaryAddress,
          dateOfBirth: this.allBenifisaryDetails.dateOfBirth
            ? this.allBenifisaryDetails.dateOfBirth
            : null,
          placeOfBirth: this.allBenifisaryDetails.beneficiaryPlaceOfBirth,
          nationality: this.allBenifisaryDetails.nationalityDetailId,
          companyName: this.allBenifisaryDetails.beneficiaryFirstName,
          country:
            this.dataservice.saveAllTransactionData.beneficiaryBankCountryId,
          // ? this.dataservice.saveAllTransactionData.beneficiaryCountryId
          // : this.dataservice.saveAllTransactionData.beneficiaryCountry,
          bankName: this.dataservice.saveAllTransactionData.beneficiaryBankName,
          accountNumber:
            this.dataservice.saveAllTransactionData.beneficiaryAccountNumber,
          branchName:
            this.dataservice.saveAllTransactionData.beneficiaryBankBranch,
          supportCurrency:
            this.dataservice.saveAllTransactionData.bankCurrencyId,
          // bankcodes:
          //   this.dataservice.saveAllTransactionData.beneficiaryCountry ==
          //   'Sri Lanka'
          //     ? null
          //     : this.dataservice.saveAllTransactionData.beneficiaryBankCode,
          swiftCode:
            this.dataservice.saveAllTransactionData.beneficiarySwiftCode,
          isCoporate:
            this.dataservice.saveAllTransactionData.isCoporateBeneficiary,
        });

        this.getCustomerReceivingCountries(
          this.dataservice.saveAllTransactionData.beneficiaryBankCountryId
        );
      });
  }
  updateBnifisaryDetails() {
    if (this.dataservice.isBenifisaryEditable === true) {
      if (this.isCoporate === false) {
        this.accountTypeChange();
        this.checkFromFieldValidate();
        if (!this.beneficiaryDetailsForm.valid) {
          return this.validateAllFormFields(this.beneficiaryDetailsForm);
        } else {
          const formdata: any = {
            agentBeneficiaryDetailsId:
              this.dataservice.saveAllTransactionData.agentBeneficiaryDetailsId,
            beneficiaryFirstName: this.beneficiaryFirstName?.value?.trim(),
            beneficiaryLastName: this.beneficiaryLastName?.value?.trim(),
            contactId: this.code1?.value,
            contactNumber: this.contactNumber?.value,
            mobileId: this.code2?.value,
            mobileNumber: this.mobileNumber?.value,
            address: this.address?.value?.trim(),
            dateOfBirth: this.dateOfBirth?.value,
            nationalityDetailsId: this.SelectNationalityId
              ? this.SelectNationalityId
              : null,
            placeOfBirth: this.placeOfBirth?.value?.trim(),
            clientCountryId:
              this.dataservice.saveAllTransactionData.clientCountryId,
            isCoporateBeneficiary: this.isCoporate,
            agentSenderDetailsDto: {
              agentSenderDetailsId:
                this.dataservice.saveAllTransactionData.agentSenderDetailsId,
            },
            isActive: true,
          };

          this.myTansactionService
            .updateBenifisaryDtails(formdata)
            .subscribe((res: any) => {
              if (res['responseDto']) {
                const msg = res['responseDto']['msg'];
                const id = res['responseDto']['id'];

                this.notificationService.create('success', 'Success', msg, {
                  nzStyle: { background: '#00A03E', color: '#fff' },
                });
                this.getCostomerTransactionDetails();
                this.eventTriggerService.onReloadServiceData('benUpdated');
              } else if (res['errorDescription']) {
                const msg = res['errorDescription'];
                this.notificationService.create('error', 'Error', msg, {
                  nzStyle: { background: '#cc2d2d', color: '#fff' },
                });
              }
            });
        }
      } else {
        this.accountTypeChange();
        this.checkFromFieldValidate();
        if (!this.beneficiaryDetailsForm.valid) {
          return this.validateAllFormFields(this.beneficiaryDetailsForm);
        } else {
          const formdata: any = {
            agentBeneficiaryDetailsId:
              this.dataservice.saveAllTransactionData.agentBeneficiaryDetailsId,
            beneficiaryFirstName: this.beneficiaryFirstName?.value?.trim(),
            contactId: this.codeId,
            contactNumber: this.contactNumber?.value,
            mobileId: this.codeId2,
            mobileNumber: this.mobileNumber?.value,
            address: this.address?.value?.trim(),
            clientCountryId:
              this.dataservice.saveAllTransactionData.clientCountryId,
            isCoporateBeneficiary: this.isCoporate,
            agentSenderDetailsDto: {
              agentSenderDetailsId:
                this.dataservice.saveAllTransactionData.agentSenderDetailsId,
            },
            isActive: true,
          };

          this.myTansactionService
            .updateBenifisaryDtails(formdata)
            .subscribe((res: any) => {
              if (res['responseDto']) {
                const msg = res['responseDto']['msg'];
                this.notificationService.create('success', 'Success!', msg, {
                  nzStyle: { background: '#00A03E', color: '#fff' },
                });
                this.eventTriggerService.onReloadServiceData('benUpdated');
                this.getCostomerTransactionDetails();
              } else {
                this.notificationService.create(
                  'error',
                  'Error',
                  'Agent beneficiary details updated Fail'
                );
              }
            });
        }
      }
    }
  }

  updateBankAccount() {
    if (this.dataservice.isBenifisaryBankEditable === true) {
      this.accountTypeChange();
      this.checkFromFieldValidate();
      if (!this.beneficiaryDetailsForm.valid) {
        return this.validateAllFormFields(this.beneficiaryDetailsForm);
      } else {
        const data: any = {};
        data['exposableId'] = this.dataservice.exposableId;
        data['countryId'] = this.supportCurrency?.value
          ? this.supportCurrency?.value
          : this.dataservice.saveAllTransactionData.clientCountryId;
        data['transactionDtailsId'] =
          this.dataservice.saveAllTransactionData.agentTransactionDetailId;
        const formdata: any = {
          beneficiaryDetailsId:
            this.dataservice.saveAllTransactionData.agentBeneficiaryDetailsId,
          bankName:
            this.bankName?.value != null
              ? this.bankName?.value?.trim()
              : this.dataservice.saveAllTransactionData.beneficiaryBankName?.trim(),
          branchName:
            this.branchName?.value != null
              ? this.branchName?.value?.trim()
              : this.dataservice.saveAllTransactionData.beneficiaryBankBranch?.trim(),
          accountNumber:
            this.accountNumber?.value != null
              ? this.accountNumber?.value?.trim()
              : this.dataservice.saveAllTransactionData.beneficiaryContactNumber?.trim(),
          clientCurrencyId: this.supportCurrency?.value,
          swiftCode:
            this.swiftCode?.value != null
              ? this.swiftCode?.value?.trim()
              : this.dataservice.saveAllTransactionData.beneficiarySwiftCode?.trim(),
          bankCode: this.bankcodes?.value
            ? this.bankcodes?.value?.trim()
            : this.dataservice.saveAllTransactionData.beneficiaryBankCode?.trim(),
          label4: this.ifsc?.value
            ? this.ifsc?.value?.trim()
            : this.dataservice.saveAllTransactionData.beneficiarylabel4?.trim(),
          routingNumber: this.routingNumber?.value
            ? this.routingNumber.value?.trim()
            : this.dataservice.saveAllTransactionData.beneficiaryRoutingNumber?.trim(),
          label6: this.transitNumber?.value
            ? this.transitNumber?.value?.trim()
            : this.dataservice.saveAllTransactionData.beneficiarylabel6?.trim(),
          label5: this.transitNumber?.value
            ? this.transitNumber?.value?.trim()
            : this.dataservice.saveAllTransactionData.beneficiarylabel5?.trim(),
        };

        this.myTansactionService
          .updateBenifisaryBankDetails(data, formdata)
          .subscribe((res: any) => {
            if (res['responseDto']) {
              const msg = res['responseDto']['message'];
              this.notificationService.create('success', 'Success', msg, {
                nzStyle: { background: '#00A03E', color: '#fff' },
              });
            } else if (res['errorDescription']) {
              const msg = res['errorDescription'];
              this.notificationService.create('error', 'Error', msg, {
                nzStyle: { background: '#cc2d2d', color: '#fff' },
              });
            } else {
              this.notificationService.create(
                'error',
                'Error',
                'Agent beneficiary details updated Fail'
              );
            }
          });
      }
    }
  }

  getCostomerTransactionDetails() {
    const data: any = {};
    data['agentTransactionDetailId'] = this.mode.agentTransactionDetailId;
    this.myTansactionService
      .getcustomerTransactionDetails(data)
      .subscribe((res: any) => {
        this.AllTransactionData = res['responseDto'];
        this.transferNumber = res['responseDto']['invoiceTransferNumber'];
        this.dataservice.newBenifisaryNames = {
          bFirstname: res['responseDto']['beneficiaryFirstName'],
          bLastname: res['responseDto']['beneficiaryLastName'],
        };
        console.log(
          'benifisary supportCurrency',
          this.AllTransactionData.bankCurrencyId
        );
        this.beneficiaryDetailsForm.patchValue({
          supportCurrency: this.AllTransactionData.bankCurrencyId,
        });
      });
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
      this.nationality!.setValidators(null);
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

  onChangeCountry(value: any) {
    // this.clearBankDetails();

    // const selectedCountryType = this.allReceivingCountry.find(
    //   (CountryValue: any) => CountryValue.countryName === value
    // );
    // if (selectedCountryType) {
    //   this.CountryType = selectedCountryType.countryId;
    // }

    // this.getCustomerReceivingCountries();

    if (this.country!.value.countryDto.countryName === 'Sri Lanka') {
      this.isSriLankan = true;
      this.bankName!.setValidators(null);
      this.bankcodes!.setValidators(null);

      this.bankName!.updateValueAndValidity();
      this.bankcodes!.updateValueAndValidity();

      this.bank!.setValidators(Validators.required);
      this.bank!.updateValueAndValidity();

      this.swiftCode!.setValidators(null);
      this.swiftCode!.updateValueAndValidity();

      // this.getBankDetails();
    } else {
      this.isSriLankan = false;
      this.bank!.setValidators(null);
      this.bank!.updateValueAndValidity();

      this.bankName!.setValidators(Validators.required);
      this.bankcodes!.setValidators(Validators.required);
      this.swiftCode!.setValidators(Validators.required);
    }

    if (this.country!.value) {
      this.bankCodeLabel = this.country!.value.countryDto.bankCodeLabel;
      this.swiftCodeLabel = this.country!.value.countryDto.swiftCodeLabel;
      this.routingNumberLabel =
        this.country!.value.countryDto.routingNumberLabel;
      this.label4 = this.country!.value.countryDto.label4;
      this.label5 = this.country!.value.countryDto.label5;
      this.label6 = this.country!.value.countryDto.label6;
    }
  }

  numberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  disabledDate = (current: NzSafeAny): boolean => {
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - 18); // set the maximum allowed date to 16 years ago
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
      this.notificationService.create(
        'error',
        'Age can not be below 16 years',
        '#cc2d2d'
      );
      this.isDateOfBirthValid = false;
    } else {
      this.isDateOfBirthValid = true;
    }
  }
}
