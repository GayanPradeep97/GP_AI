import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-convenience-sl-sec',
  templateUrl: './convenience-sl-sec.component.html',
  styleUrls: ['./convenience-sl-sec.component.sass'],
})
export class ConvenienceSlSecComponent {
  appData: any;
  country: any;
  nationality: any;
  walletPayoutImgUrl1: any;
  walletPayoutTitle1: any;
  walletPayoutUniqueDesc1: any;
  walletPayoutImgUrl2: any;
  walletPayoutTitle2: any;
  walletPayoutUniqueDesc2: any;
  walletPayoutImgUrl3: any;
  walletPayoutTitle3: any;
  walletPayoutUniqueDesc3: any;
  walletPayoutImgUrl4: any;
  walletPayoutTitle4: any;
  walletPayoutUniqueDesc4: any;

  showMajorBanks = true;
  firstColSize: any;
  showConvenienceSec = true;

  uniqueParagraph: any;

  constructor(public router: Router) {}

  get currentRoute(): string {
    return this.router.url;
  }

  ngOnInit() {
    // this.appData = require(`./../../../../../environments/${folderName}/paramVariable.ts`);
    this.changeContentBasedOnRouteUrl();
  }

  changeContentBasedOnRouteUrl() {
    if (this.router.url === '/send-money-to-sri-lanka') {
      this.country = 'Sri Lanka';
      this.nationality = 'Sri Lankan';
      this.walletPayoutImgUrl1 = './assets/walletPayouts/cargills-logo.png';
      this.walletPayoutTitle1 = 'Cargills Food City';
      // tslint:disable-next-line: max-line-length
      this.walletPayoutUniqueDesc1 =
        'Now you can send money home and collect at its network of 400+ countrywide Cargills Food City outlets and get a 5% discount on purchases.';
      // this.walletPayoutImgUrl2 = './assets/walletPayouts/Ez Cash.jpg';
      // this.walletPayoutTitle2 = 'EzCash';
      // this.walletPayoutUniqueDesc2 = 'Now you can send money home and collect at any outlets serving EzCash';

      this.firstColSize = 6;
    } else if (this.router.url === '/send-money-to-bangladesh') {
      this.country = 'Bangladesh';
      this.nationality = 'Bangladeshi';
      this.walletPayoutImgUrl2 = './assets/walletPayouts/bKash-Logo.png';
      this.walletPayoutTitle2 = 'BKash';
      this.walletPayoutImgUrl1 = './assets/walletPayouts/Rocket-Logo.png';
      this.walletPayoutTitle1 = 'Rocket';

      this.showMajorBanks = false;
      this.firstColSize = 9;
    } else if (this.router.url === '/send-money-to-philippines') {
      this.country = 'Philippines';
      this.nationality = 'Philippine';
      this.walletPayoutImgUrl2 = './assets/walletPayouts/GCash-Logo.png';
      this.walletPayoutTitle2 = 'Gcash';
      this.walletPayoutImgUrl1 = './assets/walletPayouts/Omnipay-Logo.png';
      this.walletPayoutTitle1 = 'Omnipay';
      this.walletPayoutImgUrl3 = './assets/walletPayouts/TRUE MONEY.png';
      this.walletPayoutTitle3 = 'True Money';
      this.walletPayoutImgUrl4 = './assets/walletPayouts/PayMaya-Logo.png';
      this.walletPayoutTitle4 = 'PayMaya';

      this.firstColSize = 3;
    } else if (this.router.url === '/send-money-to-congo-drc') {
      this.country = 'Congo DRC';
      this.nationality = 'Congo';
      this.walletPayoutImgUrl1 = './assets/walletPayouts/Airtel-money-Logo.png';
      this.walletPayoutTitle1 = 'Airtel Money';
      this.walletPayoutImgUrl2 = './assets/walletPayouts/Orange-Logo.png';
      this.walletPayoutTitle2 = 'Orange Money';
      this.walletPayoutUniqueDesc2 =
        'Now you can send money home and collect at any store of Orange Money';

      this.showMajorBanks = false;
      this.firstColSize = 6;
    } else if (this.router.url === '/send-money-to-nigeria') {
      this.country = 'Nigeria';
      this.nationality = 'Nigerian';
      this.walletPayoutImgUrl1 = './assets/walletPayouts/Paga-Logo.png';
      this.walletPayoutTitle1 = 'Paga Wallets';

      this.firstColSize = 6;
    } else if (this.router.url === '/send-money-to-india') {
      this.country = 'India';
      this.nationality = 'Indian';

      this.firstColSize = 9;
    } else if (this.router.url === '/send-money-to-thailand') {
      this.country = 'Thailand';
      this.nationality = 'Thai';

      this.firstColSize = 9;
    } else if (this.router.url === '/send-money-to-malaysia') {
      this.country = 'Malaysia';
      this.nationality = 'Malaysian';

      this.firstColSize = 9;
    } else if (this.router.url === '/send-money-to-hong-kong') {
      this.country = 'Hong Kong';
      this.nationality = 'Hong Kong';

      this.firstColSize = 9;
    } else if (this.router.url === '/send-money-to-canada') {
      this.country = 'Canada';
      this.nationality = 'Canadian';

      this.firstColSize = 9;
    } else if (this.router.url === '/send-money-to-kenya') {
      this.country = 'Kenya';
      this.nationality = 'Kenyan';
      // this.walletPayoutImgUrl1 = './assets/images/other-banks-logo.png';
      // this.walletPayoutTitle1 = 'All Wallets';
      // this.walletPayoutUniqueDesc1 = 'You family can receive in their account held at all Kenyan wallets.';

      this.walletPayoutImgUrl1 = './assets/walletPayouts/Airtel-money-Logo.png';
      this.walletPayoutTitle1 = 'Airtel Money';
      this.walletPayoutImgUrl2 = './assets/walletPayouts/Safaricom.png';
      this.walletPayoutTitle2 = 'Safaricom';
      this.walletPayoutImgUrl3 = './assets/walletPayouts/Safaricom Mpesa.png';
      this.walletPayoutTitle3 = 'Safaricom (m-pesa)';

      this.firstColSize = 0;
    } else if (this.router.url === '/send-money-to-united-arab-emirates') {
      this.country = 'United Arab Emirates';
      this.nationality = 'United Arab Emirates';

      this.firstColSize = 9;
    } else if (this.router.url === '/send-money-in-usa') {
      this.country = 'USA';
      this.nationality = 'Ameriacan';

      this.walletPayoutImgUrl1 = './assets/images/other-banks-logo.png';
      this.walletPayoutTitle1 = 'All Major Banks';
      this.walletPayoutUniqueDesc1 =
        'You family can receive in their account held at all Ameriacan banks.';

      this.walletPayoutImgUrl2 = './assets/images/other-banks-logo.png';
      this.walletPayoutTitle2 = 'Selected Banks';
      this.walletPayoutUniqueDesc2 =
        'The payment will be realised within 2 days in any USD currency account held in selected banks of Sri Lanka';

      this.uniqueParagraph =
        'Now you can send US Dollars to any USD currency <br> account held in selected banks in Sri Lanka';

      this.showMajorBanks = false;
      this.firstColSize = 6;
    } else if (this.router.url === '/send-money-to-nepal') {
      this.country = 'Nepal';
      this.nationality = 'Nepali';

      this.firstColSize = 9;
    } else if (this.router.url === '/send-money-to-ghana') {
      this.country = 'Ghana';
      this.nationality = 'Ghanaian';
      this.walletPayoutImgUrl1 = './assets/walletPayouts/MTN.jpg';
      this.walletPayoutTitle1 = 'MTN';
      this.walletPayoutImgUrl2 = './assets/walletPayouts/Airtel Tigo.png';
      this.walletPayoutTitle2 = 'Airtel-TIGO';
      this.walletPayoutImgUrl3 = './assets/walletPayouts/Vodafone.png';
      this.walletPayoutTitle3 = 'Vodafone';

      this.firstColSize = 0;
    } else if (this.router.url === '/send-money-to-belgium') {
      this.country = 'Belgium';
      this.nationality = 'Belgian';

      this.firstColSize = 9;
    } else if (this.router.url === '/send-money-to-estonia') {
      this.country = 'Estonia';
      this.nationality = 'Estonian';

      this.firstColSize = 9;
    } else if (this.router.url === '/send-money-to-france') {
      this.country = 'France';
      this.nationality = 'French';

      this.firstColSize = 9;
    } else if (this.router.url === '/send-money-to-australia') {
      this.country = 'Australia';
      this.nationality = 'Australian';

      this.firstColSize = 9;
    } else if (this.router.url === '/send-money-to-bahrain') {
      this.country = 'Bahrain';
      this.nationality = 'Bahraini';

      this.firstColSize = 9;
    } else if (this.router.url === '/send-money-to-china') {
      this.country = 'China';
      this.nationality = 'Chinese';

      this.firstColSize = 9;
    } else if (this.router.url === '/send-money-to-croatia') {
      this.country = 'Croatia';
      this.nationality = 'Croatian';

      this.firstColSize = 9;
    } else if (this.router.url === '/send-money-to-denmark') {
      this.country = 'Denmark';
      this.nationality = 'Danish';

      this.firstColSize = 9;
    } else if (this.router.url === '/send-money-in-europe') {
      this.country = 'Europe';
      this.nationality = 'Europe';
      this.walletPayoutImgUrl1 = './assets/images/other-banks-logo.png';
      this.walletPayoutTitle1 = 'All Major Banks';
      this.walletPayoutUniqueDesc1 =
        'You family can receive in their account held at all SEPA region banks.';

      this.showMajorBanks = false;
      this.firstColSize = 9;
    } else if (this.router.url === '/send-money-to-hungary') {
      this.country = 'Hungary';
      this.nationality = 'Hungarian';

      this.firstColSize = 9;
    } else if (this.router.url === '/send-money-to-indonesia') {
      this.country = 'Indonesia';
      this.nationality = 'Indonesian';

      this.firstColSize = 9;
    } else if (this.router.url === '/send-money-to-israel') {
      this.country = 'Israel';
      this.nationality = 'Israeli';

      this.firstColSize = 9;
    } else if (this.router.url === '/send-money-to-japan') {
      this.country = 'Japan';
      this.nationality = 'Japanese';

      this.firstColSize = 9;
    } else if (this.router.url === '/send-money-to-kuwait') {
      this.country = 'Kuwait';
      this.nationality = 'Kuwaiti';

      this.firstColSize = 9;
    } else if (this.router.url === '/send-money-to-mexico') {
      this.country = 'Mexico';
      this.nationality = 'Mexican';

      this.firstColSize = 9;
    } else if (this.router.url === '/send-money-to-new-zealand') {
      this.country = 'New Zealand';
      this.nationality = 'New Zealand';

      this.firstColSize = 9;
    } else if (this.router.url === '/send-money-to-norway') {
      this.country = 'Norway';
      this.nationality = 'Norwegian';

      this.firstColSize = 9;
    } else if (this.router.url === '/send-money-to-oman') {
      this.country = 'Oman';
      this.nationality = 'Omani';

      this.firstColSize = 9;
    } else if (this.router.url === '/send-money-to-poland') {
      this.country = 'Poland';
      this.nationality = 'Polish';

      this.firstColSize = 9;
    } else if (this.router.url === '/send-money-to-qatar') {
      this.country = 'Qatar';
      this.nationality = 'Qatari';

      this.firstColSize = 9;
    } else if (this.router.url === '/send-money-to-saudi-arabia') {
      this.country = 'Saudi Arabia';
      this.nationality = 'Saudi Arabian';

      this.firstColSize = 9;
    } else if (this.router.url === '/send-money-to-singapore') {
      this.country = 'Singapore';
      this.nationality = 'Singaporean';

      this.firstColSize = 9;
    } else if (this.router.url === '/send-money-to-south-africa') {
      this.country = 'South Africa';
      this.nationality = 'South African';

      this.firstColSize = 9;
    } else if (this.router.url === '/send-money-to-sweden') {
      this.country = 'Sweden';
      this.nationality = 'Swedish';

      this.firstColSize = 9;
    } else if (this.router.url === '/send-money-to-switzerland') {
      this.country = 'Switzerland';
      this.nationality = 'Swiss';

      this.firstColSize = 9;
    } else if (this.router.url === '/send-money-to-turkey') {
      this.country = 'Turkey';
      this.nationality = 'Turkish';

      this.firstColSize = 9;
    } else if (this.router.url === '/send-money-to-uganda') {
      this.country = 'Uganda';
      this.nationality = 'Ugandan';

      this.firstColSize = 9;
    } else if (this.router.url === '/send-money-to-afghanistan') {
      this.country = 'Afghanistan';
      this.nationality = 'Afghan';
      this.walletPayoutImgUrl1 = './assets/walletPayouts/MTN.jpg';
      this.walletPayoutTitle1 = 'MTN';

      this.showMajorBanks = false;
      this.firstColSize = 9;
    } else if (this.router.url === '/send--to-CFAfranc') {
      this.country = 'CFA franc';
      this.nationality = 'CFA francs';
      // this.walletPayoutImgUrl1 = './assets/walletPayouts/MTN.jpg';
      // this.walletPayoutTitle1 = 'MTN';
      // this.walletPayoutImgUrl2 = './assets/walletPayouts/Moov.jpg';
      // this.walletPayoutTitle2 = 'Moov';

      this.showMajorBanks = true;
      this.firstColSize = 6;
    } else if (this.router.url === '/send-money-to-botswana') {
      this.country = 'Botswana';
      this.nationality = 'Motswana';
      this.walletPayoutImgUrl1 = './assets/walletPayouts/BTC Wallets.png';
      this.walletPayoutTitle1 = 'BTC Wallets';

      this.showMajorBanks = false;
      this.firstColSize = 9;
    } else if (this.router.url === '/send-money-to-burkina-faso') {
      this.country = 'Burkina Faso';
      this.nationality = 'Burkinabe';
      this.walletPayoutImgUrl1 = './assets/walletPayouts/Orange.png';
      this.walletPayoutTitle1 = 'Orange';
      this.walletPayoutImgUrl2 = './assets/walletPayouts/Onatel.jpg';
      this.walletPayoutTitle2 = 'Onatel';

      this.showMajorBanks = false;
      this.firstColSize = 6;
    } else if (this.router.url === '/send-money-to-burundi') {
      this.country = 'Burundi';
      this.nationality = 'Burundian';
      this.walletPayoutImgUrl1 = './assets/walletPayouts/EcoCash.jpg';
      this.walletPayoutTitle1 = 'EcoCash';

      this.showMajorBanks = false;
      this.firstColSize = 9;
    } else if (this.router.url === '/send-money-to-cambodia') {
      this.country = 'Cambodia';
      this.nationality = 'Cambodian';
      this.walletPayoutImgUrl1 = './assets/walletPayouts/Wing.jpg';
      this.walletPayoutTitle1 = 'Wing Money';
      this.walletPayoutImgUrl2 = './assets/walletPayouts/TRUE MONEY.png';
      this.walletPayoutTitle2 = 'True Money';

      this.showMajorBanks = false;
      this.firstColSize = 6;
    } else if (this.router.url === '/send-money-to-phillipines') {
      this.country = 'Phillipines';
      this.nationality = 'Filipino';

      this.firstColSize = 9;
    } else if (this.router.url === '/send-money-to-vietnam') {
      this.country = 'Vietnam';
      this.nationality = 'Vietnamese';

      this.firstColSize = 9;
    } else if (this.router.url === '/send-money-to-pakistan') {
      this.country = 'Pakistan';
      this.nationality = 'Pakistani';

      this.firstColSize = 9;
    } else if (this.router.url === '/send-money-to-ethiopia') {
      this.country = 'Ethiopia';
      this.nationality = 'Ethiopian';

      this.firstColSize = 9;
    } else if (this.router.url === '/send-money-to-russia') {
      this.country = 'Russia';
      this.nationality = 'Russian';

      this.firstColSize = 9;
    } else if (this.router.url === '/send-money-to-rwanda') {
      this.country = 'Rwanda';
      this.nationality = 'rwandan';

      this.firstColSize = 9;
    } else if (this.router.url === '/send-money-to-tanzania') {
      this.country = 'Tanzania';
      this.nationality = 'Tanzanian';

      this.firstColSize = 9;
    }
  }
}
