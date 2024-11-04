import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import format from 'date-fns/format';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { CustomValidators } from 'src/app/_helpers/validators/custom-validators';
import { AddBeneficiaryModalComponent } from '../my-beneficiaries/add-beneficiary-modal/add-beneficiary-modal.component';
import { DataService } from 'src/app/_services/shared-data/data.service';
import { ViewBeneficiaryModalComponent } from '../my-beneficiaries/view-beneficiary-modal/view-beneficiary-modal.component';
import { AccountDetailsViewModalNewComponent } from '../../common-components/account-details-view-modal-new/account-details-view-modal-new.component';
import { AccountDetailsComponent } from '../../common-components/account-details/account-details.component';
import { CommonService } from 'src/app/_services/common.service';
import { TokenService } from 'src/app/_services/token.service';
import { TransferBeneficiaryComponent } from './transfer-beneficiary/transfer-beneficiary.component';
import { TransferFlow2Service } from 'src/app/_services/transfer-flow2.service';
import { TransferViewComponent } from './transfer-view/transfer-view.component';
import { TransferSummeryComponent } from './transfer-summery/transfer-summery.component';
import { MyValidators } from 'src/app/_validators/custom-validator';
import { AfterTransactionSubmitComponent } from './after-transaction-submit/after-transaction-submit.component';
import { ViewComponent } from '../my-transaction/view-transaction-modal/view/view.component';
import { isThisISOWeek } from 'date-fns/esm';
import { TranferFlowService } from 'src/app/_services/tranfer-flow.service';
import { TokenStorageServiceService } from 'src/app/_services/token-storage-service.service';
import { CorporateAccountsChangeService } from 'src/app/_services/corporate-accounts-change.service';
import { EventTriggerService } from 'src/app/_services/shared-data/event-trigger.service';

// import { environment } from "src/environments/environment";

@Component({
  selector: 'app-transfer-flow',
  templateUrl: './transfer-flow.component.html',
  styleUrls: ['./transfer-flow.component.sass'],
})
export class TransferFlowComponent implements OnInit {
  public transferInfoForm!: FormGroup;
  @Input() mode: any;
  @Input() agentSenderDetails: any;
  @Input() indexValue: any;
  @Input() mytransaction: any; //my transaction flow

  @ViewChild(TransferBeneficiaryComponent)
  benificaryComponent!: TransferBeneficiaryComponent;

  @ViewChild(TransferViewComponent)
  TransferViewComponent!: TransferViewComponent;

  @ViewChild(ViewComponent)
  viewComponent!: ViewComponent;

  @ViewChild(TransferSummeryComponent)
  TransferSummeryComponent!: TransferSummeryComponent;

  data: any;

  current = 0;
  index = 0;
  count = 0;
  responceMessage: any;

  agentExposableId = '';
  currentActiveUserAccountEmail: any;
  transferModal: any = {};

  // ---- 1st step -----------------------
  // public transferInfoForm!: FormGroup;
  sendingCurrencies = [];
  recipientCurrencies = [];
  transactionModes = [];
  paymentModes = [];
  agentTransferApprovedSendingReceivingCurrenciesId: any;
  agentUser: any;

  public distroy$ = new Subject<void>();
  agntRecivingCountries: any;
  CountryType: any;
  exposableId: any;
  customerReference: any;
  receivingCurrencies: any;
  transactionmodes: any;
  // allDataInHomeNewFlow:any

  buttonDisable = false;

  constructor(
    private modalRef: NzModalRef,
    private modalService: NzModalService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private notificationService: NzNotificationService,
    private dataService: DataService,
    private commonService: CommonService,
    private tokenService: TokenService,
    private transferFlow2Service: TransferFlow2Service,
    private transferFlow: TranferFlowService,
    private tranferFlowService: TranferFlowService,
    private tokenStorageService: TokenStorageServiceService,
    private corporateAccountsChangeService: CorporateAccountsChangeService,
    private eventtriggerService: EventTriggerService
  ) {
    this.agentUser = this.commonService.parseJwt(tokenService.getToken());
    this.dataService.userId = this.agentUser.user_id;
  }

