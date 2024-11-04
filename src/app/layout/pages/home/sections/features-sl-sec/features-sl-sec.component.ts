import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-features-sl-sec',
  templateUrl: './features-sl-sec.component.html',
  styleUrls: ['./features-sl-sec.component.sass'],
})
export class FeaturesSlSecComponent {
  country: any; //used
  nationality: any; //used
  walletPayouts: any;
  immediatePaymentsTitle: any; //used
  immediatePaymentsUniqueParagraph: any; //used
  instantCashPickupUniqueParagraph: any;
  showInstantCashPickup = false;
  showImmediatePayments = false; //used
  appData: any;
  showImmediatePaymentDes: any; //used
  instantCashDes: any; //used

  constructor(public router: Router) {}

  ngOnInit() {
    // this.appData = require(`./../../../../../environments/${folderName}/paramVariable.ts`);
    this.changeContentBasedOnRouteUrl();
  }

  changeContentBasedOnRouteUrl() {
    if (this.router.url === '/send-money-to-sri-lanka') {
      this.country = 'Sri Lanka';
      this.nationality = 'Sri Lankan';
      // tslint:disable-next-line: max-line-length
      this.instantCashPickupUniqueParagraph =
        'Send money to Sri Lanka, your recipient can pick up cash at any Cargills Bank or at Cargills Food City which is open 7 days a week 365 days a year.Your recipient needs a valid ID and the SpotOn transaction number. Additionally, your recipient can get a 5 % discount on purchases at Cargills Food City.';
      this.showInstantCashPickup = true;
      this.showImmediatePayments = true;
    } else if (this.router.url === '/send-money-to-bangladesh') {
      this.country = 'Bangladesh';
      this.nationality = 'Bangladeshi';
      this.walletPayouts = 'Bkash';
      this.showInstantCashPickup = true;
      this.showImmediatePayments = true;
    } else if (this.router.url === '/send-money-to-philippines') {
      this.country = 'Philippines';
      this.nationality = 'Philippine';
      this.walletPayouts = 'GCash, PayMaya, OMNIPAY,  and True Money';
      this.showImmediatePaymentDes =
        'Funds are typically deposited within a couple of hours on business days.';
      this.instantCashDes =
        'Send money to the Philippines, and your recipient can access cash through online wallets such as GCash, PayMaya, OMNIPAY,  and True Money. All they need is a valid ID and the Bankoyo transaction number.';
      this.showInstantCashPickup = true;
      this.showImmediatePayments = true;
    } else if (this.router.url === '/send-money-to-congo-drc') {
      this.country = 'Congo DRC';
      this.nationality = 'Congo';
      // tslint:disable-next-line: max-line-length
      this.instantCashPickupUniqueParagraph =
        'Send money to Congo DRC, your recipient can pick up cash at any Airtel shops or Orange money stores. Your recipient needs a valid ID and the SpotOn transaction number.';
      this.showInstantCashPickup = true;
      this.showImmediatePayments = false;
    } else if (this.router.url === '/send-money-to-nigeria') {
      this.country = 'Nigeria';
      this.nationality = 'Nigerian';
      this.walletPayouts = 'Paga Wallets';
      this.showInstantCashPickup = true;
      this.showImmediatePayments = true;
    } else if (this.router.url === '/send-money-to-india') {
      this.country = 'India';
      this.nationality = 'Indian';
      this.showInstantCashPickup = false;
      this.showImmediatePayments = true;
    } else if (this.router.url === '/send-money-to-thailand') {
      this.country = 'Thailand';
      this.nationality = 'Thai';
      this.showInstantCashPickup = true;
      this.showImmediatePayments = true;
    } else if (this.router.url === '/send-money-to-malaysia') {
      this.country = 'Malaysia';
      this.nationality = 'Malaysian';
      this.showInstantCashPickup = true;
      this.showImmediatePayments = true;
      this.showImmediatePaymentDes =
        'Deposits are processed within a few hours on business days.';
      this.instantCashDes =
        'Send money to Malaysia, and your recipient can access cash through local pick-up options. They will need a valid ID and the Bankoyo transaction number.';
    } else if (this.router.url === '/send-money-to-hong-kong') {
      this.country = 'Hong Kong';
      this.nationality = 'Hong Kong';
      this.showInstantCashPickup = true;
      this.showImmediatePayments = true;
    } else if (this.router.url === '/send-money-to-canada') {
      this.country = 'Canada';
      this.nationality = 'Canadian';
      this.showInstantCashPickup = true;
      this.showImmediatePayments = true;
    } else if (this.router.url === '/send-money-to-kenya') {
      this.country = 'Kenya';
      this.nationality = 'Kenyan';
      this.walletPayouts = 'Airtel Money, Safaricom and Safaricom (M-PESA)';
      this.showInstantCashPickup = true;
      this.showImmediatePayments = true;
    } else if (this.router.url === '/send-money-to-united-arab-emirates') {
      this.country = 'United Arab Emirates';
      this.nationality = 'United Arab Emirates';
      this.showInstantCashPickup = false;
      this.showImmediatePayments = true;
    } else if (this.router.url === '/send-money-in-usd') {
      this.country = 'USA';
      this.nationality = 'Ameriacan';
      this.immediatePaymentsUniqueParagraph =
        'Make a transfer to any American bank accounts. Now you can also send US Dollars to any USD currency account held in selected banks in Sri Lanka which to be received within 2 days.';
      this.showInstantCashPickup = false;
      this.showImmediatePayments = true;
    } else if (this.router.url === '/send-money-to-nepal') {
      this.country = 'Nepal';
      this.nationality = 'Nepali';
      this.showInstantCashPickup = true;
      this.showImmediatePayments = true;
      this.showImmediatePaymentDes =
        'Deposits are processed within a few hours on business days.';
      this.instantCashDes =
        'Send money to Nepal, and your recipient can access cash through local pick-up options. They will need a valid ID and the Bankoyo transaction number.';
    } else if (this.router.url === '/send-money-to-ghana') {
      this.country = 'Ghana';
      this.nationality = 'Ghanaian';
      // tslint:disable-next-line: max-line-length
      this.instantCashPickupUniqueParagraph =
        'Send money to Ghana, your recipient can pick up cash at any Bank. Your recipient needs a valid ID and the SpotOn transaction number.';
      this.showInstantCashPickup = true;
      this.showImmediatePayments = true;
      this.showImmediatePaymentDes =
        'Deposits are processed within a few hours on business days.';
      this.instantCashDes =
        'Send money to Ghana, your recipient can pick up cash at any Bank. Your recipient needs a valid ID and the SpotOn transaction number.';
    } else if (this.router.url === '/send-money-to-belgium') {
      this.country = 'Belgium';
      this.nationality = 'Belgian';
      this.showInstantCashPickup = true;
      this.showImmediatePayments = true;
    } else if (this.router.url === '/send-money-to-estonia') {
      this.country = 'Estonia';
      this.nationality = 'Estonian';
      this.showInstantCashPickup = true;
      this.showImmediatePayments = true;
    } else if (this.router.url === '/send-money-to-france') {
      this.country = 'France';
      this.nationality = 'French';
      this.showInstantCashPickup = true;
      this.showImmediatePayments = true;
    } else if (this.router.url === '/send-money-to-australia') {
      this.country = 'Australia';
      this.nationality = 'Australian';
      this.showInstantCashPickup = true;
      this.showImmediatePayments = true;
      this.showImmediatePaymentDes =
        'Deposits are processed within a few hours on business days.';
      this.instantCashDes =
        'Send money to Australia, and your recipient can access cash through local pick-up options. Your recipient will need a valid ID and the Bankoyo transaction number.';
    } else if (this.router.url === '/send-money-to-bahrain') {
      this.country = 'Bahrain';
      this.nationality = 'Bahraini';
      this.showInstantCashPickup = true;
      this.showImmediatePayments = true;
    } else if (this.router.url === '/send-money-to-china') {
      this.country = 'China';
      this.nationality = 'Chinese';
      this.showInstantCashPickup = true;
      this.showImmediatePayments = true;
      this.showImmediatePaymentDes =
        'Deposits are processed within a few hours on business days.';
      this.instantCashDes =
        'Send money to China, and your recipient can access cash through local pick-up options. Your recipient will need a valid ID and the Bankoyo transaction number.';
    } else if (this.router.url === '/send-money-to-croatia') {
      this.country = 'Croatia';
      this.nationality = 'Croatian';
      this.showInstantCashPickup = true;
      this.showImmediatePayments = true;
    } else if (this.router.url === '/send-money-to-denmark') {
      this.country = 'Denmark';
      this.nationality = 'Danish';
      this.showInstantCashPickup = true;
      this.showImmediatePayments = true;
    } else if (this.router.url === '/send-money-in-europe') {
      this.country = 'Europe';
      this.nationality = 'European';
      this.immediatePaymentsTitle = 'SEPA Payments - Account Deposits';
      this.immediatePaymentsUniqueParagraph =
        'Make cashless euro payments to any account located anywhere in Single Euro Payments Area using a single bank account through SEPA payment gateway.';
      this.instantCashPickupUniqueParagraph =
        'Send money to Europe, your recipient can pick up cash at any SEPA supported Bank. Your recipient needs a valid ID and the SpotOn transaction number.';
      this.showInstantCashPickup = true;
      this.showImmediatePayments = true;
    } else if (this.router.url === '/send-money-to-hungary') {
      this.country = 'Hungary';
      this.nationality = 'Hungarian';
      this.showInstantCashPickup = true;
      this.showImmediatePayments = true;
    } else if (this.router.url === '/send-money-to-indonesia') {
      this.country = 'Indonesia';
      this.nationality = 'Indonesian';
      this.showInstantCashPickup = true;
      this.showImmediatePayments = true;
      this.showImmediatePaymentDes =
        'Deposits are processed within a few hours on business days.';
      this.instantCashDes =
        'Send money to Indonesia, and your recipient can access cash through local pick-up options. They will need a valid ID and the Bankoyo transaction number.';
    } else if (this.router.url === '/send-money-to-israel') {
      this.country = 'Israel';
      this.nationality = 'Israeli';
      this.showInstantCashPickup = true;
      this.showImmediatePayments = true;
    } else if (this.router.url === '/send-money-to-japan') {
      this.country = 'Japan';
      this.nationality = 'Japanese';
      this.showInstantCashPickup = true;
      this.showImmediatePayments = true;
    } else if (this.router.url === '/send-money-to-kuwait') {
      this.country = 'Kuwait';
      this.nationality = 'Kuwaiti';
      this.showInstantCashPickup = true;
      this.showImmediatePayments = true;
    } else if (this.router.url === '/send-money-to-mexico') {
      this.country = 'Mexico';
      this.nationality = 'Mexican';
      this.showInstantCashPickup = true;
      this.showImmediatePayments = true;
    } else if (this.router.url === '/send-money-to-new-zealand') {
      this.country = 'New Zealand';
      this.nationality = 'New Zealand';
      this.showInstantCashPickup = true;
      this.showImmediatePayments = true;
    } else if (this.router.url === '/send-money-to-norway') {
      this.country = 'Norway';
      this.nationality = 'Norwegian';
      this.showInstantCashPickup = true;
      this.showImmediatePayments = true;
    } else if (this.router.url === '/send-money-to-oman') {
      this.country = 'Oman';
      this.nationality = 'Omani';
      this.showInstantCashPickup = true;
      this.showImmediatePayments = true;
    } else if (this.router.url === '/send-money-to-poland') {
      this.country = 'Poland';
      this.nationality = 'Polish';
      this.showInstantCashPickup = true;
      this.showImmediatePayments = true;
    } else if (this.router.url === '/send-money-to-qatar') {
      this.country = 'Qatar';
      this.nationality = 'Qatari';
      this.showInstantCashPickup = true;
      this.showImmediatePayments = true;
    } else if (this.router.url === '/send-money-to-saudi-arabia') {
      this.country = 'Saudi Arabia';
      this.nationality = 'Saudi Arabian';
      this.showInstantCashPickup = true;
      this.showImmediatePayments = true;
    } else if (this.router.url === '/send-money-to-singapore') {
      this.country = 'Singapore';
      this.nationality = 'Singaporean';
      this.showInstantCashPickup = true;
      this.showImmediatePayments = true;
    } else if (this.router.url === '/send-money-to-south-africa') {
      this.country = 'South Africa';
      this.nationality = 'South African';
      this.showInstantCashPickup = true;
      this.showImmediatePayments = true;
    } else if (this.router.url === '/send-money-to-sweden') {
      this.country = 'Sweden';
      this.nationality = 'Swedish';
      this.showInstantCashPickup = true;
      this.showImmediatePayments = true;
    } else if (this.router.url === '/send-money-to-switzerland') {
      this.country = 'Switzerland';
      this.nationality = 'Swiss';
      this.showInstantCashPickup = true;
      this.showImmediatePayments = true;
    } else if (this.router.url === '/send-money-to-turkey') {
      this.country = 'Turkey';
      this.nationality = 'Turkish';
      this.showInstantCashPickup = true;
      this.showImmediatePayments = true;
    } else if (this.router.url === '/send-money-to-uganda') {
      this.country = 'Uganda';
      this.nationality = 'Ugandan';
      this.showInstantCashPickup = true;
      this.showImmediatePayments = true;
    } else if (this.router.url === '/send-money-to-afghanistan') {
      this.country = 'Afghanistan';
      this.nationality = 'Afghan';
      this.showInstantCashPickup = true;
      this.showImmediatePayments = true;
    } else if (this.router.url === '/send--to-CFAfranc') {
      this.country = 'CFA francs';
      this.nationality = 'CFA francs';
      this.showInstantCashPickup = true;
      this.showImmediatePayments = true;
      this.showImmediatePaymentDes =
        'Deposits are processed within a few hours on business days.';
      this.instantCashDes =
        'Send money to countries using CFA francs, and your recipient can access cash through local pick-up options. They will need a valid ID and the Bankoyo transaction number.';
    } else if (this.router.url === '/send-money-to-botswana') {
      this.country = 'Botswana';
      this.nationality = 'Motswana';
      this.showInstantCashPickup = true;
      this.showImmediatePayments = true;
    } else if (this.router.url === '/send-money-to-burkina-faso') {
      this.country = 'Burkina Faso';
      this.nationality = 'Burkinabe';
      this.showInstantCashPickup = true;
      this.showImmediatePayments = true;
    } else if (this.router.url === '/send-money-to-burundi') {
      this.country = 'Burundi';
      this.nationality = 'Burundian';
      this.showInstantCashPickup = true;
      this.showImmediatePayments = true;
    } else if (this.router.url === '/send-money-to-cambodia') {
      this.country = 'Cambodia';
      this.nationality = 'Cambodian';
      this.showInstantCashPickup = true;
      this.showImmediatePayments = true;
    } else if (this.router.url === '/send-money-to-phillipines') {
      this.country = 'Phillipines';
      this.nationality = 'Filipino';
      this.showInstantCashPickup = true;
      this.showImmediatePayments = true;
    } else if (this.router.url === '/send-money-to-vietnam') {
      this.country = 'Vietnam';
      this.nationality = 'Vietnamese';
      this.showInstantCashPickup = true;
      this.showImmediatePayments = true;
    } else if (this.router.url === '/send-money-to-pakistan') {
      this.country = 'Pakistan';
      this.nationality = 'Pakistani';
      this.showInstantCashPickup = true;
      this.showImmediatePayments = true;
      this.showImmediatePaymentDes =
        'Deposits are processed within a few hours on business days.';
      this.instantCashDes =
        'Send money to Pakistan, and your recipient can access cash through local pick-up options. They will need a valid ID and the Bankoyo transaction number.';
    } else if (this.router.url === '/send-money-to-ethiopia') {
      this.country = 'Ethiopia';
      this.nationality = 'Ethiopian';
      this.showInstantCashPickup = true;
      this.showImmediatePayments = true;
    } else if (this.router.url === '/send-money-to-russia') {
      this.country = 'Russia';
      this.nationality = 'Russian';
      this.showInstantCashPickup = true;
      this.showImmediatePayments = true;
    } else if (this.router.url === '/send-money-to-rwanda') {
      this.country = 'Rwanda';
      this.nationality = 'rwandan';
      this.showInstantCashPickup = true;
      this.showImmediatePayments = true;
    } else if (this.router.url === '/send-money-to-tanzania') {
      this.country = 'Tanzania';
      this.nationality = 'Tanzanian';
      this.showInstantCashPickup = true;
      this.showImmediatePayments = true;
    }
  }
}
