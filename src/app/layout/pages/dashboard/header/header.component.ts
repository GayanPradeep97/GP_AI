import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { PopupMessageComponent } from 'src/app/layout/common-components/popup-message/popup-message.component';
import { HeaderMobViewComponent } from './header-mob-view/header-mob-view.component';
import { SignupComponent } from '../../signup/signup/signup.component';
import { CreateCorporateAccountComponent } from 'src/app/layout/components/create-corporate-account/create-corporate-account.component';
import { LoginComponent } from '../../login/login.component';
import { DataService } from 'src/app/_services/shared-data/data.service';
import { AuthService } from 'src/app/_services/auth.service';
import { CommonService } from 'src/app/_services/common.service';
import { AgentDetailsDataServiceService } from 'src/app/_services/agent-details-data.service';
import { Subject, takeUntil } from 'rxjs';
import { CoporateSenderDataService } from 'src/app/_services/coporate-sender-data.service';
import { TokenService } from 'src/app/_services/token.service';
import { AgentSenderDataService } from 'src/app/_services/agent-sender-data.service';
import { TokenStorageServiceService } from 'src/app/_services/token-storage-service.service';
import { EventTriggerService } from 'src/app/_services/shared-data/event-trigger.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SignUpService } from 'src/app/_services/sign-up.service';
import { IdScanDetailsComponent } from '../../signup/id-scan-details/id-scan-details.component';
import { CorporateAccountsChangeService } from 'src/app/_services/corporate-accounts-change.service';
import { CheckIdDocumentsComponent } from '../../check-id-documents/check-id-documents.component';
import { SignupPageComponent } from '../../signup/signup-page/signup-page.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent {
  isLogged = false;
  currentUser: any;

  public unsubscribe$ = new Subject<void>();

  username: any;
  usernameFirstCharacter: any;
  customerReference: any;
  customerOldReference: any;
  agentCustomerData: any;
  agentExposableId: any;
  // logInSubscription: Subscription;
  coporateSenders: any;
  currentActiveUserAccount: any;
  referalPromotion = false;
  coporateEnableStatus = false;
  SenderDetails: any;
  logo: any;

  newRefference = false;
  oldRefference = false;
  existingFileDetails: any;
  corporateType: any;

  constructor(
    private modalService: NzModalService,
    public dataService: DataService,
    public authService: AuthService,
    private commonService: CommonService,
    private agentDetailsDataService: AgentDetailsDataServiceService,
    private coporateSenderDataService: CoporateSenderDataService,
    private tokenService: TokenService,
    private eventTrigger: EventTriggerService,
    private agentSenderDataService: AgentSenderDataService,
    private router: Router,
    private route: ActivatedRoute,
    private signUpService: SignUpService,
    private tokenStorageService: TokenStorageServiceService,
    private corporateAccountsChangeService: CorporateAccountsChangeService
  ) {
    this.currentUser = this.commonService.parseJwt(
      this.tokenService.getToken()
    );
  }

  ngOnInit() {
    if (this.currentUser) {
      this.dataService.isLoggedIn = true;
    }
    if (this.dataService.isLoggedIn) {
      this.currentUser = this.commonService.parseJwt(
        this.tokenService.getToken()
      );
      this.username = this.currentUser.sub;
      this.currentActiveUserAccount = this.tokenStorageService.getUser();
      this.usernameFirstCharacter = this.currentActiveUserAccount
        .slice(0, 1)
        .toUpperCase();

      this.getCoporateSenders();
      this.getExposableId();
    }
    this.eventTrigger.executeOnchangeFunction.subscribe({
      next: (res: any) => {
        if (res === 'login') {
        }
      },
    });
    if (this.route.snapshot.queryParams['origin']) {
      const data = {
        customerReference: window.atob(
          this.route.snapshot.queryParams['origin']
        ),
        journeyId: window.atob(this.route.snapshot.queryParams['refer']),
      };

      this.agentDetailsDataService
        .getAgentExposableId()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe({
          next: (res: any) => {
            if (res['responseDto']) {
              this.agentExposableId = res['responseDto']['data'];
              this.upateAgentJourneyId(data, res['responseDto']['data']);
            }
          },
        });
    }

    this.eventTrigger.executeOnchangeFunction.subscribe({
      next: (res: any) => {
        if (res === 'userdetails') {
          this.getUserDetails();
        }
      },
    });
  }
  upateAgentJourneyId(data: any, refNumber: any) {
    this.signUpService.updateAgentJourneyId(data, refNumber).subscribe({
      next: (res: any) => {
        if (res['responseDto']) {
          this.getSignUpDetails(data.customerReference);
        }
      },
    });
  }

  getExposableId() {
    const data: any = {};
    data['username'] = this.currentActiveUserAccount;
    this.corporateAccountsChangeService
      .getCorporateExposableId(data)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (res: any) => {
          this.agentExposableId = res['responseDto']['agentExposableId'];
          this.tokenStorageService.saveAgentExposableId(this.agentExposableId);
          this.getUserDetails();
        },
      });
  }

  getSignUpDetails(data: any) {
    this.signUpService.getSignUpDetails(data).subscribe({
      next: (res: any) => {
        if (res['responseDto']) {
          this.dataService.idScanDetails = res['responseDto'];
          if (window.innerWidth < 540) {
            const model = this.modalService.create({
              nzTitle: 'ID Details',
              nzContent: IdScanDetailsComponent,
              nzClosable: true,
              nzFooter: null,
              nzWidth: 510,
              nzClassName: 'sign-up-summary',
            });
          }
        }
      },
    });
  }

  setSelectedUserAccount(selectedUserAccount: any) {
    this.tokenStorageService.saveUser(selectedUserAccount);
    this.currentActiveUserAccount = selectedUserAccount;

    this.usernameFirstCharacter = this.currentActiveUserAccount
      .slice(0, 1)
      .toUpperCase();
    window.location.reload();
    this.getUserDetails();
  }

  getCoporateSenders() {
    const data = this.currentUser.sub;
    this.coporateSenderDataService
      .getAgentCoporateSenderData(data)
      .subscribe((res) => {
        this.coporateSenders = res['responseDto'];
      });
  }

  getUserDetails() {
    const data: any = {};
    data['exposableId'] = this.agentExposableId;
    data['email'] = this.currentActiveUserAccount;
    this.corporateAccountsChangeService
      .getCorporateAcountData(data)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (res: any) => {
          if (res['responseDto']) {
            this.customerReference = res['responseDto']['customerReference'];
            this.dataService.customerReferenceLogin =
              res['responseDto']['customerReference'];

            this.customerOldReference =
              res['responseDto']['customerOldReference'];

            this.dataService.customerOldReference =
              res['responseDto']['customerOldReference'];
            this.SenderDetails = res['responseDto'];

            if (this.customerReference !== null) {
              this.newRefference = true;
            }
            if (this.customerOldReference !== null) {
              this.newRefference = true;
            }
            this.getCoperateAccess(this.SenderDetails.agentSenderDetailsId);

            setTimeout(() => {
              if (this.SenderDetails.role === null) {
                this.checkFileExisting(this.SenderDetails);
              }
            }, 100);
          }
        },
      });
  }

  checkFileExisting(values: any) {
    const data: any = {};
    data['email'] = values.email;
    data['dateOfBirth'] = values.dateOfBirth;
    data['birthPlace'] = values.placeOfBirth;
    this.corporateAccountsChangeService
      .checkFileExisting(data)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (res: any) => {
          if (res['responseDto']) {
            this.existingFileDetails = res['responseDto'];
            if (res['responseDto']['imageAvailablity'] === false) {
              this.openCheckId();
            }
          }
        },
      });
  }

  openCheckId() {
    const model = this.modalService.create({
      // nzTitle: 'Forgot your Password?',
      nzContent: CheckIdDocumentsComponent,
      nzClosable: true,
      nzFooter: null,
      nzWidth: 480,
    });
  }

  getCoperateAccess(data: any) {
    this.corporateAccountsChangeService
      .getCorporateAccess(data)
      .subscribe((res) => {
        this.coporateEnableStatus = res['responseDto'];
      });
  }

  getClickAction() {
    this.getCoperateAccess(this.SenderDetails.agentSenderDetailsId);
  }

  // signUpAmlCheck() {
  //   if (window.innerWidth > 540) {
  //     this.modalService.create({
  //       nzContent: PopupMessageComponent,
  //       nzClosable: true,
  //       nzFooter: null,
  //       nzWidth: 510,
  //       nzClassName: 'popup-message',
  //     });
  //   } else {
  //     this.modalService.create({
  //       nzContent: SignupComponent,
  //       nzClosable: true,
  //       nzFooter: null,
  //       nzWidth: 510,
  //       nzClassName: 'sign-up',
  //     });
  //   }
  // }
  signUpAmlCheck() {
    this.modalService.create({
      nzContent: SignupPageComponent,
      nzClosable: true,
      nzFooter: null,
      nzWidth: 510,
      nzClassName: 'sign-up',
    });
  }

  trackClickActivity(type: string) {
    this.corporateType = type;
    console.log('this.corporateType', this.corporateType);
  }

  createCoporateAccount() {
    this.modalService.create({
      nzContent: CreateCorporateAccountComponent,
      nzFooter: null,
      nzWidth: 1012,
      // nzClosable: false,
      nzMaskClosable: false,
      nzClassName: 'corporate-account-modal',
    });
  }

  logout() {
    this.dataService.isLoggedIn = false;
    localStorage.clear();
    window.localStorage.clear();
    window.location.reload();
  }
  login() {
    this.modalService.create({
      nzContent: LoginComponent,
      nzWidth: 510,
      nzFooter: null,
      nzKeyboard: false,
      nzClosable: true,
    });
  }

  openHeader() {
    this.modalService.create({
      nzContent: HeaderMobViewComponent,
      nzWidth: 510,
      nzFooter: null,
      nzKeyboard: false,
      nzClosable: false,
    });
  }
  settingClick() {
    this.dataService.popupClick = false;
  }
}
