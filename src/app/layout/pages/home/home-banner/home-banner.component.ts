import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Subject, takeUntil } from 'rxjs';
import { AgentDetailsDataServiceService } from 'src/app/_services/agent-details-data.service';
import { CurrencyConversionLocalService } from 'src/app/_services/currency-conversion-local.service';
import { CurrencydataService } from 'src/app/_services/currency-data.service';
import { DataService } from 'src/app/_services/shared-data/data.service';
import { TransferFlowComponent } from 'src/app/layout/components/transfer-flow/transfer-flow.component';
import { LoginComponent } from '../../login/login.component';
import { TokenService } from 'src/app/_services/token.service';
import { CommonService } from 'src/app/_services/common.service';
import { Router } from '@angular/router';
import { TranferFlowService } from 'src/app/_services/tranfer-flow.service';
import { TokenStorageServiceService } from 'src/app/_services/token-storage-service.service';
import { CorporateAccountsChangeService } from 'src/app/_services/corporate-accounts-change.service';
import { DecimalPipe } from '@angular/common';
import { CheckIdDocumentsComponent } from '../../check-id-documents/check-id-documents.component';
import { countryData } from 'src/app/data/countryData';

@Component({
  selector: 'app-home-banner',
  templateUrl: './home-banner.component.html',
  styleUrls: ['./home-banner.component.sass'],
})
export class HomeBannerComponent {
  sendingCurrencies: any;
  recipientCurrencies: any;
  rateEquation = '';

  allDataInHome = {};

  sendingCurrencySelectedValue: any;

  currencyCodeValue: any; //currency code value

  selectedCurrencyCode: any; //selected currency code
  selectedCurrencyId: any; //selected currency id

  selectedRecivingCurrencyCode: any; //selected reciving currency code
  selectedRecivingCurrencyId: any; //selected reciving currency id

  selectedSendamountValue: any; //selected send Amount value
  selectedRecivedamountValue: any; //selected Reciving Amount value

  selectedRecivingCurrencyAll: any;
  selectedSendingCurrencyAll: any;

  agentExposableId: any;

  isLogin!: boolean;

  private unsubscribe$ = new Subject<void>();

  public transferDetailsForm!: FormGroup;

  isRecieverAmountChanged = false;
  isSenderAmountChanged = false;

  appheader!: boolean;
  currentUser: any;
  useRouterForCode: any;
  useRouterForName: any;

  agentTransferRceivingCurrncyId: any;
  onlyREcevingCurrancyCode: any;
  savedUserName: any;

  get currentRoute(): string {
    return this.router.url;
  }

  title =
    'Spot On Money transfers.<br> Now send money to Asia, UAE, Africa and beyond';

  description = 'An efficient and effective way to send money worldwide';

  country = '';
  uniqueTitle: any;
  constructor(
    private fb: FormBuilder,
    private modalService: NzModalService,
    public dataService: DataService,
    private currencyDataService: CurrencydataService,
    private agentDetailsDataService: AgentDetailsDataServiceService,
    private currencyConversionLocalService: CurrencyConversionLocalService,
    private notificationService: NzNotificationService,
    private tokenStorage: TokenService,
    private commonService: CommonService,
    private router: Router,
    private transferflowService: TranferFlowService,
    private tokenStorageService: TokenStorageServiceService,
    private corporateAccountsChangeService: CorporateAccountsChangeService,
    private decimalPipe: DecimalPipe
  ) {
    this.currentUser = this.commonService.parseJwt(tokenStorage.getToken());
    this.savedUserName = this.tokenStorage.getPrivileges();
    console.log('this.savedUserName', this.savedUserName);
    // console.log('user data', this.currentUser);

    // this.dataService.userId = this.currentUser.user_id;
  }

