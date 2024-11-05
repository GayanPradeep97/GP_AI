import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Subject, takeUntil } from 'rxjs';
import { AgentDetailsDataServiceService } from 'src/app/_services/agent-details-data.service';
import { CurrencyConversionLocalService } from 'src/app/_services/currency-conversion-local.service';
import { CurrencydataService } from 'src/app/_services/currency-data.service';
import { DataService } from 'src/app/_services/shared-data/data.service';
import { TransferFlowComponent } from 'src/app/layout/components/transfer-flow/transfer-flow.component';
import { LoginComponent } from '../../login/login.component';
import { TokenService } from 'src/app/_services/token.service';
import { CommonService } from 'src/app/_services/common.service';
import { Router } from '@angular/router';
import { TranferFlowService } from 'src/app/_services/tranfer-flow.service';
import { TokenStorageServiceService } from 'src/app/_services/token-storage-service.service';
import { CorporateAccountsChangeService } from 'src/app/_services/corporate-accounts-change.service';
import { DecimalPipe } from '@angular/common';
import { CheckIdDocumentsComponent } from '../../check-id-documents/check-id-documents.component';
import { countryData } from 'src/app/data/countryData';

@Component({
  selector: 'app-home-banner',
  templateUrl: './home-banner.component.html',
  styleUrls: ['./home-banner.component.sass'],
})
export class HomeBannerComponent {
  sendingCurrencies: any;
  recipientCurrencies: any;
  rateEquation = '';

  allDataInHome = {};

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

  agentExposableId: any;

  isLogin!: boolean;

  private unsubscribe$ = new Subject<void>();

  public transferDetailsForm!: FormGroup;

  isRecieverAmountChanged = false;
  isSenderAmountChanged = false;

  appheader!: boolean;
  currentUser: any;
  useRouterForCode: any;
  useRouterForName: any;

  agentTransferRceivingCurrncyId: any;
  onlyREcevingCurrancyCode: any;
  savedUserName: any;

  get currentRoute(): string {
    return this.router.url;
  }

  title =
    'Spot On Money transfers.<br> Now send money to Asia, UAE, Africa and beyond';

  description = 'An efficient and effective way to send money worldwide';

  country = '';
  uniqueTitle: any;
  constructor(
    private fb: FormBuilder,
    private modalService: NzModalService,
    public dataService: DataService,
    private tokenStorage: TokenService,
    private commonService: CommonService,
    private router: Router
  ) {
    this.currentUser = this.commonService.parseJwt(tokenStorage.getToken());
    this.savedUserName = this.tokenStorage.getPrivileges();
  }

  ngOnInit() {
    this.isLogin = this.dataService.isLoggedIn;
  }
  openLoginModal(values: any) {
    if (!this.dataService.isLoggedIn) {
      this.modalService.create({
        nzContent: LoginComponent,
        nzWidth: 510,
        nzFooter: null,
        nzKeyboard: false,
        nzClosable: true,
      });
    } else {
      const modal = this.modalService.create({
        // nzTitle:'Transfer Process',
        nzContent: TransferFlowComponent,
        nzWidth: 1012,
        nzClassName: 'view-trans-modal',
        nzFooter: null,
      });
      modal.componentInstance!.mode = values;
      modal.componentInstance!.mytransaction = false;

      modal.afterClose.subscribe(() => {
        // window.location.reload();
      });
    }
  }

  handleSendAmountClick() {
    if (!this.dataService.isLoggedIn) {
      // User is not logged in, open login modal
      this.modalService.create({
        nzContent: LoginComponent,
        nzWidth: 510,
        nzFooter: null,
        nzKeyboard: false,
        nzClosable: true,
      });
    }
  }

