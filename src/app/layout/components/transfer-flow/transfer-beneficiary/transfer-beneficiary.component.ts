import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CustomValidators } from 'src/app/_helpers/validators/custom-validators';
import { DataService } from 'src/app/_services/shared-data/data.service';
import { ViewBeneficiaryModalComponent } from '../../my-beneficiaries/view-beneficiary-modal/view-beneficiary-modal.component';
import { TransferFlow2Service } from 'src/app/_services/transfer-flow2.service';
import { Subject, takeUntil } from 'rxjs';
import { CommonService } from 'src/app/_services/common.service';
import { TokenService } from 'src/app/_services/token.service';
import { TranferFlowService } from 'src/app/_services/tranfer-flow.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { format } from 'date-fns';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { TokenStorageServiceService } from 'src/app/_services/token-storage-service.service';
import { CorporateAccountsChangeService } from 'src/app/_services/corporate-accounts-change.service';
import { MyValidators } from 'src/app/_validators/custom-validator';

@Component({
  selector: 'app-transfer-beneficiary',
  templateUrl: './transfer-beneficiary.component.html',
  styleUrls: ['./transfer-beneficiary.component.sass'],
})
export class TransferBeneficiaryComponent {
  @Input() formGroupName!: string;
  @Input() mode: any;
  @Input() index: any;
  @Output() GonextPage: EventEmitter<any> = new EventEmitter<any>();

  public transferBeneficiaryDetailsForm!: FormGroup;
  current = 0;
  // index = 1;
  count = 1;

  isBeneficiaryAvailable = false; // please check after integration
  showAddNewButtons = true; // please check after integration
  hideDateOfBirthField = false; // please check after integration
  isBeneficiaryEditable = false; // please check after integration
  isMobileWallet = false; // please check after integration
  isAddBankBranch = false;
  isBankDepoist = false;
  isOutlet = false;
  isSwiftCodeLable = false;
  isRoutingNumberLable = false;

  agntRecivingCountries: any;
  agentUser: any;
  exposableId: any;
  agentSenderDetailsId: any;
  allExcitingBenificary: any;
  allReffernces: any;
  countryCodeType: any;
  CountryType: any;
  allExistingBankDetails: any;
  // isCorporate = true;
  isCoporate = false;
  receivingCurrencies: any;
  hidebank = true;
  public distroy$ = new Subject<void>();

  countyCodes: any;
  allNationality: any;

  isNewBenificary = false;
  existingBankDetails: any;
  selectBenificaryDetails: any;

  addDeatailsTrue = false;
  indexValue = 1;

  goNext = false;
  allLastData: any;
  BenificaryName: any;
  referenceSelectName: any;
  allExistingAllBankDetails: any;
  allExistingLankaBankDetails: any;
  selectBenifisaryId: any;
  tableShow = false;
  srilankaBanks = true;
  SelectbranchName: any;
  BankCode: any;
  SelectCountryId: any;
  onlyBenifisary = true;
  selectedBanks: any;
  radioValue: any = null;
  selectedbankId: any;
  isCashPickUp = false;
  //banklables for bank fields
  bankcodeLable: any;
  swiftCodeLabel: any;
  isIban = false;
  isBankCode = false;
  IsSrilanka = true;
  isIfsc = false;
  isbranchCode = false;
  isTableBank = false;

  IfsccodeLable: any;
  IbanCodeLable: any;
  BranchCodeLable: any;

