import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginComponent } from '../../login/login.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { DataService } from 'src/app/_services/shared-data/data.service';
import { TransferFlowComponent } from 'src/app/layout/components/transfer-flow/transfer-flow.component';
import { CurrencydataService } from 'src/app/_services/currency-data.service';
import { Subject, take, takeUntil } from 'rxjs';
import { AgentDetailsDataServiceService } from 'src/app/_services/agent-details-data.service';
import { CurrencyConversionLocalService } from 'src/app/_services/currency-conversion-local.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { TokenService } from 'src/app/_services/token.service';
import { CommonService } from 'src/app/_services/common.service';
import { ActivatedRoute } from '@angular/router';
import { SignUpService } from 'src/app/_services/sign-up.service';
import { CorporateAccountsChangeService } from 'src/app/_services/corporate-accounts-change.service';
import { TokenStorageServiceService } from 'src/app/_services/token-storage-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent {
  sendingCurrencies: any;
  recipientCurrencies: any;
  rateEquation = '';

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
  destroy$: Subject<boolean> = new Subject<boolean>();
  agentExposableId: any;

  private unsubscribe$ = new Subject<void>();

  public transferDetailsForm!: FormGroup;

  isRecieverAmountChanged = false;
  isSenderAmountChanged = false;

  appheader!: boolean;
  currentUser: any;

  country: any;
  uniqueTitle: any;
  user_mail: any;
  token: any;
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
    private activatedRoute: ActivatedRoute,
    private authservice: ActivatedRoute,
    private signupservice: SignUpService,
    private corporateAccountsChangeService: CorporateAccountsChangeService,
    private tokenStorageService: TokenStorageServiceService
  ) {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.user_mail = params['username'];
      this.token = params['verify'];
      // console.log(params);

      if (this.user_mail) {
        this.verify();
      }
    });
  }

  ngOnInit() {
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
        const selectedSendingCurrency = this.sendingCurrencies.find(
          (currency: any) =>
            currency.currencyCode === selectedSendiingCurrencyCode
        );
        if (selectedSendingCurrency) {
          this.selectedSendingCurrencyAll = selectedSendingCurrency;
          this.selectedCurrencyCode = selectedSendingCurrency.currencyCode;
          this.selectedCurrencyId = selectedSendingCurrency.currencyId;
        }
      });

    this.transferDetailsForm
      .get('recipientCurrency')!
      .valueChanges.pipe(takeUntil(this.unsubscribe$))
      .subscribe((selectedRecivedCurrencyCode: any) => {
        const selectedRecivingCurrency = this.recipientCurrencies.find(
          (currency: any) =>
            currency.currencyCode === selectedRecivedCurrencyCode
        );
        if (selectedRecivingCurrency) {
          this.selectedRecivingCurrencyAll = selectedRecivingCurrency;
          this.selectedRecivingCurrencyCode =
            selectedRecivingCurrency.currencyCode;
          this.selectedRecivingCurrencyId =
            selectedRecivingCurrency.agentTransferApprovedReceivingCurrenciesId;
        }
      });

    this.transferDetailsForm
      .get('sendAmount')!
      .valueChanges.pipe(takeUntil(this.unsubscribe$))
      .subscribe((selectedSendAmountValue: string) => {
        if (selectedSendAmountValue) {
          this.selectedSendamountValue = selectedSendAmountValue;
          // console.log('sendAmount:', this.selectedSendamountValue);
        }
      });

    this.transferDetailsForm
      .get('amountReceived')!
      .valueChanges.subscribe((selectedValue: string) => {
        if (selectedValue) {
          this.selectedRecivedamountValue = selectedValue;
          // console.log('amountReceived:', this.selectedRecivedamountValue);
        }
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

  getExposableId() {
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

  // getExposableId() {
  //   const data: any = {};
  //   data['username'] = this.tokenStorageService.getUser();
  //   this.corporateAccountsChangeService
  //     .getCorporateExposableId(data)
  //     .pipe(takeUntil(this.unsubscribe$))
  //     .subscribe({
  //       next: (res: any) => {
  //         this.agentExposableId = res['responseDto']['agentExposableId'];
  //         this.getSendingCurrencies();
  //         console.log('agentExposableId', this.agentExposableId);
  //       },
  //       error: () => {
  //         this.agentExposableId = '';
  //       },
  //     });
  // }

  getSendingCurrencies() {
    // console.log('agentExposableId currency', this.agentExposableId);
    const data: any = {};
    data['agentExposableId'] = this.agentExposableId
      ? this.agentExposableId
      : '1234';
    // console.log('agentExposableId currency', data['agentExposableId']);
    this.currencyDataService.getSendingCurrenciesByExposableId(data).subscribe({
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
    data['amount'] = this.selectedSendamountValue;
    data['providerType'] = 'MONEX';

    this.currencyConversionLocalService
      .getCurrencyConversionDetailsExternal(data)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (res: any) => {
          if (res['responseDto']) {
            this.transferDetailsForm.patchValue({
              sendAmount: res['responseDto']['sendingAmount'],
              rate:
                res['responseDto']['sendingCurrency'] +
                '1 = ' +
                res['responseDto']['receivingCurrency'] +
                res['responseDto']['rate'],
            });
            this.rateEquation = this.rate!.value;
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

  getRecieverRates() {
    const recipientData = this.selectedRecivingCurrencyAll;
    const sendingData = this.selectedSendingCurrencyAll;
    const data: any = {};
    data['requestType'] = 'SENDAMOUNT';
    data['agentExposableId'] = this.agentExposableId;
    data['sendingCurrencyId'] = this.selectedCurrencyId;
    data['receivingCurrencyId'] = this.selectedRecivingCurrencyId;
    data['amount'] = this.selectedSendamountValue;
    data['providerType'] = 'MONEX';

    this.currencyConversionLocalService
      .getCurrencyConversionDetailsExternal(data)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (res: any) => {
          if (res['responseDto']) {
            if (recipientData.currencyCode === 'EUR') {
              if (res['responseDto']['receivingAmount'] < 1) {
                this.notificationService.create(
                  'error',
                  'Error',
                  'Minimum receiving amount is 1.00',
                  { nzStyle: { background: '#cc2d2d', color: '#fff' } }
                );
                this.transferDetailsForm.patchValue({
                  amountReceived: '',
                  sendAmount: '',
                });
              } else if (res['responseDto']['receivingAmount'] > 10000) {
                this.notificationService.create(
                  'error',
                  'Error',
                  'Maximum receiving amount is 10,000.00, Please contact us on 0207 341 7300',
                  { nzStyle: { background: '#cc2d2d', color: '#fff' } }
                );
                this.transferDetailsForm.patchValue({
                  amountReceived: '',
                  sendAmount: '',
                });
              } else {
                this.transferDetailsForm.patchValue({
                  sendAmount: this.selectedSendamountValue,
                  amountReceived: res['responseDto']['receivingAmount'],
                  rate:
                    res['responseDto']['sendingCurrency'] +
                    ' 1 = ' +
                    res['responseDto']['receivingCurrency'] +
                    ' ' +
                    res['responseDto']['rate'],
                });
                // this.getSenderRates();
              }
            } else if (recipientData.currencyCode === 'BDT') {
              if (res['responseDto']['receivingAmount'] < 50) {
                this.notificationService.create(
                  'error',
                  'Error',
                  'Minimum receiving amount is 50.00',
                  { nzStyle: { background: '#cc2d2d', color: '#fff' } }
                );
                this.transferDetailsForm.patchValue({
                  amountReceived: '',
                  sendAmount: '',
                });
              } else if (res['responseDto']['receivingAmount'] > 125000) {
                this.notificationService.create(
                  'error',
                  'Error',
                  'Maximum receiving amount is 125,000.00, Please contact us on 0207 341 7300',
                  { nzStyle: { background: '#cc2d2d', color: '#fff' } }
                );
                this.transferDetailsForm.patchValue({
                  amountReceived: '',
                  sendAmount: '',
                });
              } else {
                this.transferDetailsForm.patchValue({
                  sendAmount: this.selectedSendamountValue,
                  amountReceived: res['responseDto']['receivingAmount'],
                  rate:
                    res['responseDto']['sendingCurrency'] +
                    ' 1 = ' +
                    res['responseDto']['receivingCurrency'] +
                    ' ' +
                    res['responseDto']['rate'],
                });
                // this.getSenderRates();
              }
            } else if (this.selectedSendamountValue > 5000) {
              this.notificationService.create(
                'error',
                'Error',
                'Maximum sending Amount is 5000.00, Please contact us on 0207 341 7300',
                { nzStyle: { background: '#cc2d2d', color: '#fff' } }
              );
              this.transferDetailsForm.patchValue({
                amountReceived: '',
                sendAmount: '5000',
              });

              // this.getRecieverRates();
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

              // this.getRecieverRates();
            } else {
              this.transferDetailsForm.patchValue({
                sendAmount: this.selectedSendamountValue,
                amountReceived: res['responseDto']['sendingAmount'],
                rate:
                  res['responseDto']['sendingCurrency'] +
                  ' 1 = ' +
                  res['responseDto']['receivingCurrency'] +
                  ' ' +
                  res['responseDto']['rate'],
              });
              // this.getSenderRates();
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
            this.rateEquation = '';
            this.transferDetailsForm.patchValue({
              amountReceived: '',
              rate: '',
            });
          }
        },
      });
  }

  getSenderRatesWithoutValues() {
    const recipientData = this.selectedRecivingCurrencyCode;
    const sendingData = this.selectedCurrencyCode;

    const data: any = {};
    data['requestType'] = 'sendamount';
    data['agentExposableId'] = this.agentExposableId;
    data['sendingCurrencyId'] = this.selectedCurrencyId;
    data['receivingCurrencyId'] = this.selectedRecivingCurrencyId;
    data['amount'] = this.selectedSendamountValue;
    data['providerType'] = 'MONEX';
    if (this.selectedSendamountValue) {
      data['amount'] = this.selectedSendamountValue;
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
              sendAmount: res['responseDto']['sendingAmount'],
            });
          }
          this.transferDetailsForm.patchValue({
            rate:
              res['responseDto']['sendingCurrency'] +
              ' 1 = ' +
              res['responseDto']['receivingCurrency'] +
              ' ' +
              res['responseDto']['rate'],
          });
          this.rateEquation = this.rate!.value;
          // console.log(recipientData['agentTransferApprovedReceivingCurrenciesDto']['clientCurrencyDto']['currencyDto']);
          if (
            recipientData['agentTransferApprovedReceivingCurrenciesDto'][
              'clientCurrencyDto'
            ]['currencyDto']['currencyDesc'] == 'LKR - Sri Lankan Rupee (Local)'
          ) {
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
    const recipientData = this.selectedRecivingCurrencyCode;
    const sendingData = this.selectedCurrencyCode;

    const data: any = {};
    data['requestType'] = 'sendamount';
    data['agentExposableId'] = this.agentExposableId;
    data['sendingCurrencyId'] = 1;
    data['receivingCurrencyId'] = 4;
    data['amount'] = 1;
    data['providerType'] = 'MONEX';
    if (this.selectedRecivedamountValue) {
      data['amount'] = this.selectedSendamountValue;
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
              amountReceived: res['responseDto']['receivingAmount'],
            });
          }

          this.transferDetailsForm.patchValue({
            rate:
              res['responseDto']['sendingCurrency'] +
              ' 1 = ' +
              res['responseDto']['receivingCurrency'] +
              ' ' +
              res['responseDto']['rate'],
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
    this.openLoginModal();
  }
  recieverAmountChanged(event: any) {
    this.isRecieverAmountChanged = true;
    this.isSenderAmountChanged = false;
  }
  openLoginModal() {
    if (!this.dataService.isLoggedIn) {
      this.modalService.create({
        nzContent: LoginComponent,
        nzWidth: 510,
        nzFooter: null,
        nzKeyboard: false,
        nzClosable: true,
      });
    } else {
      this.modalService.create({
        // nzTitle:'Transfer Process',
        nzContent: TransferFlowComponent,
        nzWidth: 1012,
        nzClassName: 'view-trans-modal',
        nzFooter: null,
      });
    }
  }
  verify() {
    const data: any = {};
    data['username'] = this.user_mail;
    data['token'] = this.token;
    this.signupservice
      .verify(data)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: any) => {
          if (data.status) {
            this.notificationService.create(
              'success',
              'Success',
              'User Verification Success',
              { nzStyle: { background: '#A38C15', color: 'white' } }
            );
          } else if (!data.status) {
            this.notificationService.create(
              'error',
              'Error',
              data['errorDescription'],
              { nzStyle: { background: '#cc2d2d', color: '#fff' } }
            );
          }
        },
        (err: any) => {
          this.notificationService.create(
            'error',
            'Error',
            'User Verification Failed',
            { nzStyle: { background: '#cc2d2d', color: '#fff' } }
          );
        }
      );
  }
}
