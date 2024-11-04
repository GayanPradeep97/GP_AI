import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { CustomValidators } from 'src/app/_helpers/validators/custom-validators';
import { DataService } from 'src/app/_services/shared-data/data.service';
import { ViewBeneficiaryModalComponent } from '../../my-beneficiaries/view-beneficiary-modal/view-beneficiary-modal.component';
import { format } from 'date-fns';
import { TokenService } from 'src/app/_services/token.service';
import { CommonService } from 'src/app/_services/common.service';
import { TranferFlowService } from 'src/app/_services/tranfer-flow.service';
import { Subject, takeUntil } from 'rxjs';
import { TransferFlow2Service } from 'src/app/_services/transfer-flow2.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AfterTransactionSubmitComponent } from '../after-transaction-submit/after-transaction-submit.component';
import { TokenStorageServiceService } from 'src/app/_services/token-storage-service.service';
import { CorporateAccountsChangeService } from 'src/app/_services/corporate-accounts-change.service';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-transfer-summery',
  templateUrl: './transfer-summery.component.html',
  styleUrls: ['./transfer-summery.component.sass'],
})
export class TransferSummeryComponent {
  @Input() mode: any;
  @Input() agentSenderDetails: any;
  @Input() formGroupName!: string;
  @Output() LastStepData: EventEmitter<any> = new EventEmitter<any>();
  @Input() mytransaction: any;
  @Output() disablebutton: EventEmitter<any> = new EventEmitter<any>();

  public transferSummaryForm!: FormGroup;
  // public transferBeneficiaryDetailsForm!: FormGroup;
  transferSummaryFormReadOnly = true;

  todayDate!: Date;

  current = 0;
  index = 0;
  count = 0;
  agentSenderDetailsId: any;
  allSernderDetails: any;
  exposableId: any;

  agentUser: any;
  public distroy$ = new Subject<void>();

  accountNumber: any;
  accountName: any;
  bankName: any;
  sortCode: any;
  transactionDataId: any;
  checked = false;
  deviceInfo: any;

