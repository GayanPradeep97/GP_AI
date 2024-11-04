import { Component, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ForgotPasswordComponent } from '../../../forgot-password/forgot-password.component';
import { PopupMessageComponent } from 'src/app/layout/common-components/popup-message/popup-message.component';
import { SignupComponent } from '../../../signup/signup/signup.component';

@Component({
  selector: 'app-questions-sec',
  templateUrl: './questions-sec.component.html',
  styleUrls: ['./questions-sec.component.sass'],
})
export class QuestionsSecComponent {
  country: any;
  content1: any;
  header1: any;
  content2: any;
  header2: any;
  content3: any;
  header3: any;
  content4: any;
  header4: any;
  content5: any;
  header5: any;
  constructor(
    private router: Router,
    private modalService: NzModalService,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  ngOnInit() {
    this.changeContentBasedOnRouteUrl();
  }

  openSignup() {
    if (window.innerWidth > 992) {
      this.modalService.create({
        nzContent: PopupMessageComponent,
        nzClosable: true,
        nzFooter: null,
        nzWidth: 510,
        nzClassName: 'popup-message',
      });
    } else {
      this.modalService.create({
        nzTitle: 'Sign Up',
        nzContent: SignupComponent,
        nzClosable: true,
        nzFooter: null,
        nzWidth: 510,
        nzClassName: 'sign-up',
      });
    }
  }
  openResetPassword() {
    this.modalService.create({
      nzTitle: 'Forgot your Password?',
      nzContent: ForgotPasswordComponent,
      nzClosable: true,
      nzFooter: null,
      nzWidth: 460,
      nzClassName: 'forgot-page',
    });
  }

  gotorefunpolicy() {
    this.router.navigate(['/terms-conditions']);
  }

  changeContentBasedOnRouteUrl() {
    if (this.router.url === '/send-money-to-sri-lanka') {
      this.country = 'Sri Lanka';
      this.header1 =
        'What are the fees for sending money to Sri Lanka using SpotOn?';
      this.content1 =
        'The fees for sending money to Sri Lanka vary depending on the amount being transferred and the payment method used. You can view the specific fees on the SpotOn website during the transaction process.';
      this.header2 = 'How long does it take for money to arrive in Sri Lanka?';
      this.content2 =
        'Transfers to Sri Lanka are typically processed within a few hours, especially during business days. However, delays may occur depending on the recipient ’s bank and local regulations.';

      this.header3 =
        'What payment methods are accepted for sending money to Sri Lanka?';
      this.content3 =
        'SpotOn accepts various payment methods, including bank transfers, credit/debit cards, and mobile wallets. Check the payment options available at the time of your transaction.';

      this.header4 =
        'What are the available pickup options for recipients in Sri Lanka?';
      this.content4 =
        'Recipients in Sri Lanka can receive funds directly into their bank accounts or opt for cash pickup at designated locations. Ensure the recipient has a valid ID and transaction number for cash pickups.';

      this.header5 = 'What information do I need to send money to Sri Lanka?';
      this.content5 =
        'To send money, you will need the recipient ’s full name, bank account details (if applicable), and a valid ID for cash pickup options. Ensure that all information is accurate to avoid delays.';
    } else if (this.router.url === '/send-money-to-bangladesh') {
      this.country = 'Bangladesh';
      this.header1 = 'What are Wallet payments?';
      this.content1 =
        'A digital wallet (e-wallet) in Bangladesh securely stores users’ payment info and enables mobile payments via smartphones for purchases.';
      this.header2 = 'Where and How to Collect?';
      this.content2 =
        'You can collect via bKash or Rocket. Visit bKash Remittance for details.';

      this.header3 = 'Is there a fee for Wallet Payment collection?';
      this.content3 = 'For Zwa Cash, check fees at Zwa Cash Pricing.';

      this.header4 = 'What information do I need to send money to Congo DRC?';
      this.content4 =
        'To send money, you will need the recipient’s full name, bank account details (if applicable), and a valid ID for cash pickup options. Ensure that all information is accurate to avoid delays.';

      this.header5 = 'What is the BKash transfer limit?';
      this.content5 =
        'In Bangladesh, you can send up to BDT 50 per transfer; cash payouts have restrictions depending on the agent. Limits may change.';
    } else if (this.router.url === '/send-money-to-philippines') {
      this.country = 'Philippines';
      this.header1 = 'How long does it take to send money to the Philippines?';
      this.content1 =
        'Transfers are typically processed within a few hours or by the next business day, depending on the recipient’s bank.';
      this.header2 = 'Are there any fees for sending money?';
      this.content2 =
        'Yes, SpotOn charges a small fee depending on the amount and payment method used.';

      this.header3 = 'Can I send money to a bank account?';
      this.content3 =
        'Yes, you can send money directly to the recipient’s bank account in the Philippines.';

      this.header4 = 'What payment methods are accepted?';
      this.content4 =
        'You can use debit cards, credit cards, and bank transfers to send money.';

      this.header5 = 'Is sending money through SpotOn secure?';
      this.content5 =
        'Yes, SpotOn uses advanced security protocols to ensure safe and secure transactions.';
    } else if (this.router.url === '/send-money-to-congo-drc') {
      this.country = 'Congo DRC';
      this.header1 = 'How long does it take to send money to Congo DRC?';
      this.content1 =
        'Transfers are usually processed within a few hours or the next business day.';
      this.header2 = 'Are there any fees involved?';
      this.content2 = 'Yes, fees depend on the amount and method of transfer.';

      this.header3 =
        'What are the payment options for recipients in Congo DRC?';
      this.content3 =
        'Recipients can choose between bank deposits and cash pickups.';

      this.header4 = 'What information do I need to send money to Congo DRC?';
      this.content4 =
        ' To send money, you will need the recipient’s full name, bank account details (if applicable), and a valid ID for cash pickup options. Ensure that all information is accurate to avoid delays.';

      this.header5 = 'Is customer support available?';
      this.content5 =
        ' Yes, you can contact SpotOn customer service for any questions.';
    } else if (this.router.url === '/send-money-to-nigeria') {
      this.country = 'Nigeria';
    } else if (this.router.url === '/send-money-to-india') {
      this.country = 'India';
      this.header1 =
        'What are the fees for sending money to India using SpotOn?';
      this.content1 =
        'The fees for sending money to India depend on the transfer amount and the payment method selected. SpotOn provides a transparent fee structure, which you can view on their website during the transaction process. ';
      this.header2 = 'What is the maximum amount I can send?';
      this.content2 =
        'The limit is INR 200,000 per transfer. After reaching this limit, your account will be reviewed, and you may need to provide the source of funds or proof of income as required by law. For cash payouts, restrictions may apply based on the collecting agent.<br>Note: These limits are subject to change.';

      this.header3 = 'How long does it take for money to arrive in India?';
      this.content3 =
        'Transfers to India are typically processed within a few hours, especially during business days. However, processing times may vary based on the recipient’s bank and local regulations.';

      this.header4 =
        'What payment methods does SpotOn accept for sending money to India?';
      this.content4 =
        'SpotOn accepts various payment methods, including bank transfers, credit/debit cards, and mobile wallets. You can select your preferred payment method when initiating a transfer.';

      this.header5 = 'Is it safe to send money to India with SpotOn?';
      this.content5 =
        'Yes, SpotOn prioritizes your security and employs advanced encryption and security measures to protect your personal and financial information during transactions, ensuring a secure transfer process.';
    } else if (this.router.url === '/send-money-to-thailand') {
      this.country = 'Thailand';
      this.header1 = 'What payment methods can I use?';
      this.content1 =
        'You can use bank transfers, credit cards, and debit cards.';
      this.header2 = 'How long will it take for the money to reach Thailand?';
      this.content2 =
        'Transfers are usually completed within a few hours, depending on the method used.';

      this.header3 = 'Are there fees associated with sending money?';
      this.content3 =
        'Yes, fees vary based on the amount and payment method chosen.';

      this.header4 = 'What information do I need to provide to send money?';
      this.content4 =
        ' You will need the recipient’s full name, bank details, and any required identification.';

      this.header5 = 'How do I contact customer support?';
      this.content5 =
        ' Customer support is available via email and phone for assistance.';
    } else if (this.router.url === '/send-money-to-malaysia') {
      this.country = 'Malaysia';
      this.header1 = 'What payment methods are available?';
      this.content1 =
        'You can use bank transfers, credit/debit cards, and online wallets.';
      this.header2 = 'How long do transfers take?';
      this.content2 =
        'Transfers are usually processed within a few hours on business days.';

      this.header3 = 'Are there fees for sending money?';
      this.content3 =
        'Yes, fees vary based on the transfer amount and payment method.';

      this.header4 = 'What information do I need to send money?';
      this.content4 =
        'You’ll need the recipient’s bank details and identification.';

      this.header5 = 'Can I cancel a transaction?';
      this.content5 =
        'Cancellations depend on the status of your transfer; contact support for assistance.';
    } else if (this.router.url === '/send-money-to-hong-kong') {
      this.country = 'Hong Kong';
    } else if (this.router.url === '/send-money-to-canada') {
      this.country = 'Canada';
      this.header1 = 'How long does it take to send money to Canada?';
      this.content1 =
        'Transfers typically take 1-2 business days, depending on the recipient’s bank.';
      this.header2 = 'What fees are involved in sending money to Canada?';
      this.content2 =
        'Fees vary depending on the amount and method of transfer. You can check the exact fees before completing your transaction.';

      this.header3 = 'How do I receive money in Canada?';
      this.content3 =
        'Funds can be deposited directly into Canadian bank accounts or picked up in cash, depending on the method selected.';

      this.header4 = 'Is sending money to Canada secure?';
      this.content4 =
        'Yes, SpotOn employs strict security measures, including encryption and compliance with regulations to ensure the safety of your transfers.';

      this.header5 = 'What information is required to send money to Canada?';
      this.content5 =
        'You’ll need the recipient’s full name, bank details, and the transfer amount.';
    } else if (this.router.url === '/send-money-to-kenya') {
      this.country = 'Kenya';
      this.header1 = 'How long does it take to send money to Kenya?';
      this.content1 =
        'Transfers are typically completed within a few hours or by the next business day.';
      this.header2 = 'Are there any fees for sending money to Kenya?';
      this.content2 =
        'Yes, a fee is charged based on the amount and payment method.';

      this.header3 = 'Can I send money to mobile wallets in Kenya?';
      this.content3 =
        ' Yes, you can send money to mobile wallets like Safaricom (M-Pesa)';

      this.header4 = 'Is there a minimum amount I can send?';
      this.content4 = 'Yes, the minimum amount varies by payment method.';

      this.header5 = 'What currencies are supported?';
      this.content5 =
        ' SpotOn allows transfers in local currencies, including the Kenyan Shilling (KES).';
    } else if (this.router.url === '/send-money-to-united-arab-emirates') {
      this.country = 'United Arab Emirates';
    } else if (this.router.url === '/send-money-in-usa') {
      this.country = 'USA';
      this.header1 = 'Can I cancel a transfer?';
      this.content1 =
        'Yes, you can cancel a transfer before it is completed, either online or by contacting customer support.';
      this.header2 = 'How long does it take for the money to arrive?';
      this.content2 =
        'Transfers typically arrive within 1-3 business days, depending on the payment method and receiving bank processing times.';

      this.header3 = 'What payment methods do you accept?';
      this.content3 =
        'We accept bank transfers, credit cards, and debit cards for sending money to the USA.';

      this.header4 = 'Are there any fees for sending money?';
      this.content4 =
        'Yes, fees depend on the transfer amount and payment method. You can view the exact fee before confirming your transaction.';

      this.header5 = 'Is it safe to send money through SpotOn?';
      this.content5 =
        'Absolutely! We use advanced encryption technology to secure your personal and financial information during transactions.';
    } else if (this.router.url === '/send-money-to-nepal') {
      this.country = 'Nepal';
      this.header1 = 'How do I register?';
      this.content1 =
        'To register with us, you need your email and home address, ID and proof of address dated in the last 3 months. To register please click <a href="#" id="signup-link">here.</a>';
      this.header2 = 'Why do I need to upload my ID?';
      this.content2 =
        'Under FCA regulations, we are law bound to comply with AMLregulations where we are required to take your ID details and verifyyou. All data is kept confidential and not shared with any third parties. Please note we will require a clear copy of the ID, and where required we will ask for a verified document.';

      this.header3 = 'I can’t sign in. What should I do?';
      this.content3 =
        ' If you know your email address, then you can reset your password <a href="#" id="reset-password-link">here.</a>';

      this.header4 = 'How do I delete my account?';
      this.content4 =
        ' You cannot delete your account. You can request your account to be deactivated. Under FCA regulations, your account will be deleted after 5 years of inactivity. We will continue to protect the details held under the data protection act.';

      this.header5 =
        'How do I add additional accounts to an existing beneficiary?';
      this.content5 =
        ' You can add additional bank accounts of the beneficiary during a new transfer creation. Select "Create new account" and input the new bank account details.';
    } else if (this.router.url === '/send-money-to-ghana') {
      this.country = 'Ghana';
      this.header1 = 'How quickly can my recipient in Ghana receive the money?';
      this.content1 =
        'Transfers are typically processed within a few hours or by the next business day.';
      this.header2 = 'What payment options are available for my recipient?';
      this.content2 =
        'Recipients can receive funds via bank deposits or cash pickups.';

      this.header3 = 'Are there transfer limits?';
      this.content3 =
        'Limits may apply based on the transfer method and local regulations.';

      this.header4 = 'What are the transfer fees?';
      this.content4 = ' Fees vary depending on the amount and service used.';

      this.header5 = 'Is customer support available if I need help?';
      this.content5 = 'Yes, SpotOn offers customer support for any inquiries.';
    } else if (this.router.url === '/send-money-to-belgium') {
      this.country = 'Belgium';
    } else if (this.router.url === '/send-money-to-estonia') {
      this.country = 'Estonia';
    } else if (this.router.url === '/send-money-to-france') {
      this.country = 'France';
    } else if (this.router.url === '/send-money-to-australia') {
      this.country = 'Australia';
      this.header1 = 'What payment methods are accepted?';
      this.content1 =
        'You can use bank transfers, credit cards, and debit cards to send money to Australia.';
      this.header2 = 'How long does the transfer take?';
      this.content2 =
        'Transfers to Australia are typically completed within a few hours, depending on the payment method used.';

      this.header3 = 'Is there a fee for sending money?';
      this.content3 =
        'Yes, fees may vary based on the amount sent and the chosen payment method.';

      this.header4 = 'What information do I need to send money to Congo DRC?';
      this.content4 =
        'To send money, you will need the recipient’s full name, bank account details (if applicable), and a valid ID for cash pickup options. Ensure that all information is accurate to avoid delays.';

      this.header5 = 'What if I have issues with my transfer?';
      this.content5 =
        'Contact customer support for assistance with any transfer-related issues.';
    } else if (this.router.url === '/send-money-to-bahrain') {
      this.country = 'Bahrain';
    } else if (this.router.url === '/send-money-to-china') {
      this.country = 'China';
      this.header1 = 'How do I register?';
      this.content1 =
        'To register with us, you need your email and home address, ID and proof of address dated in the last 3 months. To register please click <a href="#" id="signup-link">here.</a>';
      this.header2 = 'Why do I need to upload my ID?';
      this.content2 =
        'Under FCA regulations, we are law bound to comply with AMLregulations where we are required to take your ID details and verifyyou. All data is kept confidential and not shared with any third parties. Please note we will require a clear copy of the ID, and where required we will ask for a verified document.';

      this.header3 = 'I can’t sign in. What should I do?';
      this.content3 =
        ' If you know your email address, then you can reset your password <a href="#" id="reset-password-link">here.</a>';

      this.header4 = 'How do I delete my account?';
      this.content4 =
        ' You cannot delete your account. You can request your account to be deactivated. Under FCA regulations, your account will be deleted after 5 years of inactivity. We will continue to protect the details held under the data protection act.';

      this.header5 =
        'How do I add additional accounts to an existing beneficiary?';
      this.content5 =
        ' You can add additional bank accounts of the beneficiary during a new transfer creation. Select "Create new account" and input the new bank account details.';
    } else if (this.router.url === '/send-money-to-croatia') {
      this.country = 'Croatia';
    } else if (this.router.url === '/send-money-to-denmark') {
      this.country = 'Denmark';
    } else if (this.router.url === '/send-money-in-europe') {
      this.country = 'Europe';
      this.header1 = 'What payment methods are accepted?';
      this.content1 =
        'We accept various payment methods, including bank transfers, credit, and debit cards.';
      this.header2 = 'How long does it take for the money to arrive?';
      this.content2 =
        'Transfers typically process within a few hours, depending on the payment method.';

      this.header3 = 'Is there a fee for sending money?';
      this.content3 = 'Yes, fees vary based on the transfer amount and method.';

      this.header4 = 'How can I contact customer support?';
      this.content4 =
        'You can reach customer support via email or phone for any inquiries.';

      this.header5 = 'What information do I need to send money to Congo DRC?';
      this.content5 =
        'To send money, you will need the recipient’s full name, bank account details (if applicable), and a valid ID for cash pickup options. Ensure that all information is accurate to avoid delays.';
    } else if (this.router.url === '/send-money-to-hungary') {
      this.country = 'Hungary';
    } else if (this.router.url === '/send-money-to-indonesia') {
      this.country = 'Indonesia';
      this.header1 = 'What payment methods can I use?';
      this.content1 =
        'Options include bank transfers, credit/debit cards, and online wallets.';
      this.header2 = 'How long does it take for the money to arrive?';
      this.content2 =
        'Transfers typically process within a few hours during business days.';

      this.header3 = 'Are there fees for sending money?';
      this.content3 =
        'Yes, fees may vary based on the amount and method of transfer.';

      this.header4 = 'What details do I need from the recipient?';
      this.content4 =
        'You’ll need their bank account information and identification.';

      this.header5 = 'Can I cancel a transaction?';
      this.content5 =
        'Cancellations depend on the status of your transfer; contact support for assistance.';
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
      this.header1 = 'What payment methods can I use?';
      this.content1 =
        'You can send money using bank transfers, credit cards, or mobile money services.';
      this.header2 = 'How long does it take for the money to arrive?';
      this.content2 =
        'Transfers to Uganda are typically completed within a few hours, depending on the method used.';

      this.header3 = 'Are there fees for sending money?';
      this.content3 =
        'Yes, fees may vary based on the transfer amount and payment method selected.';

      this.header4 = 'What information do I need to send money to Congo DRC?';
      this.content4 =
        'To send money, you will need the recipient’s full name, bank account details (if applicable), and a valid ID for cash pickup options. Ensure that all information is accurate to avoid delays.';

      this.header5 =
        'What documents do I need to provide while collecting the money at the remittence outlets ?';
      this.content5 =
        'Typically, you need to provide identification and details of the recipient.';
    } else if (this.router.url === '/send-money-to-afghanistan') {
      this.country = 'Afghanistan';
    } else if (this.router.url === '/send--to-CFAfranc') {
      this.country = 'CFA franc';
      this.header1 = 'What payment methods are accepted?';
      this.content1 =
        'You can use bank transfers, credit/debit cards, and mobile wallets.';
      this.header2 = 'How long does it take for the money to arrive?';
      this.content2 =
        'Transfers typically arrive within a few hours on business days.';

      this.header3 = 'Are there fees involved?';
      this.content3 =
        'Yes, fees vary based on the amount sent and the payment method.';

      this.header4 = 'What information is needed for the transfer?';
      this.content4 = 'You’ll need identification and the recipient’s details.';

      this.header5 = 'Can I cancel a transaction?';
      this.content5 =
        'Cancellations depend on the status of your transfer; contact support for assistance.';
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
    } else if (this.router.url === '/send-money-to-vietnam') {
      this.country = 'Vietnam';
      this.header1 = 'What payment methods are available?';
      this.content1 =
        'You can use bank transfers, credit/debit cards, and mobile wallets.';
      this.header2 = 'How long does a transfer take?';
      this.content2 =
        'Transfers typically arrive within a few hours on business days.';

      this.header3 = 'Are there fees for sending money?';
      this.content3 =
        'Yes, fees vary depending on the amount sent and the payment method.';

      this.header4 = 'What information do I need to send money?';
      this.content4 =
        'You’ll need identification and the recipient’s bank details.';

      this.header5 = 'Can I cancel a transaction?';
      this.content5 =
        'Cancellations depend on the status of your transfer; contact support for assistance.';
    } else if (this.router.url === '/send-money-to-pakistan') {
      this.country = 'Pakistan';
      this.header1 = 'What payment methods are accepted?';
      this.content1 =
        'You can use bank transfers, credit/debit cards, or mobile wallets.';
      this.header2 = 'How long does it take for the money to arrive?';
      this.content2 =
        'Transfers are usually completed within a few hours on business days.';

      this.header3 = 'Are there fees involved?';
      this.content3 =
        'Yes, fees may vary depending on the amount and method of transfer.';

      this.header4 = 'What information do I need to provide?';
      this.content4 =
        'You will need to provide identification and details of the recipient.';

      this.header5 = 'Can I cancel a transaction?';
      this.content5 =
        'Cancellations depend on the status of your transfer; contact support for assistance.';
    } else if (this.router.url === '/send-money-to-ethiopia') {
      this.country = 'Ethiopia';
    } else if (this.router.url === '/send-money-to-russia') {
      this.country = 'Russia';
    } else if (this.router.url === '/send-money-to-rwanda') {
      this.country = 'Rwanda';
    } else if (this.router.url === '/send-money-to-tanzania') {
      this.country = 'Tanzania';
    } else if (this.router.url === '/') {
      this.header1 = 'How do I register?';
      this.content1 =
        'To register with us, you need your email and home address, ID and proof of address dated in the last 3 months. To register please click <a href="#" id="signup-link">here.</a>';
      this.header2 = 'Why do I need to upload my ID?';
      this.content2 =
        'Under FCA regulations, we are law bound to comply with AMLregulations where we are required to take your ID details and verifyyou. All data is kept confidential and not shared with any third parties. Please note we will require a clear copy of the ID, and where required we will ask for a verified document.';

      this.header3 = 'I can’t sign in. What should I do?';
      this.content3 =
        ' If you know your email address, then you can reset your password <a href="#" id="reset-password-link">here.</a>';

      this.header4 = 'How do I delete my account?';
      this.content4 =
        ' You cannot delete your account. You can request your account to be deactivated. Under FCA regulations, your account will be deleted after 5 years of inactivity. We will continue to protect the details held under the data protection act.';

      this.header5 =
        'How do I add additional accounts to an existing beneficiary?';
      this.content5 =
        ' You can add additional bank accounts of the beneficiary during a new transfer creation. Select "Create new account" and input the new bank account details.';
    }
  }

  ngAfterViewInit() {
    // Manually add the click event listener to the signup link
    const signupLink = this.el.nativeElement.querySelector('#signup-link');
    if (signupLink) {
      this.renderer.listen(signupLink, 'click', (event) => {
        event.preventDefault();
        this.openSignup();
      });
    }

    // Manually add the click event listener to the reset password link
    const resetPasswordLink = this.el.nativeElement.querySelector(
      '#reset-password-link'
    );
    if (resetPasswordLink) {
      this.renderer.listen(resetPasswordLink, 'click', (event) => {
        event.preventDefault();
        this.openResetPassword();
      });
    }
  }
}