  ngOnInit() {
    this.currentActiveUserAccountEmail = localStorage.getItem(
      'currentActiveUserAccount'
    );

    this.getExposableId();
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

    this.transferInfoForm = this.formBuilder.group({
      // ---- transferInfoForm (step 01) ----
      transferView: this.formBuilder.group({
        sendingCurrency: [null, Validators.required],
        recipientCurrency: [null, Validators.required],
        sendAmount: [null, Validators.required],
        amountReceived: [null, Validators.required],
        transactionMode: [null, Validators.required],
        paymentMode: [null, Validators.required],
        transferFee: [null, Validators.required],
        totalAmountPayable: [null, Validators.required],
        promoCode: [null],
      }),

      //  2nd step =======================================================

      benificiaryView: this.formBuilder.group({
        recipientCountry: [null],
        country: [null],
        beneficiaryFullName: [null],
        companyName: [null, null],
        benificaryfirstName: [
          null,
          [
            Validators.compose([
              Validators.required,
              characterLength('First Name', 25),
            ]),
          ],
        ],
        benificarylastName: [
          null,
          [
            Validators.compose([
              Validators.required,
              characterLength('Last Name', 25),
            ]),
          ],
        ],
        code1: [null, null],
        code2: [null, Validators.required],
        contactNumber: [
          null,
          [Validators.compose([minLength(9), maxLength(10)])],
        ],
        mobilecontactNumber: [
          null,
          [
            Validators.compose([
              Validators.required,
              minLength(9),
              maxLength(10),
            ]),
          ],
        ],
        address: [
          null,
          [
            Validators.compose([
              Validators.required,
              minLength(5),
              maxLength(50),
            ]),
          ],
        ],
        dateOfBirth: [null, Validators.required],
        placeOfBirth: [null, Validators.required],
        nationality: [null, null],
        bankName: [null, Validators.required],
        accNo: [
          null,
          [Validators.compose([Validators.required, maxLength(30)])],
        ],
        branchName: [
          null,
          [
            Validators.compose([
              Validators.required,
              alphanumericPattern(5, 35),
            ]),
          ],
        ],
        supportCurrency: [null],
        reference: [null, Validators.required],
        referenceOther: [null, null],
        isCoporateBeneficiary: [null],
        bankcodes: [null, null],
        swiftCode: [null, null],
        iban: [null, null],
        ifsc: [null, null],
        routingNumber: [null, null],
        transitNumber: [null, null],
        cnapsCode: [null],
        bankRadio: [null],

        // selectedBank: [null, Validators.required],
      }),

      transferSummaryView: this.formBuilder.group({
        date: [null],
        senderName: [null],
        transferredAmount: [null],
        beneficiaryName: [null],
        modeOfService: [null],
        receivedAmount: [null],
      }),
    });

    if (this.mytransaction === false) {
      this.transferInfoForm.get('transferView')?.patchValue({
        sendingCurrency: this.mode.sendCurrency,
        recipientCurrency: this.mode.recevingCurrency,
        sendAmount: this.mode.sendAmount.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
        amountReceived: this.mode.recevingAmount.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
      });
    } else {
    }

    if (this.mytransaction === false) {
      this.transferInfoForm.get('benificiaryView')?.patchValue({
        supportCurrency: this.mode.recevingCurrency,
      });
    } else {
    }

    if (this.indexValue === 2) {
      this.index = 2;
      this.current = 2;
      this.current = this.current++;
    }

    // this.FinalAllData();
  }

  FinalAllData() {
    this.TransferViewComponent.saveAllDataForNextStep(); //first step data;
    this.benificaryComponent.saveAllBenifisacryStepData(); //secondStep data
  }

