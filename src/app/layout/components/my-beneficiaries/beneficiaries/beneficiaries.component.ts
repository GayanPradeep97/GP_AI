import { Component } from '@angular/core';
import { AddBeneficiaryModalComponent } from '../add-beneficiary-modal/add-beneficiary-modal.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ViewBeneficiaryModalComponent } from '../view-beneficiary-modal/view-beneficiary-modal.component';
import { DataService } from 'src/app/_services/shared-data/data.service';
import { MyBeneficiaryService } from 'src/app/_services/my-beneficiary.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  Subject,
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
  takeUntil,
} from 'rxjs';
import { EventTriggerService } from 'src/app/_services/shared-data/event-trigger.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CommonService } from 'src/app/_services/common.service';
import { TokenService } from 'src/app/_services/token.service';
import { TokenStorageServiceService } from 'src/app/_services/token-storage-service.service';

@Component({
  selector: 'app-beneficiaries',
  templateUrl: './beneficiaries.component.html',
  styleUrls: ['./beneficiaries.component.sass'],
})
export class BeneficiariesComponent {
  pageNumber = 1;
  pageSize = 10;
  currentPageIndex = 1;
  totalRecords: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  data$: any;
  beneficiariesMob: any;
  beneficiaries: any = [];
  private searchNameData = new Subject<any>();
  currentUser: any;
  beneficiaryEditable: any;
  constructor(
    private modalService: NzModalService,
    private dataService: DataService,
    private beneficiaryDataService: MyBeneficiaryService,
    private formBuilder: FormBuilder,
    private eventTrigger: EventTriggerService,
    private notificationService: NzNotificationService,
    private commonService: CommonService,
    private tokenService: TokenService,
    private tokenStorageService: TokenStorageServiceService
  ) {
    this.currentUser = this.commonService.parseJwt(tokenService.getToken());
    console.log('current login user', this.currentUser);
  }
  public filterForm!: FormGroup;
  ngOnInit() {
    this.filterForm = this.formBuilder.group({
      searchByName: [null, null],
      searchByContact: [null, null],
      searchByAddress: [null, null],
    });
    this.eventTrigger.executeOnchangeFunction.subscribe(() => {
      this.searchSubscripe();
      this.searchSubscripeMob();
      this.getBeneficiariesData();
      this.getBeneficiariesDataMob();
    });
    this.searchSubscripe();
    this.searchSubscripeMob();
    this.getBeneficiariesData();
    this.getBeneficiariesDataMob();
  }

  pageIndexChange(selectedIndex: any) {
    this.currentPageIndex = selectedIndex;
    this.pageNumber = selectedIndex;
    this.getBeneficiariesData();
  }
  pageIndexChangeMob(selectedIndex: any) {
    this.currentPageIndex = selectedIndex;
    this.pageNumber = selectedIndex;
    this.getBeneficiariesDataMob();
  }
  get searchByName() {
    return this.filterForm.get('searchByName');
  }
  get searchByContact() {
    return this.filterForm.get('searchByContact');
  }
  get searchByAddress() {
    return this.filterForm.get('searchByAddress');
  }
  searchrxjs($event: any) {
    const value = $event.target.value;
    value ? this.searchNameData.next(value) : '';
    // console.log('val', value);
    if (value === '') {
      this.eventTrigger.onReloadServiceData();
    }
  }
  getBeneficiariesData() {
    const data: any = {};
    data['email'] = this.tokenStorageService.getUser();
    data['name'] = this.searchByName?.value;
    data['contactNumber'] = this.searchByContact?.value;
    data['pageNumber'] = this.pageNumber;
    data['pageSize'] = this.pageSize;
    data['address'] = this.searchByAddress?.value;

    return this.beneficiaryDataService.getBeneficiary(data).subscribe((res) => {
      if (res['responseDto'] === null) {
        this.beneficiaries = [];
        this.totalRecords = 0;
      } else if (res['responseDto']['payload'] === null) {
        this.beneficiaries = [];
        this.totalRecords = 0;
      } else {
        this.beneficiaries = res['responseDto']['payload'];
        this.totalRecords = res['responseDto']['totalRecords'];
      }
    });
  }
  getBeneficiariesDataMob() {
    const data: any = {};
    data['email'] = this.tokenStorageService.getUser();
    data['name'] = this.searchByName?.value;
    data['contactNumber'] = this.searchByContact?.value;
    data['pageNumber'] = this.pageNumber;
    data['pageSize'] = 1;
    data['address'] = this.searchByAddress?.value;

    this.beneficiaryDataService.getBeneficiary(data).subscribe((res) => {
      if (res['responseDto'] === null) {
        this.beneficiariesMob = [];
        this.totalRecords = 0;
      } else if (res['responseDto']['payload'] === null) {
        this.beneficiaries = [];
        this.totalRecords = 0;
      } else {
        this.beneficiariesMob = res['responseDto']['payload'];
        this.totalRecords = res['responseDto']['totalRecords'];
      }
    });
  }
  searchSubscripe() {
    this.data$ = this.searchNameData
      .pipe(
        takeUntil(this.destroy$),
        // wait 300ms after each keystroke before considering the term
        debounceTime(500),
        // ignore new term if same as previous term
        distinctUntilChanged(),
        // ignore new term if fewer than 3 characters
        filter((term: string) => term.length >= 3),
        // switch to new search observable each time the term changes
        switchMap(async () => this.getBeneficiariesData())
      )
      .subscribe((res: any) => {
        if (res['responseDto'] === null) {
          // this.eventTrigger.onReloadServiceData();
          this.beneficiaries = [];
          this.totalRecords = 0;
        } else if (res['responseDto']['payload'] === null) {
          this.beneficiaries = [];
          this.totalRecords = 0;
        } else {
          this.beneficiaries = res['responseDto']['payload'];
          this.totalRecords = res['responseDto']['totalRecords'];
        }
      });
  }
  searchSubscripeMob() {
    this.data$ = this.searchNameData
      .pipe(
        takeUntil(this.destroy$),
        // wait 300ms after each keystroke before considering the term
        debounceTime(500),
        // ignore new term if same as previous term
        distinctUntilChanged(),
        // ignore new term if fewer than 3 characters
        filter((term: string) => term.length >= 3),
        // switch to new search observable each time the term changes
        switchMap(async () => this.getBeneficiariesDataMob())
      )
      .subscribe((res: any) => {
        if (res['responseDto'] === null) {
          // this.eventTrigger.onReloadServiceData();
          this.beneficiaries = [];
          this.totalRecords = 0;
        } else if (res['responseDto']['payload'] === null) {
          this.beneficiaries = [];
          this.totalRecords = 0;
        } else {
          this.beneficiaries = res['responseDto']['payload'];
          this.totalRecords = res['responseDto']['totalRecords'];
        }
      });
  }
  toggleSwitch(receivedData: any): void {
    const data: any = {};
    data['agentBeneficiaryId'] = receivedData.agentBeneficiaryDetailsId;
    data['isActive'] = !receivedData.isActive;
    this.beneficiaryDataService.updateAgentBeneficiaryStatus(data).subscribe(
      (res: any) => {
        if (res['status'] == true) {
          this.notificationService.create(
            'success',
            'Agent beneficiary status updated.',
            ''
          );
        }
        this.getBeneficiariesData();
      },
      () => {
        this.notificationService.create(
          'error',
          'Status update failed',
          '#cc2d2d'
        );
      }
    );
  }

