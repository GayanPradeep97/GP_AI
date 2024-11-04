import { Component, Input, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import format from 'date-fns/format';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { MyTansactionService } from 'src/app/_services/my-tansaction.service';
import { Subject, takeUntil } from 'rxjs';
import { DataService } from 'src/app/_services/shared-data/data.service';
import { ViewComponent } from './view/view.component';
import { BenificaryDetailsComponent } from './benificary-details/benificary-details.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ConfirmationDetailsComponent } from './confirmation-details/confirmation-details.component';
import { CommonService } from 'src/app/_services/common.service';
import { TokenService } from 'src/app/_services/token.service';
import { TokenStorageServiceService } from 'src/app/_services/token-storage-service.service';
import { CorporateAccountsChangeService } from 'src/app/_services/corporate-accounts-change.service';

@Component({
  selector: 'app-view-transaction-modal',
  templateUrl: './view-transaction-modal.component.html',
  styleUrls: ['./view-transaction-modal.component.sass'],
})
export class ViewTransactionModalComponent {
  @Input() mode: any;
  AllTransactionData: any;

  @ViewChild(BenificaryDetailsComponent)
  benifisaryComponent!: BenificaryDetailsComponent;

  @ViewChild(UserDetailsComponent)
  userDetailsComponent!: UserDetailsComponent;
  @ViewChild(ViewComponent)
  viewComponent!: ViewComponent;

  @ViewChild(ConfirmationDetailsComponent)
  confirmationDetailsComponent!: ConfirmationDetailsComponent;

  current = 0;
  index = 0;
  isVisible = false;
  transferNumber: any;
  updateFunctionDisable: any;

  public distroy$ = new Subject<void>();
  clientData: any;
  agentExposableId: any;

  constructor(
    private modalRef: NzModalRef,
    private notificationService: NzNotificationService,
    private myTansactionService: MyTansactionService,
    private dataService: DataService,
    private commonsService: CommonService,
    private tokenService: TokenService,
    private tokenStorageService: TokenStorageServiceService,
    private corporateAccountsChangeService: CorporateAccountsChangeService
  ) {
    this.clientData = this.commonsService.parseJwt(tokenService.getToken());
  }

  ngOnInit() {
    this.getCostomerTransactionDetails();
    // this.checkButtenEditOrNot();
  }

  // checkButtenEditOrNot() {
  //   if (
  //     this.mode.transactionStatus === 'CANCELLED' ||
  //     this.mode.transactionStatus === 'PENDING' ||
  //     this.mode.transactionStatus === 'FAILED' ||
  //     this.mode.transactionStatus === 'CREATED'
  //   ) {
  //     this.dataService.updateFunctionDisable = true;
  //     this.updateFunctionDisable = true;
  //   } else {
  //     this.dataService.updateFunctionDisable = false;
  //     this.updateFunctionDisable = false;
  //   }
  //   console.log('what is the update button status', this.updateFunctionDisable);
  // }

  getCostomerTransactionDetails() {
    const data: any = {};
    data['agentTransactionDetailId'] = this.mode.agentTransactionDetailId;
    this.myTansactionService
      .getcustomerTransactionDetails(data)
      .subscribe((res: any) => {
        this.AllTransactionData = res['responseDto'];
        this.transferNumber = res['responseDto']['invoiceTransferNumber'];
        this.savethoseData(res['responseDto']);
      });
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
          this.dataService.exposableId = res['responseDto']['agentExposableId'];
        }
      });
  }

  savethoseData(values: any) {
    this.dataService.saveAllTransactionData = values;
    console.log('iscorporate value', values.isCorporate);
    console.log('iscorporate value', values.isCoporateBeneficiary);
    this.getExposableId();
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  pre(): void {
    this.current -= 1;
    this.changeContent();
  }

  next(): void {
    if (this.index === 0) {
      this.getCostomerTransactionDetails();
      this.index = 1;
      this.current = 1;
      this.viewComponent.checkBenifisaryBankDetailsditOrNot();
      this.viewComponent.checkBenifisaryEditable();
    } else if (this.index === 1) {
      this.index = 2;
      this.current = 2;
    } else if (this.index === 2) {
      this.index = 3;
      this.current = 3;
    }
  }

  updateDetails() {
    this.benifisaryComponent.updateBnifisaryDetails();
    this.benifisaryComponent.updateBankAccount();
  }

  changeContent(): void {
    switch (this.current) {
      case 0: {
        this.index = 0;
        break;
      }
      case 1: {
        this.index = 1;
        break;
      }
      case 2: {
        this.index = 2;
        break;
      }
      case 3: {
        this.index = 3;
        break;
      }
      default: {
        this.index = 99;
      }
    }
  }

  // validateAllFormFields(formGroup: FormGroup) {
  //   Object.keys(formGroup.controls).forEach((field) => {
  //     const control = formGroup.get(field);
  //     if (control instanceof FormControl) {
  //       if (!control.value && control.errors) {
  //         control.markAsDirty();
  //         control.updateValueAndValidity();
  //         const fieldName = this.getFieldName(field);
  //         // this.notificationService.create({
  //         //   'error', fieldName + ' cannot be empty', '#cc2d2d', 'Input Error'
  //         // });
  //       } else {
  //         // this.isFieldValid(field);
  //       }
  //     } else if (control instanceof FormGroup) {
  //       this.validateAllFormFields(control);
  //     }
  //   });
  // }

  // contactNumberValidation() {
  //   if (this.contactNumber!.value) {
  //     let data = this.contactNumber!.value.charAt(0);
  //     let currentData = '';

  //     if (data === '0') {
  //       for (let i = 1; i < this.contactNumber!.value.length; i++) {
  //         currentData = currentData + this.contactNumber!.value.charAt(i);
  //       }

  //       this.beneficiaryDetailsForm.patchValue({
  //         contactNumber: currentData,
  //       });
  //     }
  //   }
  // }

  // mobileNumberValidation() {
  //   if (this.mobileNumber!.value) {
  //     let data = this.mobileNumber!.value.charAt(0);
  //     let currentData = '';

  //     if (data === '0') {
  //       for (let i = 1; i < this.mobileNumber!.value.length; i++) {
  //         currentData = currentData + this.mobileNumber!.value.charAt(i);
  //       }

  //       this.beneficiaryDetailsForm.patchValue({
  //         mobileNumber: currentData,
  //       });
  //     }
  //   }
  // }

  // validateDob() {
  //   let currentDate = new Date();
  //   let selectionDate =
  //     Number(format(new Date(this.dateOfBirth!.value), 'yyyy')) * 365 +
  //     Number(format(new Date(this.dateOfBirth!.value), 'MM')) * 30 +
  //     Number(format(new Date(this.dateOfBirth!.value), 'dd'));
  //   let formatterCurrentDate =
  //     Number(format(new Date(currentDate), 'yyyy')) * 365 +
  //     Number(format(new Date(currentDate), 'MM')) * 30 +
  //     Number(format(new Date(currentDate), 'dd'));

  //   let validate = formatterCurrentDate - selectionDate;

  //   if (validate < 16 * 365) {
  //     this.notificationService.create(
  //       'error',
  //       'Age can not be below 16 years',
  //       '#cc2d2d'
  //     );
  //     this.isDateOfBirthValid = false;
  //   } else {
  //     this.isDateOfBirthValid = true;
  //   }
  // }

  closeModal() {
    this.modalRef.destroy();
  }
}