  isRoutingNumber = false;
  isRoutingNumber1 = false;
  routingNumberLabel: any;
  isRoutingNumberLabel = false;
  isTransitNumber = false;
  isCnapsCode = false;
  isSwiftCode = false;
  afterClickBank = true;
  pageNumber = 1;
  pageSize = 1000;
  provideReason = false;
  referenceCodeSelectName: any;
  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private modalService: NzModalService,
    private rootFormDirction: FormGroupDirective,
    private transferFlow2Service: TransferFlow2Service,
    private commonService: CommonService,
    private tokenService: TokenService,
    private tranferFlowService: TranferFlowService,
    private notificationService: NzNotificationService,
    private tokenStorageService: TokenStorageServiceService,
    private corporateAccountsChangeService: CorporateAccountsChangeService
  ) {
    this.agentUser = this.commonService.parseJwt(tokenService.getToken());
    this.dataService.userId_new = this.agentUser.user_id;
    console.log(
      'new client currency Id chcking',
      this.dataService.newBankCliendcurrencId
    );
  }

  ngOnInit() {
    const {
      required,
      customRequired,
      maxLength,
      minLength,
      customEmail,
      characterLength,
      pattern,
      alphanumericPattern,
      exactLength,
      specificPattern,
    } = MyValidators;

    this.transferBeneficiaryDetailsForm = this.rootFormDirction.control!.get(
      this.formGroupName
    ) as FormGroup;
    this.getAgentRceivingCountries();
    this.getExposableId();
    if (this.dataService.ModeOfService == 'Cash Pickup') {
      this.isCashPickUp = true;
    }
    this.transferBeneficiaryDetailsForm
      .get('recipientCountry')!
      .valueChanges.pipe(takeUntil(this.distroy$))
      .subscribe((selectedCountryTypes: any) => {
        const selectedCountryType = this.agntRecivingCountries?.find(
          (CountryValue: any) =>
            CountryValue.referenceCountryCode === selectedCountryTypes
        );
        if (selectedCountryType) {
          this.CountryType = selectedCountryType.countryId;

          this.dataService.CountryType = this.CountryType;
        }
      });

    this.transferBeneficiaryDetailsForm
      .get('beneficiaryFullName')!
      .valueChanges.pipe(takeUntil(this.distroy$))
      .subscribe((selectedCountryTypes: any) => {
        const selectedCountryType = this.allExcitingBenificary?.find(
          (CountryValue: any) =>
            CountryValue.agentBeneficiaryDetailsId === selectedCountryTypes
        );
        if (selectedCountryType) {
          if (selectedCountryType.beneficiaryLastName) {
            this.BenificaryName =
              selectedCountryType.beneficiaryFirstName +
              '  ' +
              selectedCountryType.beneficiaryLastName;

            this.dataService.benificaryfirstNameNew = this.BenificaryName;
          } else {
            this.BenificaryName = selectedCountryType.beneficiaryFirstName;
            this.dataService.benificaryfirstNameNew = this.BenificaryName;
          }

          this.selectBenifisaryId =
            selectedCountryType.agentBeneficiaryDetailsId;
        }
      });

    if (this.beneficiaryFullName!.value != null) {
      this.isNewBenificary = false;
    } else {
      this.tableShow = false;
      this.isNewBenificary = true;
      this.showAddNewButtons = true;
    }

    this.getAllcountryCode();
    this.getAllNationalitys();

    this.showAddNewButtons = true;
    if (this.dataService.mytransactionNew === false) {
      this.companyName?.disable();
      this.benificaryfirstName?.disable();
      this.benificarylastName?.disable();
      this.code1?.disable();
      this.contactNumber?.disable();
      this.code2?.disable();
      this.mobilecontactNumber?.disable();
      this.address?.disable();
      this.dateOfBirth?.disable();
      this.placeOfBirth?.disable();
      this.nationality?.disable();
      this.nationality?.disable();
      this.supportCurrency?.disable();
    }

    this.transferBeneficiaryDetailsForm.patchValue({
      supportCurrency: this.dataService.AllFinalDataFirstStep.recipientCurrency,
    });

    if (this.dataService.goBack === false) {
      this.dataService.existingBankId = null;
    } else if (this.dataService.goBack === true) {
      this.selectedbankId = this.dataService.existingBankId;
    }
    this.getBankDetailsExisting(this.dataService.SelectBankLakna);
    this.getAllBankDetailsExisting(this.dataService.benificaryDetailsId);

    if (this.dataService.reffrenceValue !== null) {
      this.getReffernces(this.dataService.reffrenceValue);
    }

    this.isCoporate = this.dataService.newIsCorporate;
    this.referenceSelectName = this.dataService.newReffernce;

    this.CountryType = this.dataService.CountryType;

    if (this.recipientCountry!.value) {
      this.BenificaryName =
        this.dataService.benificaryfirstNameNew +
        ' ' +
        this.dataService.benificaryfirstNameNew;
    }

    if (this.reference?.value == 164) {
      this.provideReason = true;
    } else {
      this.provideReason = false;
    }

    if (this.dataService.goBack === true) {
      this.getAllBenificaryDetaisl();
      this.getAllBenificaryDetails(
        this.dataService.benificaryDetailsId
          ? this.dataService.benificaryDetailsId
          : this.dataService.newBankBenifisaryId
      );
      this.gopreviospage();
      this.getCustomerReceivingCountries();
      this.transferBeneficiaryDetailsForm.get('beneficiaryFullName')?.enable();
      this.saveAllBenifisacryStepData();
    }

    if (this.isCoporate === false) {
      this.benificaryfirstName!.setValidators(
        Validators.compose([
          Validators.required,
          MyValidators.characterLength('First Name', 25),
        ])
      );
      this.benificaryfirstName?.updateValueAndValidity();
      this.benificarylastName!.setValidators(
        Validators.compose([
          Validators.required,
          MyValidators.characterLength('Last Name', 25),
        ])
      );

      this.benificarylastName?.updateValueAndValidity();
      this.companyName!.setValidators([]);
      this.companyName?.updateValueAndValidity();
    } else if (this.isCoporate === true) {
      this.companyName!.setValidators(
        Validators.compose([
          Validators.required,
          MyValidators.characterLength('Company Name', 25),
        ])
      );
      this.companyName!.updateValueAndValidity();
      this.benificaryfirstName!.setValidators([]);
      this.benificaryfirstName?.updateValueAndValidity();
      this.benificarylastName!.setValidators([]);
      this.benificarylastName?.updateValueAndValidity();
    }
  }

  get companyName() {
    return this.transferBeneficiaryDetailsForm?.get('companyName');
  }
  get benificaryfirstName() {
    return this.transferBeneficiaryDetailsForm?.get('benificaryfirstName');
  }
  get benificarylastName() {
    return this.transferBeneficiaryDetailsForm?.get('benificarylastName');
  }
  get code1() {
    return this.transferBeneficiaryDetailsForm?.get('code1');
  }
  get contactNumber() {
    return this.transferBeneficiaryDetailsForm?.get('contactNumber');
  }
  get code2() {
    return this.transferBeneficiaryDetailsForm?.get('code2');
  }
  get mobilecontactNumber() {
    return this.transferBeneficiaryDetailsForm?.get('mobilecontactNumber');
  }
  get address() {
    return this.transferBeneficiaryDetailsForm?.get('address');
  }
  get dateOfBirth() {
    return this.transferBeneficiaryDetailsForm?.get('dateOfBirth');
  }
  get placeOfBirth() {
    return this.transferBeneficiaryDetailsForm?.get('placeOfBirth');
  }
  get nationality() {
    return this.transferBeneficiaryDetailsForm?.get('nationality');
  }
  get bankName() {
    return this.transferBeneficiaryDetailsForm?.get('bankName');
  }
  get accNo() {
    return this.transferBeneficiaryDetailsForm?.get('accNo');
  }
  get branchName() {
    return this.transferBeneficiaryDetailsForm?.get('branchName');
  }
  get supportCurrency() {
    return this.transferBeneficiaryDetailsForm?.get('supportCurrency');
  }
  get swiftCode() {
    return this.transferBeneficiaryDetailsForm?.get('swiftCode');
  }
  get beneficiaryFullName() {
    return this.transferBeneficiaryDetailsForm?.get('beneficiaryFullName');
  }
  get recipientCountry() {
    return this.transferBeneficiaryDetailsForm?.get('recipientCountry');
  }
  get reference() {
    return this.transferBeneficiaryDetailsForm?.get('reference');
  }
  get referenceOther() {
    return this.transferBeneficiaryDetailsForm?.get('referenceOther');
  }
  get bankcodes() {
    return this.transferBeneficiaryDetailsForm?.get('bankcodes');
  }
  get iban() {
    return this.transferBeneficiaryDetailsForm?.get('iban');
  }
  get ifsc() {
    return this.transferBeneficiaryDetailsForm?.get('ifsc');
  }
  get routingNumber() {
    return this.transferBeneficiaryDetailsForm?.get('routingNumber');
  }
  get transitNumber() {
    return this.transferBeneficiaryDetailsForm?.get('transitNumber');
  }
  get cnapsCode() {
    return this.transferBeneficiaryDetailsForm?.get('cnapsCode');
  }

  get bankRadio() {
    return this.transferBeneficiaryDetailsForm?.get('bankRadio');
  }

  getAllcountryCode() {
    this.transferFlow2Service
      .getAllCountryCodes()
      .pipe(takeUntil(this.distroy$))
      .subscribe((res: any) => {
        if (res['responseDto']) {
          this.countyCodes = res['responseDto'];
        }
      });
  }

  getRecipientCurrencies(value: any) {
    const data: any = {};
    data['exposableId'] = value;
    this.tranferFlowService
      .getAgentReceivingCurrency(data)
      .pipe(takeUntil(this.distroy$))
      .subscribe((res: any) => {
        if (res) {
          this.receivingCurrencies = res['responseDto'];
        }
      });
  }

  getAllNationalitys() {
    this.transferFlow2Service
      .getAllgetNationality()
      .pipe(takeUntil(this.distroy$))
      .subscribe((res: any) => {
        if (res['responseDto']) {
          this.allNationality = res['responseDto'];
        }
      });
  }

  getExistingBankAccountDetails() {
    const data: any = {};
    data['BeneficiaryDetailsId'] = 1;
    data['countryId'] = this.CountryType;
    data['agentTransferApprovedSendingReceivingCurrenciesId'] =
      this.mode.recevingCurrency;

    this.transferFlow2Service
      .getExistingBenificaryBankDetails(data)
      .subscribe((res: any) => {
        if (res['responseDto'] != null) {
          this.existingBankDetails = res['responseDto'];
          this.hidebank = false;
        }
        this.hidebank = true;
      });
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);

      if (control instanceof FormControl) {
        if (control!.invalid) {
          control!.markAsDirty();
          control!.updateValueAndValidity({ onlySelf: true });
          const fieldName = this.getFieldName(field);
          this.notificationService.create(
            'error',
            'Input Error',
            fieldName + ' cannot be empty',
            { nzStyle: { background: '#cc2d2d', color: '#fff' } }
          );
        }
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  getFieldName(option: any): any {
    switch (option) {
      case 'companyName': {
        return 'company Name';
      }
      case 'benificaryfirstName': {
        return 'benificary first Name';
      }
      case 'benificarylastName': {
        return 'benificary last Name';
      }
      case 'code1': {
        return 'Country Code';
      }
      case 'contactNumber': {
        return 'contact Number';
      }
      case 'code2': {
        return 'Country Code';
      }
      case 'mobilecontactNumber': {
        return 'mobile contact Number';
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
      case 'bankName': {
        return 'BankName';
      }
      case 'accNo': {
        return 'Account Number';
      }
      case 'branchName': {
        return 'Branch Name';
      }
      case 'supportCurrency': {
        return 'supportCurrency';
      }
      case 'swiftCode': {
        return 'Swift Code';
      }
      case 'reference': {
        return 'Reference';
      }
      case 'referenceOther': {
        return 'Reference';
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
      case 'recipientCountry': {
        return 'recipient Country';
      }
      case 'beneficiaryFullName': {
        return 'beneficiary Name';
      }
    }
  }

  searchBannkDetails(selectBankName: any) {
    const selectedBankObject = this.allExistingLankaBankDetails?.find(
      (bank: any) => bank.bankname === selectBankName
    );

    if (selectedBankObject) {
      // Retrieve the branch name of the selected bank
      this.SelectbranchName = selectedBankObject.branchName;
      this.BankCode = selectedBankObject.bankCode;
    }
  }

  selectbankDetailsId(value: any) {
    this.dataService.existingBankId = value;
    this.dataService.newBankDetailsId = null;
  }

  getCustomerReceivingCountries() {
    if (this.recipientCountry!.value) {
      const data: any = [];
      data['clientcurrencyid'] = this.CountryType
        ? this.CountryType
        : this.dataService.SelectCountryId;
      this.transferFlow2Service
        .getAgentReceivingCountries(data)
        .subscribe((res: any) => {
          if (res['responseDto']) {
            const refferenceCode = res['responseDto']['referenceCountryCode'];
            this.bankcodeLable = res['responseDto']['bankCodeLabel'];
            this.swiftCodeLabel = res['responseDto']['swiftCodeLabel'];
            this.routingNumberLabel = res['responseDto']['routingNumberLabel'];
            this.IfsccodeLable = res['responseDto']['label4'];
            this.IbanCodeLable = res['responseDto']['label5'];
            this.BranchCodeLable = res['responseDto']['label6'];

            if (this.IfsccodeLable === 'IFSC') {
              this.isIfsc = true;
            } else {
              this.isIfsc = false;
            }
            if (this.IbanCodeLable === 'IBAN') {
              this.isIban = true;
            } else {
              this.isIban = false;
            }
            if (this.BranchCodeLable != null) {
              this.isTransitNumber = true;
            } else {
              this.isTransitNumber = false;
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
              if (refferenceCode === 'LK') {
                this.isBankCode = false;
                this.isTableBank = true;
              } else {
                this.isBankCode = true;
                this.isTableBank = false;
              }
            } else {
              this.isBankCode = false;
            }

            this.selectBankDetailsValidations();
            this.swiftCodeValidation();
          }
        });
    }
  }

  checkAddBnifisaryOrNot() {
    if (
      this.transferBeneficiaryDetailsForm?.get('beneficiaryFullName')?.value ===
        null &&
      this.dataService.failBenifisary === true
    ) {
      this.addNewBenificary();
    } else {
      this.dataService.goNext1 = true;
    }
  }

  failBankDetailsAdd() {
    if (
      this.dataService.failBankAdd === true &&
      this.dataService.failBenifisary === false
    ) {
      this.addNewBank();
    }
  }

  checkBankDetailsAddorNot() {
    if (
      this.transferBeneficiaryDetailsForm?.get('beneficiaryFullName')?.value !=
      null
    ) {
      if (
        this.tableShow === true &&
        this.dataService.existingBankId === null &&
        this.dataService.ModeOfService !== 'Cash Pickup'
      ) {
        this.notificationService.create(
          'error',
          'Error',
          'please select a bank',
          {
            nzStyle: {
              background: '#cc2d2d',
              color: '#ffffff',
            },
          }
        );
      } else if (this.tableShow === false) {
        if (this.isOutlet === false) {
          this.notificationService.create(
            'error',
            'Error',
            'please create a bank',
            {
              nzStyle: {
                background: '#cc2d2d',
                color: '#ffffff',
              },
            }
          );
        } else {
          this.addNewBank();
        }
      } else if (this.tableShow === true) {
        if (this.reference!.valid && this.referenceOther!.valid) {
          this.dataService.goNext2 = true;
          this.GonextPage.emit();
        } else if (this.reference!.valid && !this.referenceOther!.valid) {
          {
            this.notificationService.create(
              'error',
              'Error',
              'Reffernce Other Cannot be Null',
              {
                nzStyle: {
                  background: '#cc2d2d',
                  color: '#ffffff',
                },
              }
            );
          }
        } else {
          this.notificationService.create(
            'error',
            'Error',
            'Reffernce Cannot be Null',
            {
              nzStyle: {
                background: '#cc2d2d',
                color: '#ffffff',
              },
            }
          );
        }
      }
    }
  }

  addNewBenificary() {
    if (this.isCoporate === false) {
      this.companyName!.setValidators([]);
      this.companyName!.updateValueAndValidity();
      this.benificaryfirstName!.setValidators(
        Validators.compose([
          Validators.required,
          MyValidators.characterLength('First Name', 25),
        ])
      ),
        this.benificaryfirstName!.updateValueAndValidity();
      this.benificarylastName!.setValidators(
        Validators.compose([
          Validators.required,
          MyValidators.characterLength('Last Name', 25),
        ])
      );
      this.benificarylastName!.updateValueAndValidity();
      this.recipientCountry!.setValidators([Validators.required]);
      this.recipientCountry!.updateValueAndValidity();
      this.beneficiaryFullName!.setValidators([Validators.required]);
      this.beneficiaryFullName!.updateValueAndValidity();
      this.reference!.setValidators([Validators.required]);
      this.reference!.updateValueAndValidity();

      if (this.isOutlet === false) {
        this.bankName!.setValidators([Validators.required]);
        this.bankName!.updateValueAndValidity();
        this.accNo!.setValidators(
          Validators.compose([Validators.required, MyValidators.maxLength(30)])
        );
        this.accNo!.updateValueAndValidity();
        this.branchName!.setValidators(
          Validators.compose([
            Validators.required,
            MyValidators.alphanumericPattern(5, 35),
          ])
        );
        this.branchName!.updateValueAndValidity();
        this.recipientCountry!.setValidators([Validators.required]);
        this.recipientCountry!.updateValueAndValidity();
        this.beneficiaryFullName!.setValidators([Validators.required]);
        this.beneficiaryFullName!.updateValueAndValidity();
        this.benificaryfirstName!.updateValueAndValidity();
        this.benificarylastName!.setValidators(
          Validators.compose([
            Validators.required,
            MyValidators.characterLength('Last Name', 25),
          ])
        );
        this.benificaryfirstName!.setValidators(
          Validators.compose([
            Validators.required,
            MyValidators.characterLength('First Name', 25),
          ])
        );
        this.benificarylastName!.updateValueAndValidity();
        this.dateOfBirth!.setValidators(
          Validators.compose([Validators.required])
        );
        this.dateOfBirth!.updateValueAndValidity();
        this.placeOfBirth!.setValidators(
          Validators.compose([Validators.required])
        );
        this.placeOfBirth!.updateValueAndValidity();
        this.nationality!.setValidators(null);
        this.nationality!.updateValueAndValidity();
        this.selectBankDetailsValidations();
        this.swiftCodeValidation();
      }
      if (this.isOutlet === true) {
        this.bankName!.setValidators([Validators.required]);
        this.bankName!.updateValueAndValidity();
        this.accNo!.setValidators(
          Validators.compose([Validators.required, MyValidators.maxLength(30)])
        );
        this.accNo!.updateValueAndValidity();
        this.branchName!.setValidators(
          Validators.compose([
            Validators.required,
            MyValidators.alphanumericPattern(5, 35),
          ])
        );
        this.branchName!.updateValueAndValidity();
        this.recipientCountry!.setValidators([Validators.required]);
        this.recipientCountry!.updateValueAndValidity();
        this.beneficiaryFullName!.setValidators([Validators.required]);
        this.beneficiaryFullName!.updateValueAndValidity();
        this.benificaryfirstName!.updateValueAndValidity();
        this.benificaryfirstName!.setValidators(
          Validators.compose([
            Validators.required,
            MyValidators.characterLength('First Name', 25),
          ])
        );
        this.benificarylastName!.setValidators(
          Validators.compose([
            Validators.required,
            MyValidators.characterLength('Last Name', 25),
          ])
        );
        this.benificarylastName!.updateValueAndValidity();
        this.dateOfBirth!.setValidators(
          Validators.compose([Validators.required])
        );
        this.dateOfBirth!.updateValueAndValidity();
        this.placeOfBirth!.setValidators(
          Validators.compose([Validators.required])
        );
        this.placeOfBirth!.updateValueAndValidity();
        this.nationality!.setValidators(null);
        this.nationality!.updateValueAndValidity();
      }

      if (!this.transferBeneficiaryDetailsForm.valid) {
        return this.validateAllFormFields(this.transferBeneficiaryDetailsForm);
      } else {
        const formdata = {
          beneficiaryFirstName: this.benificaryfirstName?.value?.trim(),
          beneficiaryLastName: this.benificarylastName?.value?.trim(),
          contactId: this.code1?.value,
          contactNumber: this.contactNumber?.value,
          mobileId: this.code2?.value,
          mobileNumber: this.mobilecontactNumber?.value,
          address: this.address?.value?.trim(),
          dateOfBirth: this.dateOfBirth?.value,
          nationalityDetailsId: this.nationality?.value,
          placeOfBirth: this.placeOfBirth?.value?.trim(),
          clientCountryId: this.CountryType,
          isCoporateBeneficiary: false,
          agentSenderDetailsDto: {
            agentSenderDetailsId: this.agentSenderDetailsId,
          },
          isActive: true,
        };

        this.transferFlow2Service
          .saveNewBenificary(formdata)
          .pipe(takeUntil(this.distroy$))
          .subscribe((res: any) => {
            if (res['responseDto']) {
              const msg = res['responseDto']['msg'];
              this.notificationService.create('success', 'Success', msg, {
                nzStyle: {
                  background: '#00A03E',
                  color: '#ffffff',
                },
              });
              const id = res['responseDto']['id'];
              this.dataService.newBankBenifisaryId = res['responseDto']['id'];

              this.dataService.AllFinalDataSecondStep.BenificaryName = null;
              this.dataService.benificaryfirstName =
                this.benificaryfirstName?.value?.trim();
              this.dataService.benificarylastName =
                this.benificarylastName?.value?.trim();

              this.dataService.oneTimebenifisaryAdd = true;
              this.addNewBank();
              this.dataService.goNext1 = true;

              this.GonextPage.emit();
              this.dataService.failBenifisary = false;

              this.dataService.newIsCorporate = false;
            } else if (res['errorDescription']) {
              const msg = res['errorDescription'];
              this.notificationService.create('error', 'Error', msg, {
                nzStyle: {
                  background: '#cc2d2d',
                  color: '#ffffff',
                },
              });
            } else {
              this.notificationService.create(
                'error',
                'Error',
                'benificary added fail',
                {
                  nzStyle: {
                    background: '#cc2d2d',
                    color: '#ffffff',
                  },
                }
              );
            }
          });
      }
    } else if (this.isCoporate === true) {
      this.companyName!.setValidators(
        Validators.compose([
          Validators.required,
          MyValidators.characterLength('Company Name', 25),
        ])
      );
      this.companyName!.updateValueAndValidity();
      this.benificaryfirstName!.setValidators([]),
        this.benificaryfirstName!.updateValueAndValidity();
      this.benificarylastName!.setValidators([]);
      this.benificarylastName!.updateValueAndValidity();
      this.dateOfBirth!.setValidators([]);
      this.dateOfBirth!.updateValueAndValidity();
      this.placeOfBirth!.setValidators([]);
      this.placeOfBirth!.updateValueAndValidity();
      this.nationality!.setValidators([]);
      this.nationality!.updateValueAndValidity();
      this.recipientCountry!.setValidators([Validators.required]);
      this.recipientCountry!.updateValueAndValidity();
      this.beneficiaryFullName!.setValidators([Validators.required]);
      this.beneficiaryFullName!.updateValueAndValidity();
      this.reference!.setValidators([Validators.required]);
      this.reference!.updateValueAndValidity();

      if (this.isOutlet === false) {
        this.bankName!.setValidators([Validators.required]);
        this.bankName!.updateValueAndValidity();
        this.accNo!.setValidators(
          Validators.compose([Validators.required, MyValidators.maxLength(30)])
        );
        this.accNo!.updateValueAndValidity();
        this.branchName!.setValidators(
          Validators.compose([
            Validators.required,
            MyValidators.alphanumericPattern(5, 35),
          ])
        );
        this.branchName!.updateValueAndValidity();
        this.recipientCountry!.setValidators([Validators.required]);
        this.recipientCountry!.updateValueAndValidity();
        this.beneficiaryFullName!.setValidators([Validators.required]);
        this.beneficiaryFullName!.updateValueAndValidity();
        this.companyName!.setValidators(
          Validators.compose([
            Validators.required,
            MyValidators.characterLength('Company Name', 25),
          ])
        );
        this.companyName!.updateValueAndValidity();
        this.selectBankDetailsValidations();
        this.swiftCodeValidation();
      }
      if (this.isOutlet === true) {
        this.bankName!.setValidators([Validators.required]);
        this.bankName!.updateValueAndValidity();
        this.accNo!.setValidators(
          Validators.compose([Validators.required, MyValidators.maxLength(30)])
        );
        this.accNo!.updateValueAndValidity();
        this.branchName!.setValidators([Validators.required]);
        this.branchName!.updateValueAndValidity();
        this.branchName!.setValidators(
          Validators.compose([
            Validators.required,
            MyValidators.alphanumericPattern(5, 35),
          ])
        );
        this.branchName!.updateValueAndValidity();
        this.recipientCountry!.setValidators([Validators.required]);
        this.recipientCountry!.updateValueAndValidity();
        this.beneficiaryFullName!.setValidators([Validators.required]);
        this.beneficiaryFullName!.updateValueAndValidity();
        this.companyName!.setValidators(
          Validators.compose([
            Validators.required,
            MyValidators.characterLength('Company Name', 25),
          ])
        );
        this.companyName!.updateValueAndValidity();
      }

      if (!this.transferBeneficiaryDetailsForm.valid) {
        return this.validateAllFormFields(this.transferBeneficiaryDetailsForm);
      } else {
        const formdata = {
          beneficiaryFirstName: this.companyName?.value?.trim(),
          contactId: this.code1?.value,
          contactNumber: this.contactNumber?.value,
          mobileId: this.code2?.value,
          mobileNumber: this.mobilecontactNumber?.value,
          address: this.address?.value?.trim(),
          clientCountryId: this.CountryType,
          isCoporateBeneficiary: true,
          agentSenderDetailsDto: {
            agentSenderDetailsId: this.agentSenderDetailsId,
          },
          isActive: true,
        };

        this.transferFlow2Service
          .saveNewBenificary(formdata)
          .pipe(takeUntil(this.distroy$))
          .subscribe((res: any) => {
            if (res['responseDto']) {
              const msg = res['responseDto']['msg'];
              this.notificationService.create('success', 'Success', msg, {
                nzStyle: {
                  background: '#00A03E',
                  color: '#ffffff',
                },
              });
              const id = res['responseDto']['id'];
              this.dataService.newBankBenifisaryId = res['responseDto']['id'];
              this.dataService.benificaryfirstName = this.companyName?.value;
              this.dataService.goNext1 = true;
              this.dataService.oneTimebenifisaryAdd = true;
              this.dataService.AllFinalDataSecondStep.BenificaryName = null;

              this.addNewBank();
              this.GonextPage.emit();
              this.dataService.failBenifisary = false;

              this.dataService.newIsCorporate = true;
            } else if (res['errorDescription']) {
              const msg = res['errorDescription'];
              this.notificationService.create('success', 'Success', msg, {
                nzStyle: {
                  background: '#cc2d2d',
                  color: '#ffffff',
                },
              });
            } else {
              this.notificationService.create(
                'error',
                'Error',
                'benificary added fail',
                {
                  nzStyle: {
                    background: '#cc2d2d',
                    color: '#ffffff',
                  },
                }
              );
            }
          });
      }
    }
  }

  selectBankDetailsValidations() {
    if (this.isIban === true) {
      this.iban!.setValidators(
        Validators.compose([
          Validators.required,
          MyValidators.alphanumericPattern(15, 34),
        ])
      );
      this.iban!.updateValueAndValidity();
      this.ifsc!.setValidators([]);
      this.ifsc!.updateValueAndValidity();
      this.routingNumber!.setValidators([]);
      this.routingNumber!.updateValueAndValidity();
      this.transitNumber!.setValidators([]);
      this.transitNumber!.updateValueAndValidity();
      this.cnapsCode!.setValidators([]);
      this.cnapsCode!.updateValueAndValidity();
      this.bankcodes!.setValidators([]);
      this.bankcodes!.updateValueAndValidity();
    } else if (this.isBankCode === true) {
      this.bankcodes!.setValidators(
        Validators.compose([
          Validators.required,
          MyValidators.exactLength('Bank Code', 3),
        ])
      );
      this.bankcodes!.updateValueAndValidity();
      this.iban!.setValidators([]);
      this.iban!.updateValueAndValidity();
      this.ifsc!.setValidators([]);
      this.ifsc!.updateValueAndValidity();
      this.routingNumber!.setValidators([]);
      this.routingNumber!.updateValueAndValidity();
      this.transitNumber!.setValidators([]);
      this.transitNumber!.updateValueAndValidity();
      this.cnapsCode!.setValidators([]);
      this.cnapsCode!.updateValueAndValidity();
    } else if (this.isIfsc === true) {
      this.ifsc!.setValidators(
        Validators.compose([
          Validators.required,
          MyValidators.specificPattern(),
        ])
      );
      this.ifsc!.updateValueAndValidity();
      this.bankcodes!.setValidators([]);
      this.bankcodes!.updateValueAndValidity();
      this.iban!.setValidators([]);
      this.iban!.updateValueAndValidity();
      this.routingNumber!.setValidators([]);
      this.routingNumber!.updateValueAndValidity();
      this.transitNumber!.setValidators([]);
      this.transitNumber!.updateValueAndValidity();
      this.cnapsCode!.setValidators([]);
      this.cnapsCode!.updateValueAndValidity();
    } else if (this.isRoutingNumber === true) {
      this.routingNumber!.setValidators(
        Validators.compose([
          Validators.required,
          MyValidators.exactLength('Routing Number', 9),
        ])
      );
      this.routingNumber!.updateValueAndValidity();
      this.ifsc!.setValidators([]);
      this.ifsc!.updateValueAndValidity();
      this.bankcodes!.setValidators([]);
      this.bankcodes!.updateValueAndValidity();
      this.iban!.setValidators([]);
      this.iban!.updateValueAndValidity();
      this.transitNumber!.setValidators([]);
      this.transitNumber!.updateValueAndValidity();
      this.cnapsCode!.setValidators([]);
      this.cnapsCode!.updateValueAndValidity();
    } else if (this.isTransitNumber === true) {
      this.transitNumber!.setValidators(
        Validators.compose([
          Validators.required,
          MyValidators.exactLength('Branch Code', 5),
        ])
      );
      this.transitNumber!.updateValueAndValidity();
      this.routingNumber!.setValidators([]);
      this.routingNumber!.updateValueAndValidity();
      this.ifsc!.setValidators([]);
      this.ifsc!.updateValueAndValidity();
      this.bankcodes!.setValidators([]);
      this.bankcodes!.updateValueAndValidity();
      this.iban!.setValidators([]);
      this.iban!.updateValueAndValidity();
      this.cnapsCode!.setValidators([]);
      this.cnapsCode!.updateValueAndValidity();
    } else if (this.isCnapsCode === true) {
      this.cnapsCode!.setValidators([Validators.required]);
      this.cnapsCode!.updateValueAndValidity();
      this.transitNumber!.setValidators([]);
      this.transitNumber!.updateValueAndValidity();
      this.routingNumber!.setValidators([]);
      this.routingNumber!.updateValueAndValidity();
      this.ifsc!.setValidators([]);
      this.ifsc!.updateValueAndValidity();
      this.bankcodes!.setValidators([]);
      this.bankcodes!.updateValueAndValidity();
      this.iban!.setValidators([]);
      this.iban!.updateValueAndValidity();
    }
  }

  swiftCodeValidation() {
    if (this.isSwiftCode === true) {
      this.swiftCode!.setValidators([Validators.required]);
      this.swiftCode!.updateValueAndValidity();
    }
  }

  addNewBank() {
    if (this.isOutlet === true) {
      this.bankName!.setValidators([Validators.required]);
      this.bankName!.updateValueAndValidity();
      this.accNo!.setValidators(
        Validators.compose([Validators.required, MyValidators.maxLength(30)])
      );
      this.accNo!.updateValueAndValidity();
      this.branchName!.setValidators(
        Validators.compose([
          Validators.required,
          MyValidators.alphanumericPattern(5, 35),
        ])
      );
      this.branchName!.updateValueAndValidity();
      this.reference!.setValidators([Validators.required]);
      this.reference!.updateValueAndValidity();
      this.recipientCountry!.setValidators([Validators.required]);
      this.recipientCountry!.updateValueAndValidity();
      this.beneficiaryFullName!.setValidators([Validators.required]);
      this.beneficiaryFullName!.updateValueAndValidity();
      this.selectBankDetailsValidations();
      this.swiftCodeValidation();
      this.reference!.setValidators([Validators.required]);
      this.reference!.updateValueAndValidity();

      if (this.isCoporate === true) {
        this.companyName!.setValidators(
          Validators.compose([
            Validators.required,
            MyValidators.characterLength('Company Name', 25),
          ])
        );
        this.companyName!.updateValueAndValidity();
      } else if (this.isCoporate === false) {
        this.benificaryfirstName!.setValidators(
          Validators.compose([
            Validators.required,
            MyValidators.characterLength('First Name', 25),
          ])
        ),
          this.benificaryfirstName!.updateValueAndValidity();
        this.benificarylastName!.setValidators(
          Validators.compose([
            Validators.required,
            MyValidators.characterLength('Last Name', 25),
          ])
        );
        this.benificarylastName!.updateValueAndValidity();
        this.dateOfBirth!.setValidators(
          Validators.compose([Validators.required])
        );
        this.dateOfBirth!.updateValueAndValidity();
        this.placeOfBirth!.setValidators(
          Validators.compose([Validators.required])
        );
        this.placeOfBirth!.updateValueAndValidity();
        this.nationality!.setValidators(null);
        this.nationality!.updateValueAndValidity();
      }
      if (!this.transferBeneficiaryDetailsForm.valid) {
        return this.validateAllFormFields(this.transferBeneficiaryDetailsForm);
      } else {
        const data: any = {};
        data['exposableId'] = this.exposableId;
        data['countryId'] = this.CountryType;
        data['reqestType'] = 1;

        const formdata: any = {
          bankName: this.bankName!.value?.trim(),
          bankCode: this.srilankaBanks
            ? this.BankCode?.trim()
            : this.bankcodes?.value?.trim(),

          branchName: this.branchName?.value?.trim(),
          beneficiaryDetailsId: this.beneficiaryFullName?.value
            ? this.beneficiaryFullName?.value
            : this.dataService.newBankBenifisaryId,
          accountNumber: this.accNo?.value?.trim()
            ? this.accNo?.value?.trim()
            : undefined,
          swiftCode: this.swiftCode!.value ? this.swiftCode!.value : undefined,
          clientCurrencyId: this.supportCurrency!.value,

          countryId: this.CountryType,

          routingNumber: this.routingNumber?.value?.trim()
            ? this.routingNumber?.value?.trim()
            : undefined,
          label5: this.iban?.value?.trim()
            ? this.iban?.value?.trim()
            : undefined,
          label4: this.ifsc?.value?.trim()
            ? this.ifsc?.value?.trim()
            : undefined,
          label6: this.transitNumber?.value?.trim()
            ? this.transitNumber?.value?.trim()
            : undefined,
        };
        this.transferFlow2Service
          .addNewBank(data, formdata)
          .pipe(takeUntil(this.distroy$))
          .subscribe({
            next: (res: any) => {
              if (res['responseDto']) {
                const msg = res['responseDto']['message'];
                this.notificationService.create('success', 'Success', msg, {
                  nzStyle: {
                    background: '#00A03E',
                    color: '#ffffff',
                  },
                });

                this.dataService.newBankDetailsId = res['responseDto']['id'];
                (this.dataService.newBankCliendcurrencId =
                  this.supportCurrency!.value),
                  (this.dataService.failBankAdd = false);
                this.dataService.goNext2 = true;

                this.GonextPage.emit();
              } else if (res['errorDescription']) {
                this.notificationService.create(
                  'error',
                  'Error',
                  res['errorDescription'],
                  {
                    nzStyle: {
                      background: '#cc2d2d',
                      color: '#ffffff',
                    },
                  }
                );
              } else if (res['errors']) {
                this.dataService.failBankAdd = true;
                this.dataService.newBankDetailsId = null;
                const msg = res['errors'];
                this.notificationService.create(
                  'success',
                  'Success',
                  'Is it need to delete',
                  {
                    nzStyle: {
                      background: '#cc2d2d',
                      color: '#ffffff',
                    },
                  }
                );
              }
            },
            error: (err: any) => {
              this.dataService.failBankAdd = true;
              this.dataService.newBankDetailsId = null;
            },
          });
      }
    } else if (this.isOutlet === false) {
      this.bankName!.setValidators([Validators.required]);
      this.bankName!.updateValueAndValidity();
      this.accNo!.setValidators(
        Validators.compose([Validators.required, MyValidators.maxLength(30)])
      );
      this.accNo!.updateValueAndValidity();
      this.branchName!.setValidators(
        Validators.compose([
          Validators.required,
          MyValidators.alphanumericPattern(5, 35),
        ])
      );
      this.branchName!.updateValueAndValidity();
      this.reference!.setValidators([Validators.required]);
      this.reference!.updateValueAndValidity();
      this.recipientCountry!.setValidators([Validators.required]);
      this.recipientCountry!.updateValueAndValidity();
      this.beneficiaryFullName!.setValidators([Validators.required]);
      this.beneficiaryFullName!.updateValueAndValidity();
      this.selectBankDetailsValidations();
      this.swiftCodeValidation();
      this.reference!.setValidators([Validators.required]);
      this.reference!.updateValueAndValidity();

      if (this.isCoporate === true) {
        this.companyName!.setValidators([Validators.required]);
        this.companyName!.updateValueAndValidity();
      } else if (this.isCoporate === false) {
        this.benificaryfirstName!.setValidators(
          Validators.compose([
            Validators.required,
            MyValidators.characterLength('First Name', 25),
          ])
        ),
          this.benificaryfirstName!.updateValueAndValidity();
        this.benificarylastName!.setValidators(
          Validators.compose([
            Validators.required,
            MyValidators.characterLength('Last Name', 25),
          ])
        );
        this.benificarylastName!.updateValueAndValidity();
        this.dateOfBirth!.setValidators(
          Validators.compose([Validators.required])
        );
        this.dateOfBirth!.updateValueAndValidity();
        this.placeOfBirth!.setValidators(
          Validators.compose([Validators.required])
        );
        this.placeOfBirth!.updateValueAndValidity();
        this.nationality!.setValidators(null);
        this.nationality!.updateValueAndValidity();
      }
    }
  }

  getAgentRceivingCountries() {
    const data: any = {};
    data['agentTransferAapprovedSendingReceivingCurrenciesId'] =
      this.dataService.AllFinalDataFirstStep.sendingreceivingCurrencyId;
    this.transferFlow2Service
      .getAgentReceivingCountry(data)
      .pipe(takeUntil(this.distroy$))
      .subscribe((res: any) => {
        if (res) {
          this.agntRecivingCountries = res['responseDto'];
        }
      });
  }

  getExposableId() {
    const data: any = {};

    data['username'] = this.tokenStorageService.getUser();

    this.corporateAccountsChangeService
      .getCorporateExposableId(data)
      .pipe(takeUntil(this.distroy$))
      .subscribe((res: any) => {
        if (res) {
          this.exposableId = res['responseDto']['agentExposableId'];
          this.dataService.exposableId = this.exposableId;
          this.getSendrDtailsByCriteria(this.exposableId);
          this.getRecipientCurrencies(this.exposableId);
        }
      });
  }

  getBankDetailsExisting(value: any) {
    if (value === 'LK') {
      const SelectBankLakna = this.agntRecivingCountries?.find(
        (country: any) => country.referenceCountryCode === value
      );

      if (SelectBankLakna) {
        this.selectedBanks = SelectBankLakna.countryId;
        this.dataService.SelectBankLakna = this.selectedBanks;
      }

      if (this.selectedBanks === 1) {
        this.srilankaBanks = true;
        this.bankName!.setValidators([Validators.required]);
        this.bankName?.updateValueAndValidity();
        const data: any = {};
        data['exposableId'] = this.exposableId;
        data['countryId'] = this.selectedBanks
          ? this.selectedBanks
          : this.dataService.SelectBankLakna;

        this.tranferFlowService
          .getAllExistingBankDetails(data)
          .pipe(takeUntil(this.distroy$))
          .subscribe((res: any) => {
            if (res) {
              this.allExistingLankaBankDetails = res['responseDto'];
            }
          });
      } else if (this.selectedBanks !== 1) {
        this.srilankaBanks = false;
        this.bankName?.setValidators(
          Validators.compose([
            Validators.required,
            MyValidators.alphanumericPattern(5, 35),
          ])
        );
        this.bankName?.updateValueAndValidity();
        this.transferBeneficiaryDetailsForm.get('bankName')?.reset();
      }
    } else {
      this.selectedBanks = value;

      if (this.selectedBanks === 1) {
        this.srilankaBanks = true;
        this.bankName!.setValidators([Validators.required]);
        this.bankName?.updateValueAndValidity();
        const data: any = {};
        data['exposableId'] = this.exposableId
          ? this.exposableId
          : this.dataService.exposableId;
        data['countryId'] = this.selectedBanks
          ? this.selectedBanks
          : this.dataService.SelectBankLakna;

        this.tranferFlowService
          .getAllExistingBankDetails(data)
          .pipe(takeUntil(this.distroy$))
          .subscribe((res: any) => {
            if (res) {
              this.allExistingLankaBankDetails = res['responseDto'];
            }
          });
      } else if (this.selectedBanks !== 1) {
        this.srilankaBanks = false;
        this.bankName?.setValidators(
          Validators.compose([
            Validators.required,
            MyValidators.alphanumericPattern(5, 35),
          ])
        );
        this.bankName?.updateValueAndValidity();
        this.transferBeneficiaryDetailsForm.get('bankName')?.reset();
      }
    }
  }

  getReffernces(countrySelect: any) {
    this.dataService.reffrenceValue = countrySelect;
    const data: any = {};
    data['countryselectCode'] = countrySelect;
    this.transferFlow2Service
      .getRefferences(data)
      .pipe(takeUntil(this.distroy$))
      .subscribe((res: any) => {
        if (res) {
          this.allReffernces = res['responseDto'];
        }
      });
  }

  getAllBankDetailsExisting(value: any) {
    if (value) {
      if (value === String) {
        const selectedCountryObject = this.agntRecivingCountries?.find(
          (country: any) => country.referenceCountryCode === value
        );

        if (selectedCountryObject) {
          // Retrieve the branch name of the selected bank
          this.SelectCountryId = selectedCountryObject.countryId;
          this.dataService.SelectBankLakna = this.SelectCountryId;
        }
      }

      if (
        this.transferBeneficiaryDetailsForm.get('beneficiaryFullName')!
          .value !== null
      ) {
        if (value === null) {
          this.tableShow = false;
        } else {
          this.tableShow = true;
        }
        const data: any = {};

        data['BeneficiaryDetailsId'] = this.transferBeneficiaryDetailsForm.get(
          'beneficiaryFullName'
        )!.value;
        data['countryId'] = this.CountryType
          ? this.CountryType
          : this.dataService.CountryType;

        data['agentTransferApprovedSendingReceivingCurrenciesId'] =
          this.dataService.AllFinalDataFirstStep.recipientCurrency;

        this.transferFlow2Service
          .getAllExistingBankAccountDetails(data)
          .pipe(takeUntil(this.distroy$))
          .subscribe((res: any) => {
            if (res) {
              this.allExistingAllBankDetails = res['responseDto'];
              this.afterClickBank = true;
              if (res['responseDto'] === null) {
                this.tableShow = false;
                this.afterClickBank = false;
              }
            }
          });
      }
    } else {
      this.tableShow = false;
    }
  }

  getSendrDtailsByCriteria(value: any) {
    const data: any = {};
    data['email'] = this.tokenStorageService.getUser();

    data['exposableId'] = value;
    this.tranferFlowService
      .getAgenetSenderDetails(data)
      .pipe(takeUntil(this.distroy$))
      .subscribe((res: any) => {
        if (res) {
          this.agentSenderDetailsId =
            res['responseDto']['agentSenderDetailsId'];
          this.dataService.senderId =
            res['responseDto']['agentSenderDetailsId'];
        }
      });
  }

  getAllBenificaryDetaisl() {
    const data: any = {};
    data['email'] = this.tokenStorageService.getUser();
    data['countryId'] = this.CountryType
      ? this.CountryType
      : this.dataService.CountryType;
    data['pageNumber'] = this.pageNumber;
    data['pageSize'] = this.pageSize;
    data['isCustomer'] = true;
    this.transferFlow2Service
      .getAgentBenificaryDetails(data)
      .pipe(takeUntil(this.distroy$))
      .subscribe((res: any) => {
        if (res['responseDto']) {
          this.allExcitingBenificary = res['responseDto']['payload'];
        } else {
          this.allExcitingBenificary = [];
        }
      });
  }

  getAllBenificaryDetails(benificaryDetailsId: any) {
    this.dataService.newBankDetailsId = null;
    this.dataService.benificaryDetailsId = benificaryDetailsId;
    this.dataService.benificaryfirstName = null;
    this.dataService.benificarylastName = '';
    if (benificaryDetailsId) {
      const data: any = {};
      data['agentBeneficiaryDetailsId'] = benificaryDetailsId;
      this.transferFlow2Service
        .getAllExistingBenificaryDetailsForPatchData(data)
        .pipe(takeUntil(this.distroy$))
        .subscribe((res: any) => {
          if (res['responseDto'] != null) {
            this.selectBenificaryDetails = res['responseDto'];

            this.isCoporate = res['responseDto']['isCorporate'];

            setTimeout(() => {
              if (this.isCoporate === true) {
                this.patchvalues(this.selectBenificaryDetails);
              } else {
                this.patchvalues(this.selectBenificaryDetails);
              }
            }, 200);

            this.dataService.benificaryfirstNameNew =
              res['responseDto']['beneficiaryFirstName'];
            this.dataService.beneficiaryLastNameNew =
              res['responseDto']['beneficiaryLastName'];
            this.getAllBankDetailsExisting(benificaryDetailsId);
          } else if (res['errorDescription']) {
            this.notificationService.create(
              'error',
              'Error',
              res['errorDescription'],
              {
                nzStyle: {
                  background: '#cc2d2d',
                  color: '#ffffff',
                },
              }
            );
            this.resetField();
          }
        });
    } else {
      this.resetField();
    }
  }
  patchvalues(data: any) {
    const details = this.selectBenificaryDetails;

    console.log(details); // Log the details for debugging

    this.transferBeneficiaryDetailsForm.patchValue({
      companyName: data.beneficiaryFirstName,
      benificaryfirstName: data.beneficiaryFirstName,
      benificarylastName: data.beneficiaryLastName,
      code1: data.contactId,
      contactNumber: data.contactNumber,
      code2: data.mobileCountryCode,
      mobilecontactNumber: data.beneficiaryMobileNumber,
      address: data.beneficiaryAddress,
      dateOfBirth: data.dateOfBirth,
      placeOfBirth: data.beneficiaryPlaceOfBirth,
      nationality: data.nationalityDetailId,
    });
  }

  resetField() {
    this.companyName?.enable();
    this.companyName?.reset();
    this.benificaryfirstName?.enable();
    this.benificaryfirstName?.reset();
    this.benificarylastName?.reset();
    this.benificarylastName?.enable();
    this.code1?.enable();
    this.code1?.reset();
    this.contactNumber?.enable();
    this.contactNumber?.reset();
    this.code2?.enable();
    this.code2?.reset();
    this.mobilecontactNumber?.enable();
    this.mobilecontactNumber?.reset();
    this.address?.enable();
    this.address?.reset();
    this.dateOfBirth?.enable();
    this.dateOfBirth?.reset();
    this.placeOfBirth?.enable();
    this.placeOfBirth?.reset();
    this.nationality?.enable();
    this.nationality?.reset();
    this.beneficiaryFullName?.reset();
  }

  previousPageGo() {
    this.companyName?.enable();

    this.benificaryfirstName?.enable();

    this.benificarylastName?.enable();
    this.code1?.enable();

    this.contactNumber?.enable();

    this.code2?.enable();

    this.mobilecontactNumber?.enable();

    this.address?.enable();

    this.dateOfBirth?.enable();

    this.placeOfBirth?.enable();

    this.nationality?.enable();
  }

  addBeneficery() {
    if (this.showAddNewButtons === true) {
      this.tableShow = false;
      this.transferBeneficiaryDetailsForm.get('beneficiaryFullName')?.disable();
      this.showAddNewButtons = false;
      this.isNewBenificary = false;
      this.companyName?.enable();
      this.companyName?.reset();
      this.benificaryfirstName?.enable();
      this.benificaryfirstName?.reset();
      this.benificarylastName?.reset();
      this.benificarylastName?.enable();
      this.code1?.enable();
      this.code1?.reset();
      this.contactNumber?.enable();
      this.contactNumber?.reset();
      this.code2?.enable();
      this.code2?.reset();
      this.mobilecontactNumber?.enable();
      this.mobilecontactNumber?.reset();
      this.address?.enable();
      this.address?.reset();
      this.dateOfBirth?.enable();
      this.dateOfBirth?.reset();
      this.placeOfBirth?.enable();
      this.placeOfBirth?.reset();
      this.nationality?.enable();
      this.nationality?.reset();
      this.beneficiaryFullName?.reset();
      this.bankName?.reset();
      this.accNo?.reset();
      this.branchName?.reset();
      this.iban?.reset();
      this.bankcodes?.reset();
      this.ifsc?.reset();
      this.routingNumber?.reset();
      this.transitNumber?.reset();
      this.cnapsCode?.reset();
      this.swiftCode?.reset();
      this.supportCurrency?.disable();
      this.benificaryfirstName!.setValidators(
        Validators.compose([
          Validators.required,
          MyValidators.characterLength('First Name', 25),
        ])
      ),
        this.benificaryfirstName!.updateValueAndValidity();
      this.benificarylastName!.setValidators(
        Validators.compose([
          Validators.required,
          MyValidators.characterLength('Last Name', 25),
        ])
      );

      this.benificarylastName!.updateValueAndValidity();
    } else {
      this.tableShow = true;
      this.transferBeneficiaryDetailsForm.get('beneficiaryFullName')?.enable();
      this.showAddNewButtons = true;
      this.isNewBenificary = true;
      this.companyName?.disable();
      this.benificaryfirstName?.disable();
      this.benificarylastName?.disable();
      this.code1?.disable();
      this.contactNumber?.disable();
      this.code2?.disable();
      this.mobilecontactNumber?.disable();
      this.address?.disable();
      this.dateOfBirth?.disable();
      this.placeOfBirth?.disable();
      this.nationality?.disable();
      this.nationality?.disable();
      this.bankName?.reset();
      this.accNo?.reset();
      this.branchName?.reset();
      this.iban?.reset();
      this.bankcodes?.reset();
      this.ifsc?.reset();
      this.routingNumber?.reset();
      this.transitNumber?.reset();
      this.cnapsCode?.reset();
      this.swiftCode?.reset();
      this.supportCurrency?.disable();

      this.benificaryfirstName!.setValidators([]),
        this.benificaryfirstName!.updateValueAndValidity();
      this.benificarylastName!.setValidators([]);

      this.benificarylastName!.updateValueAndValidity();
      this.companyName!.setValidators([]);
      this.companyName!.updateValueAndValidity();
    }
  }

  accountTypeChange() {
    if (this.isCoporate === false) {
      this.benificaryfirstName!.setValidators(
        Validators.compose([
          Validators.required,
          MyValidators.characterLength('First Name', 25),
        ])
      ),
        this.benificaryfirstName!.updateValueAndValidity();
      this.benificarylastName!.setValidators(
        Validators.compose([
          Validators.required,
          MyValidators.characterLength('Last Name', 25),
        ])
      );

      this.benificarylastName!.updateValueAndValidity();
      this.dateOfBirth!.setValidators(
        Validators.compose([Validators.required])
      );
      this.dateOfBirth!.updateValueAndValidity();
      this.placeOfBirth!.setValidators(
        Validators.compose([Validators.required])
      );
      this.placeOfBirth!.updateValueAndValidity();
      this.nationality!.setValidators(null);
      this.nationality!.updateValueAndValidity();
      this.companyName!.setValidators([]);
      this.companyName!.updateValueAndValidity();
      this.address!.setValidators(
        Validators.compose([
          Validators.required,
          MyValidators.minLength(5),
          MyValidators.maxLength(50),
        ])
      );
      this.address!.updateValueAndValidity();

      this.reference!.setValidators([Validators.required]);
      this.reference!.updateValueAndValidity();

      this.benificaryfirstName!.reset();
      this.benificarylastName!.reset();
      this.dateOfBirth!.reset();
      this.placeOfBirth!.reset();
      this.nationality!.reset();
      this.code1!.reset();
      this.contactNumber!.reset();
      this.code2!.reset();
      this.mobilecontactNumber!.reset();
      this.address!.reset();
    } else if (this.isCoporate === true) {
      this.benificaryfirstName!.setValidators([]);
      this.benificarylastName!.setValidators([]);
      this.companyName!.setValidators(
        Validators.compose([
          Validators.required,
          MyValidators.characterLength('Company Name', 25),
        ])
      );
      this.companyName!.updateValueAndValidity();
      this.benificaryfirstName!.updateValueAndValidity();
      this.benificarylastName!.updateValueAndValidity();
      this.dateOfBirth!.setValidators([]);
      this.placeOfBirth!.setValidators([]);
      this.nationality!.setValidators([]);
      this.dateOfBirth!.updateValueAndValidity();
      this.placeOfBirth!.updateValueAndValidity();
      this.nationality!.updateValueAndValidity();
      this.address!.setValidators(
        Validators.compose([
          Validators.required,
          MyValidators.minLength(5),
          MyValidators.maxLength(50),
        ])
      );
      this.address!.updateValueAndValidity();

      this.reference!.setValidators([Validators.required]);
      this.reference!.updateValueAndValidity();

      this.code1!.reset();
      this.contactNumber!.reset();
      this.code2!.reset();
      this.mobilecontactNumber!.reset();
      this.address!.reset();
      this.companyName!.reset();
    }
  }

  numberOnly(event: { which: any; keyCode: any }): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  letterOnly(event: { which: any; keyCode: any }): Boolean {
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

  letterAndNumberOnly(event: { which: any; keyCode: any }): Boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (
      (charCode < 48 || charCode > 57) &&
      (charCode < 65 || charCode > 90) &&
      (charCode < 97 || charCode > 122)
    ) {
      return false;
    }
    return true;
  }

  addBankBranchShow() {
    this.isOutlet = true;
    this.tableShow = false;
    this.dataService.existingBankId = null;
  }
  addBankBranchHide() {
    this.isOutlet = false;

    if (this.afterClickBank === false) {
      this.tableShow = false;
    } else {
      this.tableShow = true;
    }
    this.dataService.existingBankId = null;
  }

  saveAllBenifisacryStepData() {
    console.log('second step work now 1', this.beneficiaryFullName?.value);
    console.log('second step work now 2', this.dataService.benificaryDetailsId);
    this.dataService.AllFinalDataSecondStep = {
      recipientCountry: this.CountryType,
      beneficiaryFullNameId: this.beneficiaryFullName?.value
        ? this.beneficiaryFullName?.value
        : this.dataService.benificaryDetailsId,
      companyName: this.companyName?.value?.trim(),
      benificaryfirstName: this.benificaryfirstName?.value?.trim(),
      benificarylastName: this.benificarylastName?.value?.trim(),
      code1: this.code1?.value,
      contactNumber: this.contactNumber?.value,
      code2: this.code2?.value,
      mobilecontactNumber: this.mobilecontactNumber?.value,
      address: this.address?.value?.trim(),
      dateOfBirth: this.dateOfBirth?.value,
      placeOfBirth: this.placeOfBirth?.value?.trim(),
      nationality: this.nationality?.value,

      bankName: this.bankName?.value?.trim(),
      accNo: this.accNo?.value,
      branchName: this.branchName?.value?.trim(),
      supportCurrency: this.supportCurrency?.value,
      swiftCode: this.swiftCode?.value?.trim(),
      reference: this.reference?.value,
      referenceOther: this.referenceOther?.value?.trim(),

      BenificaryName: this.dataService.benificaryfirstName
        ? this.dataService.benificaryfirstName +
          '' +
          this.dataService.benificarylastName
        : this.BenificaryName?.trim(),
      referenceSelectName: this.referenceSelectName,

      bankCode: this.bankcodes?.value,
      routingNumber: this.routingNumber?.value?.trim(),
      label5: this.iban?.value?.trim(),
      label4: this.ifsc?.value?.trim(),
      label6: this.transitNumber?.value?.trim(),
    };
  }

  disabledDate = (current: NzSafeAny): boolean => {
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - 18); // set the maximum allowed date to 16 years ago
    return current > maxDate;
  };

  saveFirstStep() {
    const body: any = {
      sendingCurrency: 'GBP',
      recipientCurrency: this.dataService.selectReceivingCurencycode
        ? this.dataService.selectReceivingCurencycode
        : this.dataService.startTrnxData.recevingCurrencyCode,
      senderFirstName: this.dataService.senderData.customerFirstName?.trim(),
      senderLastName: this.dataService.senderData.customerLastName?.trim(),

      sendAmount: this.dataService.makeTransferFlowSaveData.sendAmount,
      amountReceived: this.dataService.makeTransferFlowSaveData.amountReceived,

      transactionMode: this.dataService.ModeOfService,
      transferFeesMode: 'FIXED',
      transferFee: this.dataService.AllFinalDataFirstStep.transferFee,
      totalAmountPayable:
        this.dataService.AllFinalDataFirstStep.totalAmountPayable,
      rate: this.dataService.rate,

      paymentMode: this.dataService.paymandMode,

      date: format(new Date(), 'dd-MM-yyyy HH:mm'),
      status: '1stStep',

      agentName: this.dataService.agentname?.trim(),
      exposableId: this.dataService.newExposableId,

      customerReference: this.dataService.customerReference?.trim(),
      beneficiaryFullName: this.dataService.benificaryfirstName
        ? this.dataService.benificaryfirstName +
          '' +
          this.dataService.benificarylastName
        : this.BenificaryName?.trim(),
      beneficiaryFirstName:
        this.dataService.AllFinalDataSecondStep.benificaryfirstName?.trim(),
      beneficiaryLastName:
        this.dataService.AllFinalDataSecondStep.benificarylastName?.trim(),
    };

    this.tranferFlowService
      .saveFirstStep(body)
      .pipe(takeUntil(this.distroy$))
      .subscribe((res: any) => {
        if (res['responseDto']) {
          this.dataService.transferFlowStepId = res['responseDto']['id'];
        }
      });
  }
  getrefferenceCode(value: any) {
    const selectedCountryType = this.allReffernces?.find(
      (referenceId: any) => referenceId.referenceId === value
    );
    if (selectedCountryType) {
      this.referenceSelectName = selectedCountryType.referenceDescription;
      this.referenceCodeSelectName = selectedCountryType.referenceCode;

      this.dataService.newReffernce = this.referenceSelectName;
    }
    if (this.referenceCodeSelectName == 'other') {
      this.provideReason = true;

      this.transferBeneficiaryDetailsForm
        .get('referenceOther')
        ?.setValidators([Validators.required]);
      this.transferBeneficiaryDetailsForm
        .get('referenceOther')
        ?.updateValueAndValidity();
    } else {
      this.provideReason = false;

      this.transferBeneficiaryDetailsForm
        .get('referenceOther')
        ?.setValidators(null);
      this.transferBeneficiaryDetailsForm
        .get('referenceOther')
        ?.updateValueAndValidity();
    }
  }

  gopreviospage() {
    setTimeout(() => {
      console.log(
        'this.dataService.benificaryDetailsId,',
        this.dataService.benificaryDetailsId
      );
      this.transferBeneficiaryDetailsForm.patchValue({
        beneficiaryFullName: this.dataService.benificaryDetailsId
          ? this.dataService.benificaryDetailsId
          : this.dataService.newBankBenifisaryId,
      });
    }, 200);
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