  getpersonalBeneficiaryData(receivedData: any) {
    console.log('recevied data', receivedData);
    if (receivedData.isCoporateBeneficiary === false) {
      this.dataService.beneficiaryDataPersonalId = receivedData;

      const data: any = {};
      data['agentBeneficiaryDetailsId'] =
        receivedData.agentBeneficiaryDetailsId;

      this.beneficiaryDataService
        .getBeneficiaryDetailsById(data)
        .subscribe((res: any) => {
          if (res['responseDto']) {
            this.dataService.beneficiaryDataPersonal = res['responseDto'];
            this.viewBeneficiaryDetails(
              this.dataService.beneficiaryDataPersonal
            );
            console.log('beni data', res['responseDto']);
          }
        });
    } else {
      console.log('beni data', this.dataService.beneficiaryDataPersonal);
      this.viewBeneficiaryDetails(receivedData);
    }
  }
  checkBenisEditable(id: any) {
    // console.log(id);
    this.dataService.newAgentBnifisaryId = id.agentBeneficiaryDetailsId;
    const data: any = {};
    data['AgentbeneficiaryDetailsId'] = id.agentBeneficiaryDetailsId;
    this.beneficiaryDataService
      .checkIsBeneficiaryEditable(data)
      .subscribe((res: any) => {
        this.beneficiaryEditable = res.responseDto;
        this.dataService.isBenEditable = this.beneficiaryEditable;
        // console.log(this.dataService.isBenEditable);
        console.log('editable', res.responseDto);
        // this.getpersonalBeneficiaryData(id);
        if (
          this.beneficiaryEditable === true ||
          this.beneficiaryEditable === false
        ) {
          this.getpersonalBeneficiaryData(id);
        }
      });
  }

  viewBeneficiaryDetails(receivedData: any) {
    this.dataService.selectedData = receivedData;
    console;

    this.dataService.clickEventStatus = 'editBeneficiary';
    const modal = this.modalService.create({
      nzTitle: 'View/Edit Beneficiary Details',
      nzContent: ViewBeneficiaryModalComponent,
      nzWidth: 1012,
      nzClassName: 'view-ben-modal',
      nzFooter: null,
    });
    modal.afterClose.subscribe({
      next: () => {
        this.getBeneficiariesData();
      },
    });
  }
  addBeneficiary() {
    this.dataService.clickEventStatus = 'addBeneficiary';
    const modal = this.modalService.create({
      nzTitle: 'Add Beneficiary',
      nzContent: ViewBeneficiaryModalComponent,
      nzWidth: 1012,
      nzClassName: 'view-ben-modal',
      nzFooter: null,
    });
    modal.afterClose.subscribe({
      next: () => {
        this.getBeneficiariesData();
      },
    });
  }
}