  // 1st step ========================================================
  get sendingCurrency() {
    return this.transferInfoForm.get('transferView')?.get('sendingCurrency');
  }
  get recipientCurrency() {
    return this.transferInfoForm.get('transferView')?.get('recipientCurrency');
  }
  get sendAmount() {
    return this.transferInfoForm.get('transferView')?.get('sendAmount');
  }
  get amountReceived() {
    return this.transferInfoForm.get('transferView')?.get('amountReceived');
  }
  get transactionMode() {
    return this.transferInfoForm.get('transferView')?.get('transactionMode');
  }
  get paymentMode() {
    return this.transferInfoForm.get('transferView')?.get('paymentMode');
  }
  get transferFee() {
    return this.transferInfoForm.get('transferView')?.get('transferFee');
  }
  get totalAmountPayable() {
    return this.transferInfoForm.get('transferView')?.get('totalAmountPayable');
  }
  get promoCode() {
    return this.transferInfoForm.get('transferView')?.get('promoCode');
  }

  // 2nd step ========================================================
  get companyName() {
    return this.transferInfoForm.get('benificiaryView')?.get('companyName');
  }
  get benificaryfirstName() {
    return this.transferInfoForm
      .get('benificiaryView')
      ?.get('benificaryfirstName');
  }
  get benificarylastName() {
    return this.transferInfoForm
      .get('benificiaryView')
      ?.get('benificarylastName');
  }
  get code1() {
    return this.transferInfoForm.get('benificiaryView')?.get('code1');
  }
  get contactNumber() {
    return this.transferInfoForm.get('benificiaryView')?.get('contactNumber');
  }
  get code2() {
    return this.transferInfoForm.get('benificiaryView')?.get('code2');
  }
  get mobilecontactNumber() {
    return this.transferInfoForm
      .get('benificiaryView')
      ?.get('mobilecontactNumber');
  }
  get address() {
    return this.transferInfoForm.get('benificiaryView')?.get('address');
  }
  get dateOfBirth() {
    return this.transferInfoForm.get('benificiaryView')?.get('dateOfBirth');
  }
  get placeOfBirth() {
    return this.transferInfoForm.get('benificiaryView')?.get('placeOfBirth');
  }
  get nationality() {
    return this.transferInfoForm.get('benificiaryView')?.get('nationality');
  }
  get reference() {
    return this.transferInfoForm.get('benificiaryView')?.get('reference');
  }
  get referenceOther() {
    return this.transferInfoForm.get('benificiaryView')?.get('referenceOther');
  }

  get bankName() {
    return this.transferInfoForm?.get('benificiaryView')?.get('bankName');
  }
  get accNo() {
    return this.transferInfoForm?.get('benificiaryView')?.get('accNo');
  }
  get branchName() {
    return this.transferInfoForm?.get('benificiaryView')?.get('branchName');
  }
  get swiftCode() {
    return this.transferInfoForm?.get('benificiaryView')?.get('swiftCode');
  }
  get bankcodes() {
    return this.transferInfoForm?.get('benificiaryView')?.get('bankcodes');
  }
  get iban() {
    return this.transferInfoForm?.get('benificiaryView')?.get('iban');
  }
  get routingNumber() {
    return this.transferInfoForm?.get('benificiaryView')?.get('routingNumber');
  }
  get transitNumber() {
    return this.transferInfoForm?.get('benificiaryView')?.get('transitNumber');
  }
  get cnapsCode() {
    return this.transferInfoForm?.get('benificiaryView')?.get('cnapsCode');
  }
  get ifsc() {
    return this.transferInfoForm?.get('benificiaryView')?.get('ifsc');
  }

  get bankRadio() {
    return this.transferInfoForm?.get('benificiaryView')?.get('bankRadio');
  }

  // get isCoporateBeneficiary() {
  //   return this.transferInfoForm?.get('isCoporateBeneficiary');
  // }

  // 3rd step ========================================================