  ngOnInit() {
    this.isLogin = this.dataService.isLoggedIn;
    // console.log('log welada nedd', this.isLogin);

    this.transferDetailsForm = this.fb.group({
      sendingCurrency: [''],
      recipientCurrency: [''],
      sendAmount: [''],
      amountReceived: [''],
      rate: [''],
    });

    this.transferDetailsForm
      .get('sendingCurrency')!
      .valueChanges.pipe(takeUntil(this.unsubscribe$))
      .subscribe((selectedSendiingCurrencyCode: any) => {
        const selectedSendingCurrency = this.sendingCurrencies?.find(
          (currency: any) =>
            currency.currencyCode === selectedSendiingCurrencyCode
        );
        if (selectedSendingCurrency) {
          this.selectedSendingCurrencyAll = selectedSendingCurrency;
          this.selectedCurrencyCode = selectedSendingCurrency.currencyCode;
          this.selectedCurrencyId = selectedSendingCurrency.currencyId;
          this.dataService.sendingCurrencyId =
            selectedSendingCurrency.agentTransferApprovedSendingCurrenciesId;
        }
      });

    this.transferDetailsForm
      .get('recipientCurrency')!
      .valueChanges.pipe(takeUntil(this.unsubscribe$))
      .subscribe((selectedRecivedCurrencyCode: any) => {
        const selectedRecivingCurrency = this.recipientCurrencies?.find(
          (currency: any) => currency.currencyId === selectedRecivedCurrencyCode
        );
        if (selectedRecivingCurrency) {
          this.onlyREcevingCurrancyCode = selectedRecivingCurrency.currencyCode;
          this.selectedRecivingCurrencyAll = selectedRecivingCurrency;
          this.selectedRecivingCurrencyCode =
            selectedRecivingCurrency.currencyCode +
            '-' +
            selectedRecivingCurrency.currencyName;

          this.selectedRecivingCurrencyId = selectedRecivingCurrency.currencyId;
          this.agentTransferRceivingCurrncyId =
            selectedRecivingCurrency.agentTransferApprovedSendingReceivingCurrenciesId;
          this.dataService.selectRecevingCurrencyValue =
            selectedRecivingCurrency.agentTransferApprovedReceivingCurrenciesId;

          if (this.recipientCurrency?.value === null) {
            this.useRouterForCode = '';
            this.useRouterForName = '';
          }
          this.useRouterForCode = selectedRecivingCurrency.currencyCode;
          this.useRouterForName = selectedRecivingCurrency.currencyName;
        }
      });

    this.transferDetailsForm.patchValue({
      sendingCurrency: this.selectedCurrencyCode,
      recipientCurrency: this.selectedRecivingCurrencyCode,
    });

    this.getExposableId();

    // this.getRecipientCurrencies();
    // this.getSendingCurrencies();
  }

  get recipientCurrency() {
    return this.transferDetailsForm.get('recipientCurrency');
  }
  get sendingCurrency() {
    return this.transferDetailsForm.get('sendingCurrency');
  }
  get sendAmount() {
    return this.transferDetailsForm.get('sendAmount');
  }
  get amountReceived() {
    return this.transferDetailsForm.get('amountReceived');
  }
  get rate() {
    return this.transferDetailsForm.get('rate');
  }

  validate(type: string, sendReceive: any) {
    let hasError = false;

    if (type === 'ripple') {
      if (
        (this.sendingCurrency!.value != null || this.sendAmount!.value) &&
        (this.recipientCurrency!.value === null ||
          this.recipientCurrency!.value === '')
      ) {
        // this.recipientCurrency!.markAsDirty();
        // this.recipientCurrency!.markAsTouched();
        // this.recipientCurrency!.updateValueAndValidity();
        this.notificationService.create(
          'error',
          'Input Error',
          'Recipient Currency must be Selected',
          { nzStyle: { background: '#cc2d2d', color: '#0000' } }
        );
        hasError = true;
      }

      if (
        this.sendingCurrency!.value == null ||
        this.sendingCurrency!.value === ''
      ) {
        // this.sendingCurrency!.markAsDirty();
        // this.sendingCurrency!.updateValueAndValidity();
        this.notificationService.create(
          'error',
          'Input Error',
          'Sending Currency must be Selected',
          { nzStyle: { background: '#cc2d2d', color: '#0000' } }
        );
        hasError = true;
      }

      if (sendReceive === 'send') {
        if (!this.sendAmount!.value) {
          // this.sendAmount!.markAsDirty();
          // this.sendAmount!.updateValueAndValidity();
          this.notificationService.create(
            'error',
            'Input Error',
            'Sending Amount cannot be empty',
            { nzStyle: { background: '#cc2d2d', color: '#0000' } }
          );
          hasError = true;
        }
      }

      if (sendReceive === 'receive') {
        if (!this.amountReceived!.value) {
          // this.amountReceived!.markAsDirty();
          // this.amountReceived!.updateValueAndValidity();
          this.notificationService.create(
            'error',
            'Input Error',
            'Receiving Amount cannot be empty',
            { nzStyle: { background: '#cc2d2d', color: '#0000' } }
          );
          hasError = true;
        }
      }
    }

    return hasError;
  }

