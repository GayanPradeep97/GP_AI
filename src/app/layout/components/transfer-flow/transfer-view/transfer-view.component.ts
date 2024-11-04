import { DecimalPipe } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { format } from 'date-fns';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { EMPTY, Subject, takeUntil } from 'rxjs';
import { CommonService } from 'src/app/_services/common.service';
import { CorporateAccountsChangeService } from 'src/app/_services/corporate-accounts-change.service';
import { DataService } from 'src/app/_services/shared-data/data.service';
import { EventTriggerService } from 'src/app/_services/shared-data/event-trigger.service';
import { TokenStorageServiceService } from 'src/app/_services/token-storage-service.service';
import { TokenService } from 'src/app/_services/token.service';
import { TranferFlowService } from 'src/app/_services/tranfer-flow.service';

@Component({
  selector: 'app-transfer-view',
  templateUrl: './transfer-view.component.html',
  styleUrls: ['./transfer-view.component.sass'],
})
export class TransferViewComponent {
  public transferProcessView!: FormGroup;
  @Input() formGroupName!: string;
  @Input() mode: any;
  @Input() transactionmodes: any;
  @Input() sendingCurrencies: any;
  @Input() receivingCurrencies: any;
  @Input() mytransaction: any;
  @Output() SendingCurrencyChange: EventEmitter<any> = new EventEmitter();
  @Output() receivingCurrencyChange: EventEmitter<any> = new EventEmitter();
  @Output() FirstIndexvalue: EventEmitter<any> = new EventEmitter();

  agentUser: any;
  exposableId: any;
  // sendingCurrencies: any;
  // receivingCurrencies: any;
  paymentmodes: any;

  agentTransferRceivingCurrncyId: any;
  transferModeId: any;
  totalPayable: any;
  fee: any;
  agentSenderDetailsId: any;
  agentSenderDetails: any;
  savefirstStepData: any;
  PaymentType: any;
  public distroy$ = new Subject<void>();

  currencyRateId: any;
  givenCurrencyRate: any;
  selectedCurrencyId: any;
  selectRecevingCurrencyId: any;
  selectRecevingCurrencyValue: any;
  selectTransactionModeId: any;
  resetPaymentField = false;
  RecevingCurrencyId: any;
  transactionId: any;
  selectReceivingCurencycode: any;
  paymandMode: any;
  agentname: any;
  savedUserName: any;

  // ---- 1st step -----------------------

  constructor(
    private formBuilder: FormBuilder,
    private rootFormDirction: FormGroupDirective,
    private tranferFlowService: TranferFlowService,
    private commonService: CommonService,
    private tokenService: TokenService,
    private dataService: DataService,
    private notificationService: NzNotificationService,
    private tokenStorageService: TokenStorageServiceService,
    private corporateAccountsChangeService: CorporateAccountsChangeService,
    private decimalPipe: DecimalPipe, // private transferFlow: TranferFlowService,
    private eventtriggerService: EventTriggerService
  ) {
    this.agentUser = this.commonService.parseJwt(tokenService.getToken());
    this.savedUserName = this.tokenService.getPrivileges();
  }

  ngOnInit() {
    this.dataService.ratesvalid = false;
    this.transferProcessView = this.rootFormDirction.control!.get(
      this.formGroupName
    ) as FormGroup;

    this.getExposableId();

    this.transferProcessView
      .get('transactionMode')!
      .valueChanges.pipe(takeUntil(this.distroy$))
      .subscribe((selectedPaymentTypes: any) => {
        const selectedPaymentType = this.transactionmodes?.find(
          (paymentValue: any) =>
            paymentValue.agentCurrencyTransactionModeId === selectedPaymentTypes
        );
        if (selectedPaymentType) {
          this.PaymentType = selectedPaymentType.transactionModeDesc;
        }
      });

    this.transferProcessView
      .get('recipientCurrency')
      ?.valueChanges.pipe(takeUntil(this.distroy$))
      .subscribe((selectedPaymentTypes: any) => {
        const selectedPaymentType = this.receivingCurrencies.find(
          (currencyValue: any) =>
            currencyValue.currencyId === selectedPaymentTypes
        );
        if (selectedPaymentType) {
          this.RecevingCurrencyId =
            selectedPaymentType.agentTransferApprovedSendingReceivingCurrenciesId;
        }
      });
  }
  getRecipientCurrencies(id: any) {
    this.SendingCurrencyChange.emit(id);
    const selectedCurrency = this.sendingCurrencies.find(
      (currency: any) => currency.currencyId === id
    );
    this.dataService.sendingCurrencyId =
      selectedCurrency.agentTransferApprovedSendingCurrenciesId;
    // console.log('selectedSending', this.dataService.sendingCurrencyId);
  }
  get transferFee() {
    return this.transferProcessView?.get('transferFee');
  }