  validateAllFormFieldsforViewOne() {
    const transferViewFormGroup = this.transferInfoForm.get(
      'transferView'
    ) as FormGroup;
    if (transferViewFormGroup) {
      Object.keys(transferViewFormGroup.controls).forEach((field) => {
        const control = transferViewFormGroup.get(field);
        if (control instanceof FormControl) {
          if (!control.value && control.errors) {
            control.markAsDirty();
            control.updateValueAndValidity({ onlySelf: true });
            const fieldName = this.getFieldName(field);
            this.notificationService.create(
              'error',
              'Input Error',
              fieldName + ' cannot be empty',
              { nzStyle: { background: '#cc2d2d', color: '#fff' } }
            );
          }
        }
      });
    }
  }
  getFieldName(option: any): any {
    switch (option) {
      case 'sendingCurrency': {
        return 'Sending Currency';
      }
      case 'recipientCurrency': {
        return 'Recipient Currency';
      }
      case 'sendAmount': {
        return 'Send Amount';
      }
      case 'amountReceived': {
        return 'Amount Received';
      }
      case 'transactionMode': {
        return 'Transaction Mode';
      }
      case 'paymentMode': {
        return 'Payment Mode';
      }
      case 'transferFee': {
        return 'Transfer Fee';
      }
      case 'totalAmountPayable': {
        return 'Total Amount Payable';
      }
    }
  }

  clearFormControlsfisrsStep() {
    this.transferInfoForm
      .get('benificiaryView')
      ?.get('recipientCountry')
      ?.reset();
    this.transferInfoForm
      .get('benificiaryView')
      ?.get('beneficiaryFullName')
      ?.reset();
  }
  clearFormControlsSecondStep() {
    this.transferInfoForm
      .get('benificiaryView')
      ?.get('recipientCountry')
      ?.reset();
    this.transferInfoForm
      .get('benificiaryView')
      ?.get('beneficiaryFullName')
      ?.reset();
    this.transferInfoForm
      .get('benificiaryView')
      ?.get('benificaryfirstName')
      ?.reset();
    this.transferInfoForm.get('benificiaryView')?.get('companyName')?.reset();
    this.transferInfoForm
      .get('benificiaryView')
      ?.get('benificarylastName')
      ?.reset();
    this.transferInfoForm.get('benificiaryView')?.get('code1')?.reset();
    this.transferInfoForm.get('benificiaryView')?.get('contactNumber')?.reset();
    this.transferInfoForm.get('benificiaryView')?.get('code2')?.reset();
    this.transferInfoForm
      .get('benificiaryView')
      ?.get('mobilecontactNumber')
      ?.reset();
    this.transferInfoForm.get('benificiaryView')?.get('address')?.reset();
    this.transferInfoForm.get('benificiaryView')?.get('dateOfBirth')?.reset();
    this.transferInfoForm.get('benificiaryView')?.get('nationality')?.reset();
    this.transferInfoForm.get('benificiaryView')?.get('placeOfBirth')?.reset();
    this.transferInfoForm.get('benificiaryView')?.get('bankName')?.reset();
    this.transferInfoForm.get('benificiaryView')?.get('accNo')?.reset();
    this.transferInfoForm.get('benificiaryView')?.get('branchName')?.reset();
    this.transferInfoForm.get('benificiaryView')?.get('swiftCode')?.reset();
    this.transferInfoForm.get('benificiaryView')?.get('ifscNumber')?.reset();
    this.transferInfoForm
      .get('benificiaryView')
      ?.get('recipientCountry')
      ?.reset();
    this.transferInfoForm.get('benificiaryView')?.get('reference')?.reset();
    this.transferInfoForm.get('benificiaryView')?.get('country')?.reset();
  }

