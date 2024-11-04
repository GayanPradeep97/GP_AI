import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-description-sl-sec',
  templateUrl: './description-sl-sec.component.html',
  styleUrls: ['./description-sl-sec.component.sass'],
})
export class DescriptionSlSecComponent {
  country: any;
  backgroundImage!: string;
  uniqueParagraph: any;
  content: any;

  constructor(private router: Router) {}

  ngOnInit() {
    this.changeContentBasedOnRouteUrl();
  }

  changeContentBasedOnRouteUrl() {
    if (this.router.url === '/send-money-to-sri-lanka') {
      this.country = 'Sri Lanka';
      this.backgroundImage =
        'url(./assets/images/country-desc-bg-img/700x376-px-Sri-Lanka-012.jpg)';
    } else if (this.router.url === '/send-money-to-bangladesh') {
      this.country = 'Bangladesh';
      this.backgroundImage =
        'url(./assets/images/country-desc-bg-img/Bangladesh.jpg)';
    } else if (this.router.url === '/send-money-to-philippines') {
      this.country = 'Philippines';
      this.backgroundImage =
        'url(./assets/images/country-desc-bg-img/700x376px-Philippines-0010.jpg)';
    } else if (this.router.url === '/send-money-to-congo-drc') {
      this.country = 'Congo DRC';
      this.backgroundImage =
        'url(./assets/images/country-desc-bg-img/700x376px-Congo-DRC-003.jpg)';
    } else if (this.router.url === '/send-money-to-nigeria') {
      this.country = 'Nigeria';
      this.backgroundImage =
        'url(./assets/images/country-desc-bg-img/Nigeria.jpg)';
    } else if (this.router.url === '/send-money-to-india') {
      this.country = 'India';
      this.backgroundImage =
        'url(./assets/images/country-desc-bg-img/700x376px-India-006.jpg)';
    } else if (this.router.url === '/send-money-to-thailand') {
      this.country = 'Thailand';
      this.backgroundImage =
        'url(./assets/images/country-desc-bg-img/Thailand.jpg)';
    } else if (this.router.url === '/send-money-to-malaysia') {
      this.country = 'Malaysia';
      this.backgroundImage =
        'url(./assets/images/country-desc-bg-img/Malaysia.jpg)';
    } else if (this.router.url === '/send-money-to-hong-kong') {
      this.country = 'Hong Kong';
      this.backgroundImage =
        'url(./assets/images/country-desc-bg-img/Hong-Kong.jpg)';
    } else if (this.router.url === '/send-money-to-canada') {
      this.country = 'Canada';
      this.backgroundImage =
        'url(./assets/images/country-desc-bg-img/Canada.jpg)';
    } else if (this.router.url === '/send-money-to-kenya') {
      this.country = 'Kenya';
      this.backgroundImage =
        'url(./assets/images/country-desc-bg-img/Kenya.jpg)';
    } else if (this.router.url === '/send-money-to-united-arab-emirates') {
      this.country = 'United Arab Emirates';
    } else if (this.router.url === '/send-money-in-usa') {
      this.country = 'USA';
      this.backgroundImage =
        'url(./assets/images/country-desc-bg-img/700x376px-USA-0013-NEW.png)';
      this.uniqueParagraph =
        "It's very easy to send money in USD. Using our website or the App, simply choose the amount you want to send, select where you want the money to be paid out and decide if you want to pay with your bank account or via card. That's it!";
    } else if (this.router.url === '/send-money-to-nepal') {
      this.country = 'Nepal';
      this.backgroundImage =
        'url(./assets/images/country-desc-bg-img/Nepal.jpg)';
    } else if (this.router.url === '/send-money-to-ghana') {
      this.country = 'Ghana';
      this.backgroundImage =
        'url(./assets/images/country-desc-bg-img/Ghana.jpg)';
    } else if (this.router.url === '/send-money-to-belgium') {
      this.country = 'Belgium';
    } else if (this.router.url === '/send-money-to-estonia') {
      this.country = 'Estonia';
    } else if (this.router.url === '/send-money-to-france') {
      this.country = 'France';
      this.backgroundImage =
        'url(./assets/images/country-desc-bg-img/700x376px-France-004.jpg)';
    } else if (this.router.url === '/send-money-to-australia') {
      this.country = 'Australia';
      this.backgroundImage =
        'url(./assets/images/country-desc-bg-img/Australia.jpg)';
    } else if (this.router.url === '/send-money-to-bahrain') {
      this.country = 'Bahrain';
    } else if (this.router.url === '/send-money-to-china') {
      this.country = 'China';
      this.backgroundImage =
        'url(./assets/images/country-desc-bg-img/China.jpg)';
    } else if (this.router.url === '/send-money-to-croatia') {
      this.country = 'Croatia';
    } else if (this.router.url === '/send-money-to-denmark') {
      this.country = 'Denmark';
    } else if (this.router.url === '/send-money-in-europe') {
      this.country = 'Europe';
      this.backgroundImage =
        'url(./assets/images/country-desc-bg-img/700x376-px-SEPA-0011.jpg)';
    } else if (this.router.url === '/send-money-to-hungary') {
      this.country = 'Hungary';
    } else if (this.router.url === '/send-money-to-indonesia') {
      this.country = 'Indonesia';
      this.backgroundImage =
        'url(./assets/images/country-desc-bg-img/Indonesia.jpg)';
    } else if (this.router.url === '/send-money-to-israel') {
      this.country = 'Israel';
    } else if (this.router.url === '/send-money-to-japan') {
      this.country = 'Japan';
    } else if (this.router.url === '/send-money-to-kuwait') {
      this.country = 'Kuwait';
    } else if (this.router.url === '/send-money-to-mexico') {
      this.country = 'Mexico';
    } else if (this.router.url === '/send-money-to-new-zealand') {
      this.country = 'New Zealand';
    } else if (this.router.url === '/send-money-to-norway') {
      this.country = 'Norway';
    } else if (this.router.url === '/send-money-to-oman') {
      this.country = 'Oman';
    } else if (this.router.url === '/send-money-to-poland') {
      this.country = 'Poland';
    } else if (this.router.url === '/send-money-to-qatar') {
      this.country = 'Qatar';
    } else if (this.router.url === '/send-money-to-saudi-arabia') {
      this.country = 'Saudi Arabia';
    } else if (this.router.url === '/send-money-to-singapore') {
      this.country = 'Singapore';
      this.backgroundImage =
        'url(./assets/images/country-desc-bg-img/700x376px-France-004.jpg)';
    } else if (this.router.url === '/send-money-to-south-africa') {
      this.country = 'South Africa';
    } else if (this.router.url === '/send-money-to-sweden') {
      this.country = 'Sweden';
    } else if (this.router.url === '/send-money-to-switzerland') {
      this.country = 'Switzerland';
    } else if (this.router.url === '/send-money-to-turkey') {
      this.country = 'Turkey';
    } else if (this.router.url === '/send-money-to-uganda') {
      this.country = 'Uganda';
    } else if (this.router.url === '/send-money-to-afghanistan') {
      this.country = 'Afghanistan';
    } else if (this.router.url === '/send--to-CFAfranc') {
      this.country = 'CFA franc';
      this.backgroundImage =
        'url(./assets/images/country-desc-bg-img/700x376px-France-004.jpg)';
    } else if (this.router.url === '/send-money-to-botswana') {
      this.country = 'Botswana';
    } else if (this.router.url === '/send-money-to-burkina-faso') {
      this.country = 'Burkina Faso';
    } else if (this.router.url === '/send-money-to-burundi') {
      this.country = 'Burundi';
    } else if (this.router.url === '/send-money-to-cambodia') {
      this.country = 'Cambodia';
    } else if (this.router.url === '/send-money-to-phillipines') {
      this.country = 'Phillipines';
      this.backgroundImage =
        'url(./assets/images/country-desc-bg-img/Phillipines.jpg)';
    } else if (this.router.url === '/send-money-to-vietnam') {
      this.country = 'Vietnam';
      this.backgroundImage =
        'url(./assets/images/country-desc-bg-img/Vietnam.jpg)';
    } else if (this.router.url === '/send-money-to-pakistan') {
      this.country = 'Pakistan';
      this.backgroundImage =
        'url(./assets/images/country-desc-bg-img/Pakistan.jpg)';
    } else if (this.router.url === '/send-money-to-ethiopia') {
      this.country = 'Ethiopia';
    } else if (this.router.url === '/send-money-to-russia') {
      this.country = 'Russia';
    } else if (this.router.url === '/send-money-to-rwanda') {
      this.country = 'Rwanda';
    } else if (this.router.url === '/send-money-to-tanzania') {
      this.country = 'Tanzania';
    }
  }
}
