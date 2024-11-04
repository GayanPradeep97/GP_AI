import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  NzNotificationComponent,
  NzNotificationService,
} from 'ng-zorro-antd/notification';
import { Subject, takeUntil } from 'rxjs';
import { CommonService } from 'src/app/_services/common.service';
import { MyTansactionService } from 'src/app/_services/my-tansaction.service';
import { DataService } from 'src/app/_services/shared-data/data.service';
import { TokenService } from 'src/app/_services/token.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.sass'],
})
export class ViewComponent {
  @Input() mode: any;

  public transferDetailsForm!: FormGroup;
  clientData: any;
  agentExposableId: any;
  AllTransactionData: any;
  agentSenderDetailsId: any;
  updateFunctionDisable: any;

  public distroy$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private commonsService: CommonService,
    private tokenService: TokenService,
    private myTansactionService: MyTansactionService,
    private notificationService: NzNotificationService
  ) {
    this.clientData = this.commonsService.parseJwt(tokenService.getToken());
  }

  ngOnInit() {
    this.transferDetailsForm = this.formBuilder.group({
      sentAmount: [null, Validators.required],
      transferMode: [null, Validators.required],
      recepientCountry: [null, Validators.required],
      senderCountry: [null, Validators.required],
      transferFee: [null, Validators.required],
      beneficiaryReceiveAmount: [null, Validators.required],
      totalAmountPayable: [null, Validators.required],
      promoCode: [null],
    });

    this.getCostomerTransactionDetails();
    this.transferDetailsForm.get('sentAmount')?.disable();
    this.transferDetailsForm.get('transferMode')?.disable();
    this.transferDetailsForm.get('recepientCountry')?.disable();
    this.transferDetailsForm.get('senderCountry')?.disable();
    this.transferDetailsForm.get('transferFee')?.disable();
    this.transferDetailsForm.get('beneficiaryReceiveAmount')?.disable();
    this.transferDetailsForm.get('totalAmountPayable')?.disable();
    this.transferDetailsForm.get('promoCode')?.disable();
  }

  getCostomerTransactionDetails() {
    const data: any = {};
    data['agentTransactionDetailId'] = this.mode.agentTransactionDetailId;
    this.myTansactionService
      .getcustomerTransactionDetails(data)
      .subscribe((res: any) => {
        this.AllTransactionData = res['responseDto'];
        this.transferDetailsForm.patchValue({
          sentAmount: res['responseDto']['sentAmount'].toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }),
          transferMode: res['responseDto']['transferAs'],
          recepientCountry: res['responseDto']['recipientCurrency'],
          senderCountry: res['responseDto']['agentSenderCountry'],
          transferFee: res['responseDto']['transferFee'].toLocaleString(
            'en-US',
            {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }
          ),
          beneficiaryReceiveAmount: res['responseDto'][
            'beneficiaryAmountReceive'
          ].toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }),
          totalAmountPayable: res['responseDto'][
            'totalAmountPayable'
          ].toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }),
          promoCode: res['responseDto']['promoCode'],
        });
        this.agentSenderDetailsId = res['responseDto']['agentSenderDetailsId'];
      });
  }

  get sentAmount() {
    return this.transferDetailsForm.get('sentAmount');
  }
  get transferMode() {
    return this.transferDetailsForm.get('transferMode');
  }
  get recepientCountry() {
    return this.transferDetailsForm.get('recepientCountry');
  }
  get senderCountry() {
    return this.transferDetailsForm.get('senderCountry');
  }
  get transferFee() {
    return this.transferDetailsForm.get('transferFee');
  }
  get beneficiaryReceiveAmount() {
    return this.transferDetailsForm.get('beneficiaryReceiveAmount');
  }
  get totalAmountPayable() {
    return this.transferDetailsForm.get('totalAmountPayable');
  }
  get promoCode() {
    return this.transferDetailsForm.get('promoCode');
  }

  numberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  checkBenifisaryBankDetailsditOrNot() {
    const data: any = {};
    data['agentBeneficiaryDetailsId'] =
      this.dataService.saveAllTransactionData.agentBeneficiaryDetailsId;
    data['agentBeneficiaryBankAccountDetailsId'] =
      this.dataService.saveAllTransactionData.beneficiaryBankAccountDetailId;
    this.myTansactionService
      .chckBenifisaryBankDtailsEditableOrNot(data)
      .pipe(takeUntil(this.distroy$))
      .subscribe((res: any) => {
        if (res['responseDto']) {
          // this.isBenifisaryBankEditable = res['responseDto']['isEditable'];
          this.dataService.isBenifisaryBankEditable =
            res['responseDto']['isEditable'];

          if (res['responseDto']['isEditable'] === false) {
            this.dataService.updateFunctionDisable = true;
          } else {
            this.dataService.updateFunctionDisable = false;
          }
        }
      });
  }

  checkBenifisaryEditable() {
    const data: any = {};
    data['agentBeneficiaryDetailsId'] =
      this.dataService.saveAllTransactionData.agentBeneficiaryDetailsId;
    this.myTansactionService
      .chckBenifisaryEditableOrNot(data)
      .pipe(takeUntil(this.distroy$))
      .subscribe((res: any) => {
        // console.log('benifisary editable', res);
        if (res['responseDto'] === false) {
          // this.isBenifisaryEditable = res['responseDto'];
          this.dataService.isBenifisaryEditable = false;

          this.dataService.updateFunctionDisable = true;
        } else {
          this.dataService.isBenifisaryEditable = true;
          this.dataService.updateFunctionDisable = false;
        }
      });
  }
}