  benifisaryNEwFullName: any;
  ClickCount = 0;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private modalService: NzModalService,
    private tokenService: TokenService,
    private commonService: CommonService,
    private tranferFlowService: TranferFlowService,
    private rootFormDirction: FormGroupDirective,
    private transferFlow2Service: TransferFlow2Service,
    private notificationService: NzNotificationService,
    private modalRef: NzModalRef,
    private tokenStorageService: TokenStorageServiceService,
    private corporateAccountsChangeService: CorporateAccountsChangeService,
    private deviceService: DeviceDetectorService
  ) {
    this.agentUser = this.commonService.parseJwt(tokenService.getToken());
    this.dataService.userId_new = this.agentUser.user_id;
  }

  ngOnInit() {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    this.transferSummaryForm = this.rootFormDirction.control!.get(
      this.formGroupName
    ) as FormGroup;

    this.transferSummaryForm = this.formBuilder.group({
      date: [''],
      senderName: [''],
      transferredAmount: [''],
      beneficiaryName: [''],
      modeOfService: [''],
      receivedAmount: [''],
    });

    this.todayDate = new Date();
    this.getExposableId();

    this.benifisaryNEwFullName =
      this.dataService.benificaryfirstName +
      '  ' +
      this.dataService.benificarylastName;

    console.log(
      'nebi old',
      this.dataService.AllFinalDataSecondStep.BenificaryName
    );
    console.log('nebi new', this.benifisaryNEwFullName);

    this.patchDataSummary();
  }

  get date() {
    return this.transferSummaryForm.get('date');
  }

  patchDataSummary() {
    if ((this.mytransaction = true)) {
      this.transferSummaryForm.patchValue({
        date: this.todayDate ? format(this.todayDate, 'yyyy-MM-dd') : '',
        transferredAmount:
          this.dataService.AllFinalDataFirstStep.totalAmountPayable.toLocaleString(
            'en-US',
            {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }
          ),
        receivedAmount:
          this.dataService.allDataInHomeNewFlow.recevingAmount.toLocaleString(
            'en-US',
            {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }
          ),
        modeOfService: this.dataService.AllFinalDataFirstStep.PaymentType
          ? this.dataService.AllFinalDataFirstStep.PaymentType
          : this.dataService.ModeOfService,

        beneficiaryName: this.dataService.AllFinalDataSecondStep.BenificaryName,
      });
    } else if ((this.mytransaction = false)) {
      this.transferSummaryForm.patchValue({
        date: this.todayDate ? format(this.todayDate, 'yyyy-MM-dd') : '',
        transferredAmount:
          this.dataService.AllFinalDataFirstStep.totalAmountPayable.toLocaleString(
            'en-US',
            {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }
          ),
        receivedAmount: this.mode.recevingAmount.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
        modeOfService: this.dataService.AllFinalDataFirstStep.PaymentType
          ? this.dataService.AllFinalDataFirstStep.PaymentType
          : this.dataService.ModeOfService,
        beneficiaryName: this.dataService.AllFinalDataSecondStep.BenificaryName,
        senderName: this.dataService.AllFinalDataFirstStep.PaymentType,
      });
    }
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
          this.getSendrDtailsByCriteria(this.exposableId);
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
        if (res['responseDto']) {
          this.allSernderDetails = res['responseDto'];
          this.agentSenderDetailsId =
            res['responseDto']['agentSenderDetailsId'];

          this.transferSummaryForm.patchValue({
            senderName: res['responseDto']['fullName'],
          });
        }
      });
  }

  addBeneficery() {
    this.dataService.clickEventStatus = 'addBeneficiary';
    this.modalService.create({
      nzTitle: 'Add Beneficiary',
      nzContent: ViewBeneficiaryModalComponent,
      nzWidth: 1012,
      nzClassName: 'view-ben-modal',
      nzFooter: null,
    });
  }

  summeriyFinalPopup(value: any) {
    this.dataService.summaryFinalBankDetailsId = value;
    const modal = this.modalService.create({
      nzTitle: 'Account details',
      nzContent: AfterTransactionSubmitComponent,
      nzWidth: 760,
      nzClassName: 'view-ben-modal',
      nzFooter: null,
    });

    modal.componentInstance!.mode = this.mode.amountReceived;
    modal.componentInstance!.data = value;

    modal.afterClose.subscribe(() => {
      window.location.reload();
    });
    this.closeModal();
  }

  summeriyFinalPopupNew(value: any) {
    this.dataService.summaryFinalBankDetailsId = value;
    const modal = this.modalService.create({
      nzTitle: 'Account details',
      nzContent: AfterTransactionSubmitComponent,
      nzWidth: 760,
      nzClassName: 'view-ben-modal',
      nzFooter: null,
    });
    modal.componentInstance!.mode = this.mode?.amountReceived;
    // modal.componentInstance!.data = value;
    modal.componentInstance!.dataNew = value;
    modal.afterClose.subscribe(() => {
      window.location.reload();
    });
    this.closeModal();
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

  handleCheckboxChange(checked: boolean) {
    this.checked = checked;
  }

  savetransactionNew() {
    console.log('click count', this.ClickCount);
    if (this.ClickCount === 1) {
      setTimeout(() => {
        this.closeModal();
      }, 60000);
    } else {
      if (this.checked === true) {
        this.ClickCount = 1;
        this.dataService.amountReceivedFinal =
          this.dataService.makeTransferFlowSaveData.receivingmount;
        this.dataService.ammountSendFinal =
          this.dataService.makeTransferFlowSaveData.sendAmount;
        const formdata: any = {
          sendingCurrencyId: this.dataService.sendingCurrencyId,
          recipientCountryId:
            this.dataService.AllFinalDataSecondStep.recipientCountry,
          recipientCurrencyId: this.dataService.selectRecevingCurrencyValue,

          reference:
            this.dataService.AllFinalDataSecondStep.referenceSelectName ==
            'Others'
              ? 'Others' +
                ' ' +
                this.dataService.AllFinalDataSecondStep.referenceOther
              : this.dataService.AllFinalDataSecondStep.referenceSelectName,
          sendAmount: this.dataService.makeTransferFlowSaveData.sendAmount,
          amountReceived:
            this.dataService.makeTransferFlowSaveData.receivingmount,
          transactionFee: parseFloat(
            this.dataService.AllFinalDataFirstStep.transferFee.replace(/,/g, '')
          ),
          totalPayable: parseFloat(
            this.dataService.AllFinalDataFirstStep.totalAmountPayable.replace(
              /,/g,
              ''
            )
          ),
          agentCurrencyRateId: this.dataService.rateId,
          givenCurrencyRate: this.dataService.rate,
          agentCurrencyTransactionModeId:
            this.dataService.AllFinalDataFirstStep.transactionMode,
          agentSenderDetailsId:
            this.dataService.senderData.agentSenderDetailsId,

          agentPaymentModeId:
            this.dataService.AllFinalDataFirstStep.paymentModeId,
          agentTransferFee: parseFloat(
            this.dataService.AllFinalDataFirstStep.transferFee.replace(/,/g, '')
          ),
          priorityLevel: 1,
          username: this.tokenStorageService.getUser(),

          agentExposableId: this.exposableId,
          beneficiaryDetailId: this.dataService.AllFinalDataSecondStep
            .beneficiaryFullNameId
            ? this.dataService.AllFinalDataSecondStep.beneficiaryFullNameId
            : this.dataService.newBankBenifisaryId,
          agentBeneficiaryBankDetailId: this.dataService.existingBankId
            ? this.dataService.existingBankId
            : this.dataService.newBankDetailsId,
          portal: 'customer',
          browser: this.deviceInfo.browser,
          isMobile: false,
        };

        this.transferFlow2Service
          .SaveFinalTransaction(formdata)
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

              this.dataService.saveNewAgentTransactionDetailsId =
                res['responseDto']['agentTransactionMasterDtoId'];

              this.dataService.transactionReferenceNew =
                res['responseDto']['transactionReference'];
              this.summeriyFinalPopupNew(
                res['responseDto']['agentTransactionMasterDtoId']
              );
              this.dataService.transactionReference =
                res['responseDto']['transactionReference'];

              this.transactionDataId =
                res['responseDto']['agentTransactionMasterDtoId'];
              this.dataService.sendingCurrencyId == null,
                this.dataService.selectRecevingCurrencyValue == null;

              this.closeModal();
            } else if (res['errorDescription']) {
              const msg = res['errorDescription'];
              this.notificationService.create('error', 'Error', msg, {
                nzStyle: {
                  background: '#cc2d2d',
                  color: '#ffffff',
                },
              });
              setTimeout(() => {
                this.closeModal();
              }, 60000);
            }
          });
      } else {
        this.notificationService.create(
          'error',
          'Input Error',
          'Please tick Term and Conditions',
          { nzStyle: { background: '#cc2d2d', color: '#fff' } }
        );
      }
    }
  }

  savetransactionhome() {
    console.log('click count', this.ClickCount);
    if (this.ClickCount === 1) {
      setTimeout(() => {
        this.closeModal();
      }, 60000);
    } else {
      if (this.checked === true) {
        this.ClickCount = 1;
        this.dataService.amountReceivedFinal = this.mode.recevingAmount
          ? this.mode.recevingAmount
          : this.dataService.makeTransferFlowSaveData.receivingmount;
        this.dataService.ammountSendFinal = this.mode.sendAmount
          ? this.mode.sendAmount
          : this.dataService.makeTransferFlowSaveData.sendAmount;
        const formdata: any = {
          sendingCurrencyId: this.dataService.sendingCurrencyId,
          recipientCountryId:
            this.dataService.AllFinalDataSecondStep.recipientCountry,
          recipientCurrencyId: this.dataService.selectRecevingCurrencyValue,
          reference:
            this.dataService.AllFinalDataSecondStep.referenceSelectName ==
            'Others'
              ? 'Others' +
                ' ' +
                this.dataService.AllFinalDataSecondStep.referenceOther
              : this.dataService.AllFinalDataSecondStep.referenceSelectName,
          sendAmount: this.dataService.makeTransferFlowSaveData.sendAmount,
          amountReceived:
            this.dataService.makeTransferFlowSaveData.receivingmount,
          transactionFee: this.dataService.AllFinalDataFirstStep.transferFee,
          totalPayable: parseFloat(
            this.dataService.AllFinalDataFirstStep.totalAmountPayable.replace(
              /,/g,
              ''
            )
          ),
          agentCurrencyRateId: this.dataService.rateId,
          givenCurrencyRate: this.dataService.rate,
          agentCurrencyTransactionModeId:
            this.dataService.AllFinalDataFirstStep.transactionMode,
          agentSenderDetailsId:
            this.dataService.AllFinalDataFirstStep.agentSenderDetailsId,
          agentPaymentModeId:
            this.dataService.AllFinalDataFirstStep.paymentModeId,
          agentTransferFee: this.dataService.AllFinalDataFirstStep.transferFee,
          priorityLevel: 1,
          username: this.tokenStorageService.getUser(),
          agentExposableId: this.exposableId,
          beneficiaryDetailId: this.dataService.AllFinalDataSecondStep
            .beneficiaryFullNameId
            ? this.dataService.AllFinalDataSecondStep.beneficiaryFullNameId
            : this.dataService.newBankBenifisaryId,
          agentBeneficiaryBankDetailId: this.dataService.existingBankId
            ? this.dataService.existingBankId
            : this.dataService.newBankDetailsId,
          portal: 'customer',
          browser: this.deviceInfo.browser,
          isMobile: false,
        };

        this.transferFlow2Service
          .SaveFinalTransaction(formdata)
          .pipe(takeUntil(this.distroy$))
          .subscribe((res: any) => {
            if (res['responseDto']) {
              this.dataService.firstTransactionDone = true;

              const msg = res['responseDto']['msg'];
              this.notificationService.create('success', 'Success', msg, {
                nzStyle: {
                  background: '#00A03E',
                  color: '#ffffff',
                },
              });
              this.summeriyFinalPopup(
                res['responseDto']['agentTransactionMasterDtoId']
              );
              this.dataService.transactionReference =
                res['responseDto']['transactionReference'];

              this.transactionDataId =
                res['responseDto']['agentTransactionMasterDtoId'];
              this.dataService.sendingCurrencyId == null,
                this.dataService.selectRecevingCurrencyValue == null;

              this.closeModal();
            } else if (res['errorDescription']) {
              const msg = res['errorDescription'];
              this.notificationService.create('error', 'Error', msg, {
                nzStyle: {
                  background: '#cc2d2d',
                  color: '#ffffff',
                },
              });
              this.dataService.firstTransactionDone = false;
              setTimeout(() => {
                this.closeModal();
              }, 60000);
            }
          });
      } else {
        this.notificationService.create(
          'error',
          'Input Error',
          'Please tick Term and Conditions',
          { nzStyle: { background: '#cc2d2d', color: '#fff' } }
        );
      }
    }
  }

  closeModal() {
    this.modalRef.destroy();
  }

  updateFinalStep() {
    const body: any = {
      agentName: this.dataService.agentname?.trim(),
      exposableId: this.dataService.newExposableId,
      customerReference: this.dataService.senderData.customerReference?.trim(),
      transferFlowStepId: this.dataService.transferFlowStepId,
      sendingCurrency:
        this.dataService.AllFinalDataFirstStep.sendingCurrencyName,
      recipientCurrency:
        this.dataService.AllFinalDataFirstStep.recipientCurrencyName,
      sendAmount: this.dataService.AllFinalDataFirstStep.sendAmount,
      amountReceived: this.dataService.makeTransferFlowSaveData.receivingmount,
      ripplenetQuoteId: null,

      transactionMode: this.dataService.ModeOfService,
      transferFeesMode: 'FIXED',
      transferFee: this.dataService.AllFinalDataFirstStep.transferFee,
      totalAmountPayable: parseFloat(
        this.dataService.AllFinalDataFirstStep.totalAmountPayable.replace(
          /,/g,
          ''
        )
      ),
      rate: this.dataService.rate,

      paymentMode: this.dataService.paymandMode,
      senderDetailsId: this.dataService.senderData.agentSenderDetailsId,
      senderFirstName: this.dataService.senderData.customerFirstName?.trim(),
      senderLastName: this.dataService.senderData.customerLastName?.trim(),
      senderTelephone: this.dataService.senderData.telephoneNo,
      senderMobile: this.dataService.senderData.handphoneNo,
      senderEmailAddress: this.dataService.senderData.email?.trim(),
      residentialAddress:
        this.dataService.senderData.residentialAddress?.trim(),
      confirmIdentity: 'Yes',
      identityNumber: this.dataService.senderData.identityModeValue,
      country: this.dataService.senderData.nationalityValue,

      beneficiaryFullName:
        this.dataService.AllFinalDataSecondStep.BenificaryName != null
          ? this.dataService.AllFinalDataSecondStep.BenificaryName?.trim()
          : this.dataService.benificaryfirstName?.trim() +
            '  ' +
            this.dataService.benificarylastName?.trim(),
      beneficiaryFirstName:
        this.dataService.AllFinalDataSecondStep.benificaryfirstName?.trim(),
      beneficiaryLastName:
        this.dataService.AllFinalDataSecondStep.benificarylastName?.trim(),
      contactNumber: this.dataService.AllFinalDataSecondStep.contactNumber,
      address: this.dataService.AllFinalDataSecondStep.address?.trim(),

      dateOfBirth: this.dataService.AllFinalDataSecondStep.dateOfBirth,
      bank: this.dataService.AllFinalDataSecondStep.bankName?.trim(),
      accountNumber: this.dataService.AllFinalDataSecondStep.accNo,
      bankBranch: this.dataService.AllFinalDataSecondStep.branchName?.trim(),
      reference:
        this.dataService.AllFinalDataSecondStep.referenceSelectName == 'Others'
          ? 'Others' +
            ' ' +
            this.dataService.AllFinalDataSecondStep.referenceOther
          : this.dataService.AllFinalDataSecondStep.referenceSelectName?.trim(),
      referenceOther: null,
      bankName: this.dataService.AllFinalDataSecondStep.bankName?.trim(),
      accNo: this.dataService.AllFinalDataSecondStep.accNo,
      branchName: this.dataService.AllFinalDataSecondStep.branchName?.trim(),
      bankCode: this.dataService.AllFinalDataSecondStep.banckCode?.trim(),
      swiftCode: this.dataService.AllFinalDataSecondStep.swiftCode?.trim(),
      selectedBank: this.dataService.AllFinalDataSecondStep.bankName?.trim(),
      accountNumberBankCode:
        this.dataService.AllFinalDataSecondStep.banckCode?.trim(),
      accountNumberSwiftCode:
        this.dataService.AllFinalDataSecondStep.swiftCode?.trim(),
      isActiveBeneficiary: true,
      isCoporateBeneficiary: this.dataService.newIsCorporate,
      mobileProviders: true,

      status: 'lastStepTransactionSuccessfullyCompleted',
      routingNumber:
        this.dataService.AllFinalDataSecondStep.routingNumber?.value?.trim(),
      label5: this.dataService.AllFinalDataSecondStep.label5?.value?.trim(),
      label4: this.dataService.AllFinalDataSecondStep.label4?.value?.trim(),
      label6: this.dataService.AllFinalDataSecondStep.label6?.value?.trim(),
    };
    this.tranferFlowService
      .updateFinalStep(body)
      .pipe(takeUntil(this.distroy$))
      .subscribe((res: any) => {
        if (res['responseDto']) {
        }
      });
  }
}
