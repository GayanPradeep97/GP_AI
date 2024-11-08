import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  isLoggedIn = false;
  selectedData: any;
  inputData: any;
  clickEventStatus: string | undefined;
  checkoutId: any;
  transactionReferenceNumber: any;
  senderName: any;
  transferredAmount: any;
  sendingCurrency: any;
  recipientCurrency: any;
  paymentResult: any;
  agentTransactionMasterId: any;
  customerBasicDetails: any;
  agentSenderDetailsEmail: any;
  loggedInUser: any = null;
  loggedInPassword: any;
  beneficiaryDataPersonal: any;
  beneficiaryDataPersonalId: any;
  isBenEditable: any;
  goNext1: any;
  goNext2: any;
  AllFinalDataFirstStep: any = {};
  AllFinalDataSecondStep: any = {};
  saveAllTransactionData: any = {};
  existingBankId: any;
  currencyRateId: any;
  givenCurrencyRate: any;
  transactionReference: any;
  transactionFinalData: any = {};
  newBankDetailsId: any;
  benificaryfirstName: any = '';
  benificarylastName: any = '';
  newBankBenifisaryId: any;
  isBenifisaryBankEditable: any;
  isBenifisaryEditable: any;
  newBenifisaryNames: any;
  amountReceivedFinal: any;
  exposableId: any;
  updateFunctionDisable: any;
  mytransactionNew: any;
  allDataInHomeNewFlow: any = {};
  makeTransferFlowSaveData: any = {};
  rate: any;
  rateId: any;
  saveNewAgentTransactionDetailsId: any;
  transactionReferenceNew: any;
  oneTimebenifisaryAdd = false;
  summaryFinalBankDetailsId: any;
  benifisaryName: any;
  selectRecevingCurrencyValue: any;
  CountryType: any;
  ModeOfService: any;
  reffrenceValue: any;
  SelectCountryId: any;
  SelectBankLakna: any;
  benificaryDetailsId: any;
  goBack: any = false;

  countryCodelist: any[] = [];
  countryList: any[] = [];
  nationalityList: any[] = [];
  idScanDetails: any;

  addBenifisaryData: any = [];

  newIsCorporate = false;
  benificaryfirstNameNew: any;
  beneficiaryLastNameNew: any;
  agentSenderDetailsIdNew: any;
  newExposableId: any;
  userId: any;
  newReffernce: any;
  userId_new: any;
  senderId: any;
  rateForFirstStep: any;
  agentSenderDetails: any;
  transferFlowStepId: any;
  senderData: any;
  startTrnxData: any;
  failBankAdd = false;
  failBenifisary = true;
  agentTransferRceivingCurrncyId: any;
  recevingCurrencyCode: any;
  customerReference: any;
  paymandMode: any;
  selectReceivingCurencycode: any;
  agentname: any;
  userDetails: any;
  sendingCurrencyId: any;
  cashpaymentId: any;
  transactionModeId: any;
  ammountSendFinal: any;
  newBankCliendcurrencId: any;
  newBenifisaryId: any;
  clientCountryId: any;
  paymentModeValue: any;
  sendingAmountSave: any;
  transferFee = false;
  ratesvalid = false;
  index = 0;
  current = 0;
  isSendingAmout!: boolean;
  customerReferenceLogin: any;
  customerOldReference: any;
  newAgentBnifisaryId: any;
  firstTransactionDone = false;
  settingtSelectedIndex = 0;
  popupClick = false;
  private loggedUserIdSubject = new BehaviorSubject<string | null>(null);
  public loggedUserId$ = this.loggedUserIdSubject.asObservable();

  // Method to update the loggedUserId
  setLoggedUserId(userId: string | null) {
    this.loggedUserIdSubject.next(userId);
  }

  // Method to get the current value synchronously
  get loggedUserId(): string | null {
    return this.loggedUserIdSubject.value;
  }

  constructor() {}
}