  get totalAmountPayable() {
    return this.transferProcessView?.get('totalAmountPayable');
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
          this.agentname = res['responseDto']['agentName'];
          // this.getSendingCurrency(this.exposableId);
          // this.getRecipientCurrencies(this.exposableId);
          this.getPaymentModes(this.exposableId);
          this.dataService.newExposableId = this.exposableId;
          this.dataService.agentname = res['responseDto']['agentName'];
          // this.getTransactionMode();

          this.getSendrDtailsByCriteria(this.exposableId);
        }
      });
  }

  getSendrDtailsByCriteria(value: any) {
    const data: any = {};
    data['email'] = this.tokenStorageService.getUser();
    data['exposableId'] = this.dataService.newExposableId;
    this.tranferFlowService
      .getAgenetSenderDetails(data)
      .pipe(takeUntil(this.distroy$))
      .subscribe((res: any) => {
        if (res) {
          this.agentSenderDetailsId =
            res['responseDto']['agentSenderDetailsId'];
          this.dataService.senderId =
            res['responseDto']['agentSenderDetailsId'];
          this.agentSenderDetails = res['responseDto'];
          this.dataService.agentSenderDetails = this.agentSenderDetails;
          this.dataService.agentSenderDetailsIdNew =
            res['responseDto']['agentSenderDetailsId'];
          // console.log('agent sender details ', res['responseDto']);
        }
      });
  }

  getPaymentModes(value: any) {
    const data: any = {};
    data['agentExposableId'] = value;
    this.tranferFlowService
      .gtAllPaymentModes(data)
      .pipe(takeUntil(this.distroy$))
      .subscribe((res: any) => {
        if (res) {
          this.paymentmodes = res['responseDto'];
        }
      });
  }

  getConvertedAmount() {
    if (this.transferProcessView.get('sendAmount')?.value < 10) {
      this.notificationService.create(
        'error',
        'Error',
        'Minimum sending amount is 10.00',
        { nzStyle: { background: '#cc2d2d', color: '#fff' } }
      );
      this.transferProcessView.patchValue({
        amountReceived: '',
      });
    } else {
      if (this.transferProcessView.get('sendAmount')?.value !== null) {
        const data: any = {};
        data['agentExposableId'] = this.exposableId;
        data['sendingCurrencyId'] = 4;
        data['receivingCurrencyId'] = this.selectRecevingCurrencyId
          ? this.selectRecevingCurrencyId
          : this.transferProcessView.get('recipientCurrency')?.value;
        data['providerType'] = 'MONEX';
        data['amount'] = parseFloat(
          this.transferProcessView.get('sendAmount')?.value.replace(/,/g, '')
        );
        data['email'] = this.dataService.loggedInUser
          ? this.dataService.loggedInUser
          : this.savedUserName;

        this.tranferFlowService
          .getAgntTransactionRats(data)
          .pipe(takeUntil(this.distroy$))
          .subscribe((res: any) => {
            if (res['responseDto']) {
              const receivedAmount: number =
                res['responseDto']['receivingAmount'];
              if (receivedAmount == data.amount * res['responseDto']['rate']) {
                // Format the received amount to have only two digits after the decimal point
                const formattedAmount: string = receivedAmount.toFixed(2);
                this.transferProcessView.patchValue({
                  amountReceived: receivedAmount.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }),
                });
                this.dataService.isSendingAmout = true;
                this.currencyRateId = res['responseDto']['currencyRateId'];
                this.givenCurrencyRate = res['responseDto']['rate'];

                this.dataService.AllFinalDataFirstStep = {
                  currencyRateId: res['responseDto']['currencyRateId'],
                };

                this.dataService.AllFinalDataFirstStep = {
                  givenCurrencyRate: res['responseDto']['rate'],
                };

                this.dataService.rate = res['responseDto']['rate'];
                this.dataService.rateId = res['responseDto']['currencyRateId'];
              } else {
                this.notificationService.create(
                  'error',
                  'Error',
                  'Invalid Amount',
                  {
                    nzStyle: { background: '#cc2d2d', color: '#fff' },
                  }
                );
              }
            } else if (res['errorDescription']) {
              const msg = res['errorDescription'];
              this.notificationService.create('error', 'Error', msg, {
                nzStyle: { background: '#cc2d2d', color: '#fff' },
              });
            }
          });
      }
    }
  }

  getConvertedAmoutReceived() {
    if (this.transferProcessView.get('amountReceived')?.value !== null) {
      const data: any = {};
      data['agentExposableId'] = this.exposableId;
      data['sendingCurrencyId'] = 4;
      data['receivingCurrencyId'] = this.selectRecevingCurrencyId
        ? this.selectRecevingCurrencyId
        : this.transferProcessView.get('recipientCurrency')?.value;
      data['providerType'] = 'MONEX';
      data['amount'] = parseFloat(
        this.transferProcessView.get('amountReceived')?.value.replace(/,/g, '')
      );
      data['email'] = this.dataService.loggedInUser
        ? this.dataService.loggedInUser
        : this.savedUserName;
      this.tranferFlowService
        .getAgntTransactionRatsReceived(data)
        .pipe(takeUntil(this.distroy$))
        .subscribe((res: any) => {
          if (res['responseDto']) {
            const SendingAmount: number = res['responseDto']['sendingAmount'];

            if (SendingAmount < 10) {
              this.notificationService.create(
                'error',
                'Error',
                'Minimum sending amount is 10.00',
                { nzStyle: { background: '#cc2d2d', color: '#fff' } }
              );
              this.transferProcessView.patchValue({
                sendAmount: '',
              });
            } else if (
              SendingAmount ==
              data.amount / res['responseDto']['rate']
            ) {
              this.dataService.isSendingAmout = false;
              // Format the received amount to have only two digits after the decimal point
              const formattedAmount: string = SendingAmount.toFixed(2);
              // this.transactionmodes = res['responseDto']['receivingAmount'];
              this.transferProcessView.patchValue({
                sendAmount: SendingAmount.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }),
              });

              if (this.dataService.paymandMode) {
                this.gtAllConfiguredTransactionFee(
                  this.dataService.paymandMode
                );
              }

              this.dataService.sendingAmountSave = SendingAmount;

              this.currencyRateId = res['responseDto']['currencyRateId'];
              this.givenCurrencyRate = res['responseDto']['rate'];

              this.dataService.AllFinalDataFirstStep = {
                currencyRateId: res['responseDto']['currencyRateId'],
              };

              this.dataService.AllFinalDataFirstStep = {
                givenCurrencyRate: res['responseDto']['rate'],
              };

              this.dataService.rate = res['responseDto']['rate'];
              this.dataService.rateId = res['responseDto']['currencyRateId'];
            } else {
              this.notificationService.create(
                'error',
                'Error',
                'Invalid Amount',
                {
                  nzStyle: { background: '#cc2d2d', color: '#fff' },
                }
              );
            }
          } else if (res['errorDescription']) {
            const msg = res['errorDescription'];
            this.notificationService.create('error', 'Error', msg, {
              nzStyle: { background: '#cc2d2d', color: '#fff' },
            });
          }
        });
    }
  }

  getSelectreceivingCurrency(value: any) {
    // this.receivingCurrencyChange.emit(value);
    if (value) {
      this.selectRecevingCurrencyId = value;

      const selectedCurrency = this.receivingCurrencies.find(
        (currency: any) => currency.currencyId === value
      );
      if (selectedCurrency) {
        this.selectRecevingCurrencyValue =
          selectedCurrency.agentTransferApprovedSendingReceivingCurrenciesId;
        // Use agentTransferId as needed
        this.receivingCurrencyChange.emit(this.selectRecevingCurrencyValue);
        this.dataService.selectRecevingCurrencyValue =
          this.selectRecevingCurrencyValue;

        this.selectReceivingCurencycode = selectedCurrency.currencyCode;
        this.dataService.selectReceivingCurencycode =
          selectedCurrency.currencyCode;
        if (this.transferProcessView.get('sendAmount')!.value != null) {
          this.getConvertedAmount();
        }
        // if (this.transferProcessView.get('amountReceived')!.value) {
        //   this.getConvertedAmoutReceived();
        // }
        // this.getConvertedAmount();

        // this.getTransactionMode();
      }
      this.transferProcessView.get('transactionMode')?.reset();
    }
  }

  changeTotalAmount() {
    if (this.dataService.paymandMode) {
      this.gtAllConfiguredTransactionFee(this.dataService.paymandMode);
    }
  }

  gtAllConfiguredTransactionFee(values: any) {
    // this.dataService.paymentModeValue =
    if (values === 40) {
      console.log('getpayement id eka kiyada', values);
      this.dataService.cashpaymentId = values;
    }
    const selectedCPayemntMode = this.paymentmodes.find(
      (paymentModeDesc: any) => paymentModeDesc.agentPaymentModeId === values
    );
    if (selectedCPayemntMode) {
      this.paymandMode = selectedCPayemntMode.paymentModeDto.paymentModeDesc;
      this.dataService.paymandMode = this.paymandMode;
    }

    if (values !== null) {
      const data: any = {};
      data['agentTransferApprovedSendingCurrenciesId'] =
        this.dataService.sendingCurrencyId;
      data['agentCurrencyTransactionModeId'] =
        this.transferProcessView.get('transactionMode')?.value;
      data['transferFeeType'] = 'FIXED';
      data['agentPaymentModeId'] =
        this.transferProcessView.get('paymentMode')?.value;
      data['amount'] = parseFloat(
        this.transferProcessView.get('sendAmount')?.value.replace(/,/g, '')
      )
        ? parseFloat(
            this.transferProcessView.get('sendAmount')?.value.replace(/,/g, '')
          )
        : this.dataService.sendingAmountSave;
      this.tranferFlowService
        .getAgentConfiguredTransferFee(data)
        .pipe(takeUntil(this.distroy$))
        .subscribe((res: any) => {
          if (res['responseDto']) {
            if (
              res['responseDto']['totalPayable'] ==
              data.amount + res['responseDto']['fee']
            ) {
              this.totalPayable = res['responseDto']['totalPayable'];
              this.fee = res['responseDto']['fee'];
              this.transferProcessView.patchValue({
                transferFee: res['responseDto']['fee'].toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }),
                totalAmountPayable: res['responseDto'][
                  'totalPayable'
                ].toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }),
              });
              this.dataService.transferFee = true;

              this.transferFee!.disable();
              this.totalAmountPayable!.disable();
            } else {
              this.notificationService.create(
                'error',
                'Error',
                'Invalid Amount',
                {
                  nzStyle: { background: '#cc2d2d', color: '#fff' },
                }
              );
            }
          } else if (res['errorDescription']) {
            const msg = res['errorDescription'];
            this.notificationService.create('error', 'Error', msg, {
              nzStyle: { background: '#cc2d2d', color: '#fff' },
            });

            if (res['responseDto'] === null) {
              this.dataService.transferFee = false;
              this.transferProcessView.get('transferFee')?.reset();
              this.transferProcessView.get('totalAmountPayable')?.reset();
              //  if (!this.transferProcessView.valid) {
              //    return this.validateAllFormFieldsforViewOne();
              //  }
            }
          }
        });
    }
  }

  saveAllDataForNextStep() {
    this.dataService.AllFinalDataFirstStep = {
      sendingCurrency: this.transferProcessView.get('sendingCurrency')!.value,
      sendingCurrencyName:
        this.transferProcessView.get('sendingCurrency')!.value.currencyCode,
      recipientCurrency:
        this.transferProcessView.get('recipientCurrency')!.value != null
          ? this.transferProcessView.get('recipientCurrency')!.value
          : this.mode.recevingCurrency,
      recipientCurrencyName:
        this.transferProcessView.get('recipientCurrency')!.value.currencyCode,
      sendingreceivingCurrencyId:
        this.selectRecevingCurrencyValue != null
          ? this.selectRecevingCurrencyValue
          : this.mode.agentTransferRceivingCurrncyId
          ? this.mode.agentTransferRceivingCurrncyId
          : this.dataService.selectRecevingCurrencyValue,
      sendAmount: parseFloat(
        this.transferProcessView.get('sendAmount')!.value
      ).toFixed(2),
      amountReceived: parseFloat(
        this.transferProcessView.get('amountReceived')!.value
      ).toFixed(2),
      transactionMode: this.transferProcessView.get('transactionMode')!.value,
      paymentModeId: this.transferProcessView.get('paymentMode')!.value,
      PaymentType: this.PaymentType,
      transferFee: this.transferProcessView.get('transferFee')!.value,
      promoCode: this.transferProcessView.get('promoCode')!.value?.trim(),
      totalAmountPayable:
        this.transferProcessView.get('totalAmountPayable')!.value,
      agentSenderDetailsId: this.agentSenderDetailsId,
      // currencyRateId: this.currencyRateId,
      // givenCurrencyRate: this.givenCurrencyRate,
    };
  }

  saveDataforMakeTransferFlow() {
    this.dataService.makeTransferFlowSaveData = {
      sendAmount: parseFloat(
        this.transferProcessView.get('sendAmount')?.value.replace(/,/g, '')
      ),
      receivingmount: parseFloat(
        this.transferProcessView.get('amountReceived')?.value.replace(/,/g, '')
      ),
    };
  }

  changeTransactionMode(value: any) {
    // this.transferFee!.enable();
    // this.totalAmountPayable!.enable();
    this.transferProcessView.get('transferFee')?.reset();
    this.transferProcessView.get('totalAmountPayable')?.reset();
    const transactionModeId = this.transactionmodes?.find(
      (currency: any) => currency.agentCurrencyTransactionModeId === value
    );
    if (transactionModeId) {
      this.selectTransactionModeId =
        transactionModeId.agentCurrencyTransactionModeId;
      const modeofService = transactionModeId.transactionModeDesc;
      this.transactionId = transactionModeId.transactionModeId;
      this.dataService.ModeOfService = modeofService;

      this.dataService.transactionModeId = this.transactionId;
      console.log(
        'this.dataService.transactionModeId',
        this.dataService.transactionModeId
      );
    }

    this.transferProcessView.get('paymentMode')?.reset();

    this.resetPaymentField = true;

    // if( this.resetPaymentField = false){
    //    this.gtAllConfiguredTransactionFee();
    // }
  }

  saveFirstStep() {
    const body: any = {
      // sendingCurrency:
      //   this.dataService.AllFinalDataFirstStep.sendingCurrencyName,
      sendingCurrency: 'GBP',
      recipientCurrency: this.selectReceivingCurencycode
        ? this.selectReceivingCurencycode
        : this.dataService.startTrnxData.recevingCurrencyCode,
      sendAmount: this.dataService.AllFinalDataFirstStep.sendAmount,
      amountReceived: this.dataService.AllFinalDataFirstStep.amountReceived,
      // transactionMode: this.dataService.AllFinalDataFirstStep.transactionMode,
      transactionMode: this.dataService.ModeOfService,
      transferFeesMode: 'FIXED',
      transferFee: this.dataService.AllFinalDataFirstStep.transferFee,
      totalAmountPayable:
        this.dataService.AllFinalDataFirstStep.totalAmountPayable,
      rate: this.dataService.rate,
      // paymentMode: this.dataService.AllFinalDataFirstStep.PaymentType,
      paymentMode: this.paymandMode,
      // recipientCountry: this.dataService.AllFinalDataFirstStep.,
      date: format(new Date(), 'dd-MM-yyyy HH:mm'),
      status: '1stStep',
      agentName: this.dataService.agentSenderDetails.agentName,
      exposableId: this.dataService.agentSenderDetails.data,
      customerReference: this.dataService.customerReference,

      // ipAddress: "192.168.1.100"
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

  covertSendingToDecimal() {
    this.transferProcessView
      .get('sendAmount')
      ?.setValue(
        this.decimalPipe.transform(
          this.transferProcessView.get('sendAmount')?.value,
          '.2-2'
        )
      );
  }
  covertReceivingToDecimal() {
    this.transferProcessView
      .get('amountReceived')
      ?.setValue(
        this.decimalPipe.transform(
          this.transferProcessView.get('amountReceived')?.value,
          '.2-2'
        )
      );
  }
  validateNumber() {
    let inputType = this.transferProcessView.get('sendAmount')?.value;
    inputType = inputType.replace(/,/g, '').replace(/\./g, '');
    if (/\D/.test(inputType)) {
      this.notificationService.create(
        'error',
        'Error',
        'Amount must contain only numbers.',
        {
          nzStyle: { background: '#cc2d2d', color: '#fff' },
        }
      );
      return;
    }
  }
  validateNumberRec() {
    let inputType = this.transferProcessView.get('amountReceived')?.value;
    inputType = inputType.replace(/,/g, '').replace(/\./g, '');
    if (/\D/.test(inputType)) {
      this.notificationService.create(
        'error',
        'Error',
        'Amount must contain only numbers.',
        {
          nzStyle: { background: '#cc2d2d', color: '#fff' },
        }
      );
      return;
    }
  }

  checkRatesValidOrNot() {
    const data: any = {};
    data['receivingAmount'] = parseFloat(
      this.transferProcessView.get('amountReceived')!.value.replace(/,/g, '')
    );
    data['sendingAmount'] = parseFloat(
      this.transferProcessView.get('sendAmount')!.value.replace(/,/g, '')
    );
    (data['totalPayable'] = parseFloat(
      this.transferProcessView
        .get('totalAmountPayable')!
        .value.replace(/,/g, '')
    )),
      (data['fee'] = parseFloat(
        this.transferProcessView.get('transferFee')!.value.replace(/,/g, '')
      )),
      (data['currencyRate'] = parseFloat(this.dataService.rate));
    data['isSendingAmount'] = this.dataService.isSendingAmout;

    this.tranferFlowService
      .checkRatesvalidOrNot(data)
      .pipe(takeUntil(this.distroy$))
      .subscribe((res: any) => {
        if (res['responseDto']) {
          if (res['responseDto']['status'] == false) {
            this.dataService.ratesvalid = false;
            this.FirstIndexvalue.emit(0);
            this.notificationService.create(
              'error',
              'error',
              res['responseDto']['errorDescription'],
              {
                nzStyle: { background: '#cc2d2d', color: '#ffff' },
              }
            );
            console.log('rates value', this.dataService.ratesvalid);
          } else {
            this.dataService.ratesvalid = true;
            this.FirstIndexvalue.emit(1);
            console.log(
              'this.dataService.ratesvalid',
              this.dataService.ratesvalid
            );
            // this.notificationService.create(
            //   'success',
            //   'Success',
            //   res['responseDto'],
            //   {
            //     nzStyle: { background: '#00A03E', color: '#ffff' },
            //   }
            // );
          }
        } else {
          this.dataService.ratesvalid = false;
          this.FirstIndexvalue.emit(0);
          this.notificationService.create(
            'error',
            'Error',
            'Incorrect calculations',
            {
              nzStyle: { background: '#cc2d2d', color: '#fff' },
            }
          );
        }
      });
  }

  numberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
