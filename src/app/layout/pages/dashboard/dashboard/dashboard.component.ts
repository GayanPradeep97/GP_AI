import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from 'src/app/_services/auth.service';
import { CommonService } from 'src/app/_services/common.service';
import { DataService } from 'src/app/_services/shared-data/data.service';
import { EventTriggerService } from 'src/app/_services/shared-data/event-trigger.service';
import { TokenStorageServiceService } from 'src/app/_services/token-storage-service.service';
import { TokenService } from 'src/app/_services/token.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass'],
})
export class DashboardComponent {
  isCollapsed = false;
  settingsRouter = false;
  currentActiveUserAccount: any;
  customerReference: any;
  customerOldReference: any;
  agentExposableId = '';

  //tempoary create services (before getting API.after the get API delete these are)
  commonsService: any;
  authenticationService: any;
  agentSenderDataService: any;

  activeItems: { [key: string]: boolean } = {};
  currentUser: any;
  username: any;
  usernameFirstCharacter: any;

  newRefference = false;
  oldRefference = false;
  setActiveItem(itemKey: string) {
    this.activeItems[itemKey] = true;
  }

  constructor(
    public router: Router,
    public dataService: DataService,
    private commonService: CommonService,
    private tokenService: TokenService,
    private authService: AuthService,
    private tokenStorageService: TokenStorageServiceService,
    private eventtriggerService: EventTriggerService
  ) {
    this.currentUser = this.commonService.parseJwt(
      this.tokenService.getToken()
    );
  }
  // {
  //   this.agentCustomerData = this.commonsService.parseJwt(
  //     localStorage.getItem("currentAgentCustomer")
  //   );

  //   this.router.events.subscribe((event) => {
  //     if (event instanceof NavigationEnd) {
  //       if (window.innerWidth < 991) {
  //         if (event.url === "/dashboard/settings") {
  //           this.settingsRouter = true;
  //         } else {
  //           this.settingsRouter = false;
  //         }
  //         this.isCollapsed = true;
  //       }
  //     }
  //   });
  // }

  ngOnInit() {
    this.currentActiveUserAccount = this.tokenStorageService.getUser();
    // this.getExposableId();
    this.setSelectedUserAccount(this.currentActiveUserAccount);
    // console.log('User in dashBoard', this.currentActiveUserAccount);
    this.customerReference = this.dataService.customerReferenceLogin;
    this.customerOldReference = this.dataService.customerOldReference;
    this.eventtriggerService.onReloadServiceData('userdetails');
  }

  setSelectedUserAccount(selectedUserAccount: any) {
    this.username = selectedUserAccount;
    // selectedUserAccount = this.currentUser;
    this.currentActiveUserAccount = selectedUserAccount;
    this.usernameFirstCharacter = this.currentActiveUserAccount
      .slice(0, 1)
      .toUpperCase();
  }

  refreshTransactions() {
    if (this.router.url === '/dashboard/transactions') {
      window.location.reload();
    }
  }

  refreshBeneficiaries() {
    if (this.router.url === '/dashboard/beneficiaries') {
      window.location.reload();
    }
  }

  signOut() {
    this.dataService.isLoggedIn = false;
    localStorage.clear();
    this.router.navigate(['']);
    window.location.reload();

    // this.dataService.isLoggedIn = false;
    // sessionStorage.clear();
    // window.sessionStorage.clear();
    // window.location.reload();
  }

  settingClick() {
    this.dataService.popupClick = false;
  }
}