  getExposableId() {
    // const data:any = {};
    // data['username']
    this.agentDetailsDataService
      .getAgentExposableId()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (res: any) => {
          this.agentExposableId = res['responseDto']['data'];
          this.getSendingCurrencies();
          // console.log('agentExposableId', this.agentExposableId);
        },
        error: () => {
          this.agentExposableId = '';
        },
      });
  }

  getSendingCurrencies() {
    const data: any = {};
    data['agentExposableId'] = this.agentExposableId;

    this.currencyDataService
      .getSendingCurrenciesByExposableId(data)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (res: any) => {
          if (res['responseDto']) {
            this.sendingCurrencies = res['responseDto'];
            this.currencyCodeValue = this.sendingCurrencies.map(
              (currency: any) => currency.currencyCode
            );
            // console.log('currencyCodeValue', this.currencyCodeValue);
            this.getRecipientCurrencies();
          }
        },
        error: (err: any) => {},
      });
  }

  getRecipientCurrencies() {
    const data: any = {};
    data['currencyCode'] = this.currencyCodeValue;
    data['agentExposableId'] = this.agentExposableId;

    this.currencyDataService
      .getSendingReceivingCurrency(data)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (res: any) => {
          this.recipientCurrencies = res['responseDto'];
        },
        error: (err: any) => {
          this.recipientCurrencies = null;
        },
      });
  }

  getSenderRates() {
    const recipientData = this.recipientCurrency?.value;
    const sendingData = this.sendingCurrency?.value;
    const data: any = {};
    data['requestType'] = 'sendamount';
    data['agentExposableId'] = this.agentExposableId;
    data['sendingCurrencyId'] = this.selectedCurrencyId;
    data['receivingCurrencyId'] = this.selectedRecivingCurrencyId;

    data['amount'] = parseFloat(this.amountReceived?.value.replace(/,/g, ''));

    data['providerType'] = 'MONEX';
    data['email'] = this.dataService.loggedInUser
      ? this.dataService.loggedInUser
      : this.savedUserName;

    this.transferflowService
      .getAgntTransactionRatsReceived(data)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (res: any) => {
          if (res['responseDto']) {
            if (res['responseDto']['sendingAmount'] < 10) {
              this.notificationService.create(
                'error',
                'Error',
                'Minimum sending amount is 10.00',
                { nzStyle: { background: '#cc2d2d', color: '#fff' } }
              );
              this.transferDetailsForm.patchValue({
                sendAmount: '',
              });
            } else {
              if (
                res['responseDto']['sendingAmount'] ==
                data.amount / res['responseDto']['rate']
              ) {
                this.transferDetailsForm.patchValue({
                  amountReceived: res['responseDto'][
                    'receivingAmount'
                  ].toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }),
                  sendAmount: res['responseDto'][
                    'sendingAmount'
                  ].toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }),
                  rate:
                    res['responseDto']['sendingCurrency'] +
                    '1 = ' +
                    res['responseDto']['receivingCurrency'] +
                    res['responseDto']['rate'].toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 6,
                    }),
                });
                this.dataService.isSendingAmout = false;
                // this.startTransaction();
                this.rateEquation = this.rate!.value;
                this.dataService.rate = res['responseDto']['rate'];
                this.dataService.rateId = res['responseDto']['currencyRateId'];
              } else {
                this.notificationService.create(
                  'error',
                  'Error',
                  'Invalid Amount',
                  { nzStyle: { background: '#cc2d2d', color: '#fff' } }
                );
              }
            }
          } else {
            this.notificationService.create(
              'error',
              'Error',
              'Unable to retrieve currency conversion rates',
              { nzStyle: { background: '#cc2d2d', color: '#fff' } }
            );

            this.transferDetailsForm.patchValue({
              sendAmount: '',
              rate: '',
            });
            this.rateEquation = '';
          }
        },
      });
  }

  getRecieverRates(value: any) {
    if (this.sendAmount?.value < 10) {
      if (value === 1) {
        this.notificationService.create(
          'error',
          'Error',
          'Minimum sending amount is 10.00',
          { nzStyle: { background: '#cc2d2d', color: '#fff' } }
        );
        this.transferDetailsForm.patchValue({
          amountReceived: '',
        });
      }
    } else {
      const recipientData = this.selectedRecivingCurrencyAll;
      const sendingData = this.selectedSendingCurrencyAll;
      const data: any = {};
      data['requestType'] = 'SENDAMOUNT';
      data['agentExposableId'] = this.agentExposableId;
      data['sendingCurrencyId'] = this.selectedCurrencyId;
      data['receivingCurrencyId'] = this.selectedRecivingCurrencyId;
      // data['amount'] = this.selectedSendamountValue;
      data['providerType'] = 'MONEX';
      data['email'] = this.dataService.loggedInUser
        ? this.dataService.loggedInUser
        : this.savedUserName;
      // data['amount'] = value;

      data['amount'] = parseFloat(this.sendAmount?.value.replace(/,/g, ''));

      this.transferflowService
        .getAgntTransactionRats(data)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe({
          next: (res: any) => {
            if (res['responseDto']) {
              if (
                res['responseDto']['receivingAmount'] ==
                data.amount * res['responseDto']['rate']
              ) {
                if (this.selectedSendamountValue > 5000) {
                  this.notificationService.create(
                    'error',
                    'Error',
                    'Maximum sending Amount is 5000.00, Please contact us on 0207 341 7300',
                    { nzStyle: { background: '#cc2d2d', color: '#fff' } }
                  );

                  this.transferDetailsForm.patchValue({
                    amountReceived: res['responseDto'][
                      'receivingAmount'
                    ].toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }),
                    sendAmount: 1,
                  });
                  this.dataService.rate = res['responseDto']['rate'];
                  this.dataService.rateId =
                    res['responseDto']['currencyRateId'];
                } else if (this.selectedSendamountValue < 10) {
                  this.notificationService.create(
                    'error',
                    'Error',
                    'Minimum sending Amount is 10.00',
                    { nzStyle: { background: '#cc2d2d', color: '#fff' } }
                  );

                  this.transferDetailsForm.patchValue({
                    amountReceived: '',
                    sendAmount: '10',
                  });
                  this.dataService.rate = res['responseDto']['rate'];
                  this.dataService.rateId =
                    res['responseDto']['currencyRateId'];
                } else {
                  this.dataService.isSendingAmout = true;

                  this.transferDetailsForm.patchValue({
                    amountReceived: res['responseDto'][
                      'receivingAmount'
                    ].toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }),

                    rate:
                      res['responseDto']['sendingCurrency'] +
                      ' 1 = ' +
                      res['responseDto']['receivingCurrency'] +
                      ' ' +
                      res['responseDto']['rate'].toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 6,
                      }),
                  });
                  this.dataService.rate = res['responseDto']['rate'];
                  this.dataService.rateId =
                    res['responseDto']['currencyRateId'];
                  // this.startTransaction();
                }
                this.rateEquation = this.rate!.value;
                // this.getSenderRates();
              } else {
                this.notificationService.create(
                  'error',
                  'Error',
                  'Unable to retrieve currency conversion rates',
                  { nzStyle: { background: '#cc2d2d', color: '#fff' } }
                );
              }
            } else {
              this.notificationService.create(
                'error',
                'Error',
                'Invalid Amount',
                { nzStyle: { background: '#cc2d2d', color: '#fff' } }
              );
              this.rateEquation = '';
              // this.transferDetailsForm.patchValue({
              //   amountReceived: '',
              //   rate: '',
              // });
            }
          },
        });
    }
  }

  getSenderRatesWithoutValues() {
    this.setRouterUrl();

    const recipientData = this.selectedRecivingCurrencyCode;
    const sendingData = this.selectedCurrencyCode;

    const data: any = {};
    data['requestType'] = 'sendamount';
    data['agentExposableId'] = this.agentExposableId;
    data['sendingCurrencyId'] = this.selectedCurrencyId;
    data['receivingCurrencyId'] = this.agentTransferRceivingCurrncyId;
    data['providerType'] = 'MONEX';
    if (this.selectedSendamountValue) {
      data['amount'] = parseFloat(
        this.selectedSendamountValue.replace(/,/g, '')
      );
    } else {
      data['amount'] = 1;
    }
    data['agentExposableId'] = this.agentExposableId;
    data['providerType'] = 'MONEX';
    this.currencyConversionLocalService
      .getCurrencyConversionDetailsExternal(data)
      .subscribe((res) => {
        if (res['responseDto']) {
          if (this.selectedRecivedamountValue) {
            this.transferDetailsForm.patchValue({
              sendAmount: res['responseDto']['sendingAmount'].toLocaleString(
                'en-US',
                {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }
              ),
            });
          }
          this.transferDetailsForm.patchValue({
            rate:
              res['responseDto']['sendingCurrency'] +
              ' 1 = ' +
              res['responseDto']['receivingCurrency'] +
              ' ' +
              res['responseDto']['rate'].toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 6,
              }),
          });
          this.rateEquation = this.rate!.value;
          // console.log(recipientData['agentTransferApprovedReceivingCurrenciesDto']['clientCurrencyDto']['currencyDto']);
          if (recipientData == 'LKR - Sri Lankan Rupee (Local)') {
            this.notificationService.create(
              'success',
              'Success',
              'Collecting amount must be in nearest hundred. ',
              { nzStyle: { background: '#00A03E', color: '#fff' } }
            );
          }
        } else {
          this.notificationService.create(
            'error',
            'Error',
            'Unable to retrieve currency conversion rates',
            { nzStyle: { background: '#cc2d2d', color: '#fff' } }
          );
          this.transferDetailsForm.patchValue({
            sendAmount: '',
            rate: '',
          });
          this.rateEquation = '';
        }
      });
  }

  getRecieverRatesWithoutValues() {
    this.setRouterUrl();
    const recipientData = this.selectedRecivingCurrencyCode;
    const sendingData = this.selectedCurrencyCode;

    const data: any = {};
    data['requestType'] = 'sendamount';
    data['agentExposableId'] = this.agentExposableId;
    data['sendingCurrencyId'] = this.selectedCurrencyId;
    data['receivingCurrencyId'] = this.selectedRecivingCurrencyId;
    data['providerType'] = 'MONEX';
    data['email'] = this.currentUser?.sub;
    if (this.selectedSendamountValue) {
      data['amount'] = parseFloat(
        this.selectedSendamountValue.replace(/,/g, '')
      );
    } else {
      data['amount'] = 1;
    }
    data['agentExposableId'] = this.agentExposableId;
    data['providerType'] = 'MONEX';

    this.currencyConversionLocalService
      .getCurrencyConversionDetailsExternal(data)
      .subscribe((res) => {
        if (res['responseDto']) {
          if (this.selectedSendamountValue) {
            this.transferDetailsForm.patchValue({
              sendAmount: res['responseDto']['receivingAmount'].toLocaleString(
                'en-US',
                {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }
              ),
              amountReceived: res['responseDto'][
                'receivingAmount'
              ].toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }),
            });
            this.dataService.currencyRateId =
              res['responseDto']['currencyRateId'];
          }

          this.transferDetailsForm.patchValue({
            rate:
              res['responseDto']['sendingCurrency'] +
              ' 1 = ' +
              res['responseDto']['receivingCurrency'] +
              ' ' +
              res['responseDto']['rate'].toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 6,
              }),
          });

          this.rateEquation = this.rate!.value;
        } else {
          this.notificationService.create(
            'error',
            'Error',
            'Unable to retrieve currency conversion rates',
            { nzStyle: { background: '#cc2d2d', color: '#fff' } }
          );
          this.rateEquation = '';
          this.transferDetailsForm.patchValue({
            amountReceived: '',
            rate: '',
          });
        }
      });
  }

  startTransaction() {
    if (this.sendAmount?.value < 10) {
      this.notificationService.create(
        'error',
        'Error',
        'Minimum sending amount is 10.00',
        { nzStyle: { background: '#cc2d2d', color: '#fff' } }
      );
    } else {
      this.dataService.recevingCurrencyCode = this.onlyREcevingCurrancyCode;
      // console.log(
      //   'this.dataService.recevingCurrencyCode',
      //   this.dataService.recevingCurrencyCode
      // );
      this.allDataInHome = {
        recevingCurrencyCode: this.onlyREcevingCurrancyCode,
        sendCurrency: this.selectedCurrencyId,
        recevingCurrency: this.recipientCurrency?.value,
        sendAmount: parseFloat(this.sendAmount?.value.replace(/,/g, ''))
          ? parseFloat(this.sendAmount?.value.replace(/,/g, ''))
          : undefined,
        recevingAmount: parseFloat(this.amountReceived?.value.replace(/,/g, ''))
          ? parseFloat(this.amountReceived?.value.replace(/,/g, ''))
          : undefined,
        agentSendingReceivingCurrencyId: this.agentTransferRceivingCurrncyId,
        agentTransferRceivingCurrncyId: this.agentTransferRceivingCurrncyId,
      };
      // (this.dataService.agentTransferRceivingCurrncyId =
      //   this.agentTransferRceivingCurrncyId),
      this.dataService.startTrnxData = this.allDataInHome;
      this.openLoginModal(this.allDataInHome);
      // console.log('transaction data', this.allDataInHome);
    }
  }
  recieverAmountChanged(event: any) {
    this.isRecieverAmountChanged = true;
    this.isSenderAmountChanged = false;
  }
  openLoginModal(values: any) {
    if (!this.dataService.isLoggedIn) {
      this.modalService.create({
        nzContent: LoginComponent,
        nzWidth: 510,
        nzFooter: null,
        nzKeyboard: false,
        nzClosable: true,
      });
    } else {
      const modal = this.modalService.create({
        // nzTitle:'Transfer Process',
        nzContent: TransferFlowComponent,
        nzWidth: 1012,
        nzClassName: 'view-trans-modal',
        nzFooter: null,
      });
      modal.componentInstance!.mode = values;
      modal.componentInstance!.mytransaction = false;

      modal.afterClose.subscribe(() => {
        // window.location.reload();
      });
    }
  }

  handleSendAmountClick() {
    if (!this.dataService.isLoggedIn) {
      // User is not logged in, open login modal
      this.modalService.create({
        nzContent: LoginComponent,
        nzWidth: 510,
        nzFooter: null,
        nzKeyboard: false,
        nzClosable: true,
      });
    }
  }

  findReceivingCurrencyCode() {
    console.log('recepient value', this.recipientCurrency?.value);
    const selectedRecivingCurrencyforUrl = this.recipientCurrencies?.find(
      (currency: any) => currency.currencyId === this.recipientCurrency?.value
    );
    if (selectedRecivingCurrencyforUrl) {
      this.onlyREcevingCurrancyCode =
        selectedRecivingCurrencyforUrl.currencyCode;
      this.selectedRecivingCurrencyAll = selectedRecivingCurrencyforUrl;
      this.selectedRecivingCurrencyCode =
        selectedRecivingCurrencyforUrl.currencyCode +
        '-' +
        selectedRecivingCurrencyforUrl.currencyName;

      if (this.recipientCurrency?.value === null) {
        this.useRouterForCode = '';
        this.useRouterForName = '';
      }
      this.useRouterForCode = selectedRecivingCurrencyforUrl.currencyCode;
      this.useRouterForName = selectedRecivingCurrencyforUrl.currencyName;
      console.log('useRouterForCode', this.useRouterForCode);
      console.log('useRouterForName', this.useRouterForName);
      // this.setRouterUrl();
    }
  }

  setRouterUrl() {
    if (this.useRouterForCode === 'LKR') {
      this.router.navigate(['/send-money-to-sri-lanka']);
      this.country = 'sri lanka';
    } else if (this.useRouterForName === 'Bangladeshi Taka') {
      this.country = 'Bangladesh';
      this.router.navigate(['/send-money-to-bangladesh']);
    } else if (this.useRouterForName === 'Nigerian Naira') {
      this.country = 'Nigeria';
      this.router.navigate(['/send-money-to-nigeria']);
    } else if (this.useRouterForName === 'Congo (USD)') {
      this.country = 'Congo DRC';
      this.router.navigate(['/send-money-to-congo-drc']);
    } else if (this.useRouterForName === 'Pesso') {
      this.country = 'Philippines';
      this.router.navigate(['/send-money-to-philippines']);
    } else if (this.useRouterForName === 'Indian Rupee') {
      this.router.navigate(['/send-money-to-india']);
      this.country = 'India';
    } else if (this.useRouterForName === 'Thai bath') {
      this.router.navigate(['/send-money-to-thailand']);
      this.country = 'Thailand';
    } else if (this.useRouterForName === 'Malaysian Ringgit') {
      this.router.navigate(['/send-money-to-malaysia']);
      this.country = 'Malaysia';
    } else if (this.useRouterForName === 'Hong Kong Dollar') {
      this.router.navigate(['/send-money-to-hong-kong']);
      this.country = 'Hong-Kong';
    } else if (this.useRouterForName === 'Canadian Dollar') {
      this.router.navigate(['/send-money-to-canada']);
      this.country = 'Canada';
    } else if (this.useRouterForName === 'Kenyan Shilling') {
      this.router.navigate(['/send-money-to-kenya']);
      this.country = 'Kenya';
    } else if (this.useRouterForName === 'UAE Dirham') {
      this.router.navigate(['/send-money-to-united-arab-emirates']);
      this.country = 'United-arab-emirates';
    } else if (this.useRouterForName === 'US Dollars') {
      this.router.navigate(['/send-money-in-usa']);
      this.country = 'USA';
    } else if (this.useRouterForName === 'Nepal Rupee') {
      this.router.navigate(['/send-money-to-nepal']);
      this.country = 'Nepal';
    } else if (this.useRouterForName === 'Ghana Cedis') {
      this.router.navigate(['/send-money-to-ghana']);
      this.country = 'Ghana';
    }
    ///////////////////////////// -------- ////////////////////
    else if (this.useRouterForName === 'Belgium (EUR)') {
      this.router.navigate(['/send-money-to-belgium']);
      this.country = 'Belgium';
    } else if (this.useRouterForName === 'Estonia (EUR)') {
      this.router.navigate(['/send-money-to-estonia']);
      this.country = 'Estonia';
    } else if (this.useRouterForName === 'France (EUR)') {
      this.router.navigate(['/send-money-to-france']);
      this.country = 'France';
    } else if (this.useRouterForName === 'Australian dollar') {
      this.router.navigate(['/send-money-to-australia']);
      this.country = 'Australia';
    } else if (this.useRouterForName === 'Bahraini Dinar') {
      this.router.navigate(['/send-money-to-bahrain']);
      this.country = 'Bahrain';
    } else if (this.useRouterForName === 'Chinese yuan renminbi') {
      this.router.navigate(['/send-money-to-china']);
      this.country = 'China';
    } else if (this.useRouterForName === 'Croatian Kuna') {
      this.router.navigate(['/send-money-to-croatia']);
      this.country = 'Croatia';
    } else if (this.useRouterForName === 'Danish Krone') {
      this.router.navigate(['/send-money-to-denmark']);
      this.country = 'Denmark';
    } else if (this.useRouterForName === 'EURO') {
      this.router.navigate(['/send-money-in-europe']);
      this.country = 'Europe';
    } else if (this.useRouterForName === 'Hungarian Forint') {
      this.router.navigate(['/send-money-to-hungary']);
      this.country = 'Hungary';
    } else if (this.useRouterForName === 'Indonesian Rupiah') {
      this.router.navigate(['/send-money-to-indonesia']);
      this.country = 'Indonesia';
    } else if (this.useRouterForName === 'Israeli Shekel') {
      this.router.navigate(['/send-money-to-israel']);
      this.country = 'Israel';
    } else if (this.useRouterForName === 'Japanese Yen') {
      this.router.navigate(['/send-money-to-japan']);
      this.country = 'Japan';
    } else if (this.useRouterForName === 'Kuwaiti Dinar') {
      this.router.navigate(['/send-money-to-kuwait']);
      this.country = 'Kuwait';
    } else if (this.useRouterForName === 'Mexican Peso') {
      this.router.navigate(['/send-money-to-mexico']);
      this.country = 'Mexico';
    } else if (this.useRouterForName === 'New Zealand Dollar') {
      this.router.navigate(['/send-money-to-new-zealand']);
      this.country = 'Zealand';
    } else if (this.useRouterForName === 'Norwegian Krone') {
      this.router.navigate(['/send-money-to-norway']);
      this.country = 'Norway';
    } else if (this.useRouterForName === 'Omani Rial') {
      this.router.navigate(['/send-money-to-oman']);
      this.country = 'Oman';
    } else if (this.useRouterForName === 'Poland Zloty') {
      this.router.navigate(['/send-money-to-poland']);
      this.country = 'Poland';
    } else if (this.useRouterForName === 'Qatari Riyal') {
      this.router.navigate(['/send-money-to-qatar']);
      this.country = 'Qatar';
    } else if (this.useRouterForName === 'Saudi Riyal') {
      this.router.navigate(['/send-money-to-saudi-arabia']);
      this.country = 'Saudi-Arabia';
    } else if (this.useRouterForName === 'Singapore Dollar') {
      this.router.navigate(['/send-money-to-singapore']);
      this.country = 'Singapore';
    } else if (this.useRouterForName === 'South African Rand') {
      this.router.navigate(['/send-money-to-south-africa']);
      this.country = 'South-africa';
    } else if (this.useRouterForName === 'Swedish Krona') {
      this.router.navigate(['/send-money-to-sweden']);
      this.country = 'Sweden';
    } else if (this.useRouterForName === 'Swiss Franc') {
      this.router.navigate(['/send-money-to-switzerland']);
      this.country = 'Switzerland';
    } else if (this.useRouterForName === 'Turkish Lira') {
      this.router.navigate(['/send-money-to-turkey']);
      this.country = 'Turkey';
    } else if (this.useRouterForName === 'Ugandan Shilling') {
      this.router.navigate(['/send-money-to-uganda']);
      this.country = 'Uganda';
    } else if (this.useRouterForName === 'Afghan Afghani') {
      this.router.navigate(['/send-money-to-afghanistan']);
      this.country = 'Afghanistan';
    } else if (this.useRouterForName === 'CFA Franc BCEAO') {
      this.router.navigate(['/send--to-CFAfranc']);
      this.country = 'CFA franc';
    } else if (this.useRouterForName === 'Bostwana Pula') {
      this.router.navigate(['/send-money-to-botswana']);
      this.country = 'Botswana';
    } else if (
      this.useRouterForName === 'Burkina Faso (West African CFA Franc)'
    ) {
      this.router.navigate(['/send-money-to-burkina-faso']);
      this.country = 'Burkina-faso';
    } else if (this.useRouterForName === 'Burundian Franc') {
      this.router.navigate(['/send-money-to-burundi']);
      this.country = 'Burundi';
    } else if (this.useRouterForName === 'Cambodian Riel') {
      this.router.navigate(['/send-money-to-cambodia']);
      this.country = 'Cambodia';
    } else if (this.useRouterForName === 'Philippine Peso') {
      this.router.navigate(['/send-money-to-phillipines']);
      this.country = 'Phillipines';
    } else if (this.useRouterForName === 'Vietnamese Dong') {
      this.router.navigate(['/send-money-to-vietnam']);
      this.country = 'Vietnam';
    } else if (this.useRouterForName === 'Pakistani rupee') {
      this.router.navigate(['/send-money-to-pakistan']);
      this.country = 'Pakistan';
    } else if (this.useRouterForName === 'Ethiopian Birr') {
      this.router.navigate(['/send-money-to-ethiopia']);
      this.country = 'Ethiopia';
    } else if (this.useRouterForName === 'Russian Ruble') {
      this.router.navigate(['/send-money-to-russia']);
      this.country = 'Russia';
    } else if (this.useRouterForName === 'Rwandan Franc') {
      this.router.navigate(['/send-money-to-rwanda']);
      this.country = 'Rwanda';
    } else if (this.useRouterForName === 'Rwandan Franc') {
      this.router.navigate(['/send-money-to-tanzania']);
      this.country = 'Tanzania';
    } else if (this.useRouterForName === 'EURO') {
      this.router.navigate(['/send-money-in-europe']);
      this.country = 'Europe';
    } else if (this.useRouterForName === 'British Pound') {
      this.router.navigate(['/']);
    } else if (this.useRouterForName === '') {
      this.router.navigate(['/']);
    }

    this.dataService.sendingCurrency = this.sendingCurrency!.value;
    this.dataService.recipientCurrency = this.recipientCurrency!.value;
    // console.log(
    //   'receving currency value for router ',
    //   this.dataService.recipientCurrency
    // );
  }

  covertSendingToDecimal() {
    this.transferDetailsForm
      .get('sendAmount')
      ?.setValue(
        this.decimalPipe.transform(
          this.transferDetailsForm.get('sendAmount')?.value,
          '.2-2'
        )
      );
  }
  covertReceivingToDecimal() {
    this.transferDetailsForm
      .get('amountReceived')
      ?.setValue(
        this.decimalPipe.transform(
          this.transferDetailsForm.get('amountReceived')?.value,
          '.2-2'
        )
      );
  }

  validateNumber() {
    let inputType = this.transferDetailsForm.get('sendAmount')?.value;
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
    let inputType = this.transferDetailsForm.get('amountReceived')?.value;
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
  numberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  changeCountry() {}
}
