import { Component } from '@angular/core';
import { ViewTransactionModalComponent } from '../view-transaction-modal/view-transaction-modal.component';
import { DataService } from 'src/app/_services/shared-data/data.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { TransferFlowComponent } from '../../transfer-flow/transfer-flow.component';
import { CommonService } from 'src/app/_services/common.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { TokenService } from 'src/app/_services/token.service';
import { MyTansactionService } from 'src/app/_services/my-tansaction.service';
import { Subject, takeUntil } from 'rxjs';
import { TokenStorageServiceService } from 'src/app/_services/token-storage-service.service';
import { CorporateAccountsChangeService } from 'src/app/_services/corporate-accounts-change.service';
import { EventTriggerService } from 'src/app/_services/shared-data/event-trigger.service';

@Component({
  selector: 'app-my-transaction',
  templateUrl: './my-transaction.component.html',
  styleUrls: ['./my-transaction.component.sass'],
})
export class MyTransactionComponent {
  isToggled = false;
  AllTransactionData: any;

  toggleSwitch(event: boolean): void {
    this.isToggled = event;
  }
  pageNumber = 1;
  pageSize = 10;
  currentPageIndex = 1;
  totalRecords: any;

  public distroy$ = new Subject<void>();

  clientData: any;
  tableDataWithFilter: any;
  agentExposableId: any;
  agentSenderDetails: any;

  transferNumber: any;

  //filter
  beneficiaryName: any;
  selectBeneficiaryName: any;
  contactNumber: any;

  myTransaction = false;

  constructor(
    private dataService: DataService,
    private modalService: NzModalService,
    private commonsService: CommonService,
    private notificationService: NzNotificationService,
    private tokenService: TokenService,
    private myTansactionService: MyTansactionService,
    private tokenStorageService: TokenStorageServiceService,
    private corporateAccountsChangeService: CorporateAccountsChangeService,
    private eventTrigger: EventTriggerService
  ) {
    this.clientData = this.commonsService.parseJwt(tokenService.getToken());
  }

  ngOnInit() {
    this.getAllTableData();
    this.getExposableId();
    this.eventTrigger.executeOnchangeFunction.subscribe({
      next: (res: any) => {
        if (res === 'benUpdated') {
          this.getAllTableData();
        }
      },
    });
  }

  getAllTableData() {
    const data: any = {};
    data['userName'] = this.tokenStorageService.getUser();

    data['pageNumber'] = this.currentPageIndex;
    data['pageSize'] = this.pageSize;
    data['transactionSummery'] = 'transaction summery';
    this.myTansactionService
      .getTabaleDataWithFilter(data)
      .pipe(takeUntil(this.distroy$))
      .subscribe((res: any) => {
        if (res['responseDto']) {
          this.tableDataWithFilter = res['responseDto']['payload'];
          this.totalRecords = res['responseDto']['totalRecords'];
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
        if (res['responseDto']) {
          this.agentExposableId = res['responseDto']['agentExposableId'];
          this.dataService.agentSenderDetails = res['responseDto'];
          this.getAgentDetailsForSender();
        }
      });
  }

  getAgentDetailsForSender() {
    const data: any = {};
    data['agentExposableId'] = this.agentExposableId;
    data['email'] = this.tokenStorageService.getUser();

    this.myTansactionService
      .getAgentSenderDtailsForCustomer(data)
      .pipe(takeUntil(this.distroy$))
      .subscribe((res: any) => {
        if (res['responseDto']) {
          this.agentSenderDetails = res['responseDto'];
        }
      });
  }

  viewTransactionDetails(receivedData: any) {
    this.dataService.selectedData = receivedData;
    const modal = this.modalService.create({
      nzTitle: '',
      nzContent: ViewTransactionModalComponent,
      nzWidth: 1012,
      nzClassName: 'view-trans-modal',
      nzFooter: null,
    });
    modal.componentInstance!.mode = receivedData;

    modal.afterClose.subscribe(() => {
      this.getAllTableData();
    });
  }

  addBeneficiary() {
    this.dataService.clickEventStatus = 'addBeneficiary';
    const modal = this.modalService.create({
      // nzTitle:'Transfer Process',
      nzContent: TransferFlowComponent,
      nzWidth: 1012,
      nzClassName: 'view-trans-modal',
      nzFooter: null,
    });

    modal.componentInstance!.mytransaction = true;
    modal.afterClose.subscribe(() => {
      this.getAllTableData();
    });
  }

  pageIndexChange(selectedIndex: any) {
    this.currentPageIndex = selectedIndex;
    this.pageNumber = selectedIndex;
    this.getAllTableData();
  }
}