  firstPagContinue() {
    if (!this.transferInfoForm.get('transferView')?.valid) {
      return this.validateAllFormFieldsforViewOne();
    } else {
      if (this.dataService.transferFee === true) {
        this.TransferViewComponent.checkRatesValidOrNot();
        // this.index = 1;
        // this.current = 1;
        // this.checkRatesValidOrNot();

        // this.index = this.newIndexvalue;
        // this.current = this.newIndexvalue;
      } else {
        this.transferInfoForm
          .get('transferProcessView')
          ?.get('transferFee')
          ?.reset();
        this.transferInfoForm
          .get('transferProcessView')
          ?.get('totalAmountPayable')
          ?.reset();
        this.notificationService.create(
          'error',
          'Error',
          'Transfer Fee cannot be empty',
          {
            nzStyle: { background: '#cc2d2d', color: '#fff' },
          }
        );
        this.notificationService.create(
          'error',
          'Error',
          'Total Amount Payable cannot be empty',
          {
            nzStyle: { background: '#cc2d2d', color: '#fff' },
          }
        );
      }

      this.paymentMode?.value;
      this.TransferViewComponent.saveAllDataForNextStep();
      this.dataService.mytransactionNew = false;

      this.dataService.allDataInHomeNewFlow = {
        sendCurrency: 4,
        recevingCurrency: this.recipientCurrency?.value,
        sendAmount: this.sendAmount?.value,
        recevingAmount: this.amountReceived?.value,
        agentSendingReceivingCurrencyId: this.transferInfoForm
          .get('transferView')
          ?.get('sendAmount')?.value,
        agentTransferRceivingCurrncyId: this.transferInfoForm
          .get('transferView')
          ?.get('amountReceived')?.value,
      };
    }
  }

  newIndexvalue(value: any) {
    this.index = value;
    this.current = value;
  }

  secondPagContinue() {}

  pre(): void {
    if (this.current === 1) {
      this.index = 0;
      this.current = 0;
      this.current = this.current--;

      this.dataService.existingBankId = null;
      this.dataService.ratesvalid = false;
      // this.TransferViewComponent.getTransactionMode();
    } else if (this.current === 2) {
      this.benificaryComponent?.gopreviospage();
      this.index = 1;
      this.current = 1;
      this.current = this.current--;
      this.dataService.goBack = true;
      this.dataService.mytransactionNew === true;
      this.benificaryComponent?.saveAllBenifisacryStepData();
      this.dataService.failBenifisary === true;
      this.dataService.failBankAdd === false;
      this.dataService.firstTransactionDone = false;
    }
  }
  next(): void {
    if (this.current === 0) {
      // this.current = this.current++;
      // this.TransferViewComponent.checkRatesValidOrNot();
      this.firstPagContinue();
      this.TransferViewComponent.saveAllDataForNextStep();
      this.TransferViewComponent.saveDataforMakeTransferFlow();
      // this.saveFirstStep();
      // this.TransferViewComponent.saveFirstStep();
      // this.TransferSummeryComponent.getExposableId();
    } else if (this.current === 1) {
      this.current = this.current++;
      this.benificaryComponent.checkAddBnifisaryOrNot();

      this.benificaryComponent.checkBankDetailsAddorNot();

      this.benificaryComponent.failBankDetailsAdd();
      this.benificaryComponent.saveAllBenifisacryStepData();
      this.benificaryComponent.saveFirstStep();
    } else if (this.current === 2) {
      if (this.mytransaction === true) {
        this.TransferSummeryComponent.updateFinalStep();
        this.TransferSummeryComponent.savetransactionNew();
      } else if (this.mytransaction === false) {
        this.TransferSummeryComponent.updateFinalStep();
        this.TransferSummeryComponent.savetransactionhome();
      }
    }
  }

  reviewandConfirm() {
    console.log('this.dataService.goNext2', this.dataService.goNext2);
    if (this.dataService.goNext1 == true && this.dataService.goNext2 == true) {
      this.index = 2;
      this.current = 2;
      this.benificaryComponent.saveAllBenifisacryStepData(); //secondStep data
    }
  }