  setRouterUrl() {
    if (this.useRouterForCode === 'LKR') {
      this.router.navigate(['/send-money-to-sri-lanka']);
      this.country = 'sri lanka';
    } else if (this.useRouterForName === 'Bangladeshi Taka') {
      this.country = 'Bangladesh';
      this.router.navigate(['/send-money-to-bangladesh']);
    } else if (this.useRouterForName === 'Nigerian Naira') {
      this.country = 'Nigeria';
      this.router.navigate(['/send-money-to-nigeria']);
    } else if (this.useRouterForName === 'Congo (USD)') {
      this.country = 'Congo DRC';
      this.router.navigate(['/send-money-to-congo-drc']);
    } else if (this.useRouterForName === 'Pesso') {
      this.country = 'Philippines';
      this.router.navigate(['/send-money-to-philippines']);
    } else if (this.useRouterForName === 'Indian Rupee') {
      this.router.navigate(['/send-money-to-india']);
      this.country = 'India';
    } else if (this.useRouterForName === 'Thai bath') {
      this.router.navigate(['/send-money-to-thailand']);
      this.country = 'Thailand';
    } else if (this.useRouterForName === 'Malaysian Ringgit') {
      this.router.navigate(['/send-money-to-malaysia']);
      this.country = 'Malaysia';
    } else if (this.useRouterForName === 'Hong Kong Dollar') {
      this.router.navigate(['/send-money-to-hong-kong']);
      this.country = 'Hong-Kong';
    } else if (this.useRouterForName === 'Canadian Dollar') {
      this.router.navigate(['/send-money-to-canada']);
      this.country = 'Canada';
    } else if (this.useRouterForName === 'Kenyan Shilling') {
      this.router.navigate(['/send-money-to-kenya']);
      this.country = 'Kenya';
    } else if (this.useRouterForName === 'UAE Dirham') {
      this.router.navigate(['/send-money-to-united-arab-emirates']);
      this.country = 'United-arab-emirates';
    } else if (this.useRouterForName === 'US Dollars') {
      this.router.navigate(['/send-money-in-usa']);
      this.country = 'USA';
    } else if (this.useRouterForName === 'Nepal Rupee') {
      this.router.navigate(['/send-money-to-nepal']);
      this.country = 'Nepal';
    } else if (this.useRouterForName === 'Ghana Cedis') {
      this.router.navigate(['/send-money-to-ghana']);
      this.country = 'Ghana';
    }
    ///////////////////////////// -------- ////////////////////
    else if (this.useRouterForName === 'Belgium (EUR)') {
      this.router.navigate(['/send-money-to-belgium']);
      this.country = 'Belgium';
    } else if (this.useRouterForName === 'Estonia (EUR)') {
      this.router.navigate(['/send-money-to-estonia']);
      this.country = 'Estonia';
    } else if (this.useRouterForName === 'France (EUR)') {
      this.router.navigate(['/send-money-to-france']);
      this.country = 'France';
    } else if (this.useRouterForName === 'Australian dollar') {
      this.router.navigate(['/send-money-to-australia']);
      this.country = 'Australia';
    } else if (this.useRouterForName === 'Bahraini Dinar') {
      this.router.navigate(['/send-money-to-bahrain']);
      this.country = 'Bahrain';
    } else if (this.useRouterForName === 'Chinese yuan renminbi') {
      this.router.navigate(['/send-money-to-china']);
      this.country = 'China';
    } else if (this.useRouterForName === 'Croatian Kuna') {
      this.router.navigate(['/send-money-to-croatia']);
      this.country = 'Croatia';
    } else if (this.useRouterForName === 'Danish Krone') {
      this.router.navigate(['/send-money-to-denmark']);
      this.country = 'Denmark';
    } else if (this.useRouterForName === 'EURO') {
      this.router.navigate(['/send-money-in-europe']);
      this.country = 'Europe';
    } else if (this.useRouterForName === 'Hungarian Forint') {
      this.router.navigate(['/send-money-to-hungary']);
      this.country = 'Hungary';
    } else if (this.useRouterForName === 'Indonesian Rupiah') {
      this.router.navigate(['/send-money-to-indonesia']);
      this.country = 'Indonesia';
    } else if (this.useRouterForName === 'Israeli Shekel') {
      this.router.navigate(['/send-money-to-israel']);
      this.country = 'Israel';
    } else if (this.useRouterForName === 'Japanese Yen') {
      this.router.navigate(['/send-money-to-japan']);
      this.country = 'Japan';
    } else if (this.useRouterForName === 'Kuwaiti Dinar') {
      this.router.navigate(['/send-money-to-kuwait']);
      this.country = 'Kuwait';
    } else if (this.useRouterForName === 'Mexican Peso') {
      this.router.navigate(['/send-money-to-mexico']);
      this.country = 'Mexico';
    } else if (this.useRouterForName === 'New Zealand Dollar') {
      this.router.navigate(['/send-money-to-new-zealand']);
      this.country = 'Zealand';
    } else if (this.useRouterForName === 'Norwegian Krone') {
      this.router.navigate(['/send-money-to-norway']);
      this.country = 'Norway';
    } else if (this.useRouterForName === 'Omani Rial') {
      this.router.navigate(['/send-money-to-oman']);
      this.country = 'Oman';
    } else if (this.useRouterForName === 'Poland Zloty') {
      this.router.navigate(['/send-money-to-poland']);
      this.country = 'Poland';
    } else if (this.useRouterForName === 'Qatari Riyal') {
      this.router.navigate(['/send-money-to-qatar']);
      this.country = 'Qatar';
    } else if (this.useRouterForName === 'Saudi Riyal') {
      this.router.navigate(['/send-money-to-saudi-arabia']);
      this.country = 'Saudi-Arabia';
    } else if (this.useRouterForName === 'Singapore Dollar') {
      this.router.navigate(['/send-money-to-singapore']);
      this.country = 'Singapore';
    } else if (this.useRouterForName === 'South African Rand') {
      this.router.navigate(['/send-money-to-south-africa']);
      this.country = 'South-africa';
    } else if (this.useRouterForName === 'Swedish Krona') {
      this.router.navigate(['/send-money-to-sweden']);
      this.country = 'Sweden';
    } else if (this.useRouterForName === 'Swiss Franc') {
      this.router.navigate(['/send-money-to-switzerland']);
      this.country = 'Switzerland';
    } else if (this.useRouterForName === 'Turkish Lira') {
      this.router.navigate(['/send-money-to-turkey']);
      this.country = 'Turkey';
    } else if (this.useRouterForName === 'Ugandan Shilling') {
      this.router.navigate(['/send-money-to-uganda']);
      this.country = 'Uganda';
    } else if (this.useRouterForName === 'Afghan Afghani') {
      this.router.navigate(['/send-money-to-afghanistan']);
      this.country = 'Afghanistan';
    } else if (this.useRouterForName === 'CFA Franc BCEAO') {
      this.router.navigate(['/send--to-CFAfranc']);
      this.country = 'CFA franc';
    } else if (this.useRouterForName === 'Bostwana Pula') {
      this.router.navigate(['/send-money-to-botswana']);
      this.country = 'Botswana';
    } else if (
      this.useRouterForName === 'Burkina Faso (West African CFA Franc)'
    ) {
      this.router.navigate(['/send-money-to-burkina-faso']);
      this.country = 'Burkina-faso';
    } else if (this.useRouterForName === 'Burundian Franc') {
      this.router.navigate(['/send-money-to-burundi']);
      this.country = 'Burundi';
    } else if (this.useRouterForName === 'Cambodian Riel') {
      this.router.navigate(['/send-money-to-cambodia']);
      this.country = 'Cambodia';
    } else if (this.useRouterForName === 'Philippine Peso') {
      this.router.navigate(['/send-money-to-phillipines']);
      this.country = 'Phillipines';
    } else if (this.useRouterForName === 'Vietnamese Dong') {
      this.router.navigate(['/send-money-to-vietnam']);
      this.country = 'Vietnam';
    } else if (this.useRouterForName === 'Pakistani rupee') {
      this.router.navigate(['/send-money-to-pakistan']);
      this.country = 'Pakistan';
    } else if (this.useRouterForName === 'Ethiopian Birr') {
      this.router.navigate(['/send-money-to-ethiopia']);
      this.country = 'Ethiopia';
    } else if (this.useRouterForName === 'Russian Ruble') {
      this.router.navigate(['/send-money-to-russia']);
      this.country = 'Russia';
    } else if (this.useRouterForName === 'Rwandan Franc') {
      this.router.navigate(['/send-money-to-rwanda']);
      this.country = 'Rwanda';
    } else if (this.useRouterForName === 'Rwandan Franc') {
      this.router.navigate(['/send-money-to-tanzania']);
      this.country = 'Tanzania';
    } else if (this.useRouterForName === 'EURO') {
      this.router.navigate(['/send-money-in-europe']);
      this.country = 'Europe';
    } else if (this.useRouterForName === 'British Pound') {
      this.router.navigate(['/']);
    } else if (this.useRouterForName === '') {
      this.router.navigate(['/']);
    }
  }
}
