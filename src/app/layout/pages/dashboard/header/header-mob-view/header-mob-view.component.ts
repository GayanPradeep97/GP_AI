import { Component } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { SignupComponent } from '../../../signup/signup/signup.component';
import { LoginComponent } from '../../../login/login.component';
import { DataService } from 'src/app/_services/shared-data/data.service';
import { CreateCorporateAccountComponent } from 'src/app/layout/components/create-corporate-account/create-corporate-account.component';
import { Router } from '@angular/router';
import { PopupMessageComponent } from 'src/app/layout/common-components/popup-message/popup-message.component';
import { TokenStorageServiceService } from 'src/app/_services/token-storage-service.service';
import { CorporateAccountsChangeService } from 'src/app/_services/corporate-accounts-change.service';
import { Subject, takeUntil } from 'rxjs';
import { CommonService } from 'src/app/_services/common.service';
import { TokenService } from 'src/app/_services/token.service';
import { CoporateSenderDataService } from 'src/app/_services/coporate-sender-data.service';

@Component({
  selector: 'app-header-mob-view',
  templateUrl: './header-mob-view.component.html',
  styleUrls: ['./header-mob-view.component.sass'],
})
export class HeaderMobViewComponent {
  username: any;
  currentActiveUserAccount: any;
  usernameFirstCharacter: any;
  customerReference: any;
  customerOldReference: any;
  agentCustomerData: any;
  agentExposableId: any;
  coporateSenders: any;

  isLogged = false;
  currentUser: any;

  referalPromotion = false;
  coporateEnableStatus = false;
  SenderDetails: any;
  logo: any;
  newRefference = false;
  oldRefference = false;
  public unsubscribe$ = new Subject<void>();
  constructor(
    private router: Router,
    private modalService: NzModalService,
    private modalRef: NzModalRef,
    public dataService: DataService,
    private tokenStorageService: TokenStorageServiceService,
    private corporateAccountsChangeService: CorporateAccountsChangeService,
    private commonService: CommonService,
    private tokenService: TokenService,
    private coporateSenderDataService: CoporateSenderDataService
  ) {
    this.currentUser = this.commonService.parseJwt(
      this.tokenService.getToken()
    );
  }

  selectedUserAccount: any;

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
  routeToAboutus() {
    this.closeModal();
  }
  routeToHowitworks() {
    this.closeModal();
  }
  routeToContact() {
    this.closeModal();
  }
  login() {
    this.closeModal();
    this.modalService.create({
      nzContent: LoginComponent,
      nzWidth: 310,
      nzFooter: null,
      nzKeyboard: false,
      nzClosable: false,
    });
  }

  signUpAmlCheck() {
    this.closeModal();
    if (window.innerWidth > 540) {
      this.modalService.create({
        nzContent: PopupMessageComponent,
        nzClosable: true,
        nzFooter: null,
        nzWidth: 510,
        nzClassName: 'popup-message',
      });
    } else {
      this.modalService.create({
        nzContent: SignupComponent,
        nzClosable: true,
        nzFooter: null,
        nzWidth: 510,
        nzClassName: 'sign-up',
      });
    }
  }

  closeModal() {
    this.modalRef.destroy();
  }
  getClickAction() {
    this.getCoperateAccess(this.SenderDetails.agentSenderDetailsId);
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
            this.customerOldReference =
              res['responseDto']['customerOldReference'];

            this.SenderDetails = res['responseDto'];

            if (this.customerReference !== null) {
              this.newRefference = true;
            }

            if (this.customerOldReference !== null) {
              this.newRefference = true;
            }
            this.getCoperateAccess(this.SenderDetails.agentSenderDetailsId);
          }
        },
      });
  }

  getCoporateSenders() {
    const data = this.currentUser.sub;
    this.coporateSenderDataService
      .getAgentCoporateSenderData(data)
      .subscribe((res) => {
        this.coporateSenders = res['responseDto'];
      });
  }

  getCoperateAccess(data: any) {
    this.corporateAccountsChangeService
      .getCorporateAccess(data)
      .subscribe((res) => {
        this.coporateEnableStatus = res['responseDto'];
      });
  }
  trackClickActivity(name: string) {}

  routeToDashboard() {
    this.modalRef.destroy();
    this.router.navigate(['/dashboard/transactions']);
  }

  routeToBeneficiaries() {
    this.modalRef.destroy();
    this.router.navigate(['/dashboard/beneficiaries']);
  }

  routeToSettings() {
    this.modalRef.destroy();
    this.router.navigate(['/dashboard/settings']);
  }

  logout() {
    this.dataService.isLoggedIn = false;
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
}