  closeModal() {
    this.modalRef.destroy();
    this.dataService.startTrnxData = null;
    window.location.reload();
  }
  getExposableId() {
    const data: any = {};
    // data['username'] = this.agentUser.sub;
    data['username'] = this.tokenStorageService.getUser();
    this.corporateAccountsChangeService
      .getCorporateExposableId(data)
      .pipe(takeUntil(this.distroy$))
      .subscribe((res: any) => {
        if (res) {
          this.exposableId = res['responseDto']['agentExposableId'];
          this.getSendrDtailsByCriteria(this.exposableId);
          this.getSendingCurrency(this.exposableId);
          this.getRecipientCurrencies();
          if (this.dataService.startTrnxData != null) {
            this.getTransactionMode(
              this.dataService.startTrnxData.agentTransferRceivingCurrncyId
            );
          }
        }
      });
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
          this.customerReference = res['responseDto']['customerReference'];
          this.dataService.senderData = res['responseDto'];
          this.dataService.customerReference =
            res['responseDto']['customerReference'];
        }
      });
  }
  saveFirstStep() {
    // console.log(
    //   'save first step',
    //   this.dataService.startTrnxData.recevingCurrencyCode
    // );
    const body: any = {
      // sendingCurrency:
      //   this.dataService.AllFinalDataFirstStep.sendingCurrencyName,
      sendingCurrency: 'GBP',
      recipientCurrency: this.dataService.startTrnxData.recevingCurrencyCode,
      sendAmount: this.dataService.AllFinalDataFirstStep.sendAmount,
      amountReceived: this.dataService.AllFinalDataFirstStep.amountReceived,
      transactionMode: this.dataService.AllFinalDataFirstStep.transactionMode,
      transferFeesMode: 'FIXED',
      transferFee: this.dataService.AllFinalDataFirstStep.transferFee,
      totalAmountPayable:
        this.dataService.AllFinalDataFirstStep.totalAmountPayable,
      rate: this.dataService.rate,
      paymentMode: this.dataService.AllFinalDataFirstStep.PaymentType,
      // recipientCountry: this.dataService.AllFinalDataFirstStep.,
      date: format(new Date(), 'dd-MM-yyyy HH:mm'),
      status: '1stStep',
      agentName: this.dataService.agentSenderDetails.agentName,
      exposableId: this.dataService.agentSenderDetails.data,
      customerReference: this.customerReference,
      // ipAddress: "192.168.1.100"
    };
    this.transferFlow
      .saveFirstStep(body)
      .pipe(takeUntil(this.distroy$))
      .subscribe((res: any) => {
        if (res['responseDto']) {
          this.dataService.transferFlowStepId = res['responseDto']['id'];
        }
      });
  }
  getSendingCurrency(value: any) {
    const data: any = {};
    data['agentExposableId'] = value;
    this.tranferFlowService
      .getSendingCurrencies(data)
      .pipe(takeUntil(this.distroy$))
      .subscribe((res: any) => {
        if (res) {
          this.sendingCurrencies = res['responseDto'];
        }
      });
  }
  getRecipientCurrencies(value: any = null) {
    const data: any = {};
    data['agentExposableId'] = this.exposableId;
    data['sendingCurrency'] = 'GBP';
    this.tranferFlowService
      .getSndingRecivingCurrencis(data)
      .pipe(takeUntil(this.distroy$))
      .subscribe((res: any) => {
        if (res) {
          this.receivingCurrencies = res['responseDto'];
        }
      });
  }
  SendingCurrencyChange(receivedData: any) {
    this.getRecipientCurrencies(receivedData);
  }
  receivingCurrencyChange(receivedData: any) {
    this.getTransactionMode(receivedData);
  }
  getTransactionMode(id: any) {
    const data: any = {};
    data['agentExposableId'] = this.exposableId;
    data['agentTransferRceivingCurrncyId'] = id
      ? id
      : this.dataService.agentTransferRceivingCurrncyId;
    this.tranferFlowService

      .gtAllTransactionModes(data)
      .pipe(takeUntil(this.distroy$))
      .subscribe((res: any) => {
        if (res['responseDto']) {
          this.transactionmodes = res['responseDto'];
        }
      });
  }

  disableButton() {
    this.buttonDisable = true;
  }
}
