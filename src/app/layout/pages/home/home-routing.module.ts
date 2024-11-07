import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsPageComponent } from './about-us-page/about-us-page.component';
import { BlogDetailViewPageComponent } from './blog-pages/blog-detail-view-page/blog-detail-view-page.component';
import { BlogListPageComponent } from './blog-pages/blog-list-page/blog-list-page.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { ContactUsHomePageComponent } from './contact-us-home-page/contact-us-home-page.component';
import { DisclaimerPageComponent } from './disclaimer-page/disclaimer-page.component';
import { HowItWorksPageComponent } from './how-it-works-page/how-it-works-page.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { HomeBannerComponent } from './home-banner/home-banner.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from 'src/app/_guard/auth.guard';
import { HomeRouteComponent } from './home-route/home-route.component';
import { SectionComponent } from './sections/section/section.component';
import { HomeSectionComponent } from './sections/home-section/home-section.component';
import { ImageToTextComponent } from './image-to-text/image-to-text.component';

const routes: Routes = [
  {
    path: '',
    component: HomeRouteComponent,
    data: {
      title: 'Artificial Enteligence | Easy Working Online |GP AI',
      // tslint:disable-next-line: max-line-length
      description:
        'GP AI-driven solutions bring precision, efficiency, and insights to enhance your experience ,Harness the power of Artificial Intelligence for smarter, faster decisions. ',
      // ogUrl: 'your og url'
    },
    children: [
      {
        path: '',
        component: HomeSectionComponent,
      },

      {
        path: 'send-money-in-europe',
        component: SectionComponent,
        data: {
          title: 'Send Money to Europe | Online Money Transfer | SpotOn Money',
          // tslint:disable-next-line: max-line-length
          description:
            'Send Online Money Transfer to Europe Securely and Easily Through Spoton Money. Send Money Online Anytime to Your Friends & Family in Sri Lanka With Best Exchange Rates.',
          // ogUrl: 'your og url'
        },
      },
      {
        path: 'send-money-to-sri-lanka',
        component: SectionComponent,
        data: {
          title:
            'Send Money to Sri Lanka | Online Money Transfer | SpotOn Money',
          // tslint:disable-next-line: max-line-length
          description:
            'Send Online Money Transfer to Sri Lanka Securely and Easily Through Spoton Money. Send Money Online Anytime to Your Friends & Family in Sri Lanka With Best Exchange Rates.',
          // ogUrl: 'your og url'
        },
      },
      {
        path: 'send-money-to-bangladesh',
        component: SectionComponent,
        data: {
          title:
            'Send Money to Bangladesh | Online Money Transfer | SpotOn Money',
          // tslint:disable-next-line: max-line-length
          description:
            'Send Online Money Transfer to Bangladesh Securely and Easily Through Spoton Money. Send Money Online Anytime to Your Friends & Family in Bangladesh With Best Exchange Rates.',
          // ogUrl: 'your og url'
        },
      },
      {
        path: 'send-money-to-philippines',
        component: SectionComponent,
        data: {
          title:
            'Send Money to Philippines | Online Money Transfer | SpotOn Money',
          // tslint:disable-next-line: max-line-length
          description:
            'Send Online Money Transfer to Philippines Securely and Easily Through Spoton Money. Send Money Online Anytime to Your Friends & Family in Philippines With Best Exchange Rates.',
          // ogUrl: 'your og url'
        },
      },
      {
        path: 'send-money-to-congo-drc',
        component: SectionComponent,
        data: {
          title:
            'Send Money to Congo DRC | Online Money Transfer | SpotOn Money',
          // tslint:disable-next-line: max-line-length
          description:
            'Send Online Money Transfer to Congo DRC Securely and Easily Through Spoton Money. Send Money Online Anytime to Your Friends & Family in Congo DRC With Best Exchange Rates.',
          // ogUrl: 'your og url'
        },
      },
      {
        path: 'send-money-to-nigeria',
        component: SectionComponent,
        data: {
          title: 'Send Money to Nigeria | Online Money Transfer | SpotOn Money',
          // tslint:disable-next-line: max-line-length
          description:
            'Send Online Money Transfer to Nigeria Securely and Easily Through Spoton Money. Send Money Online Anytime to Your Friends & Family in Nigeria With Best Exchange Rates.',
          // ogUrl: 'your og url'
        },
      },
      {
        path: 'send-money-to-india',
        component: SectionComponent,
        data: {
          title: 'Send Money to India | Online Money Transfer | SpotOn Money',
          // tslint:disable-next-line: max-line-length
          description:
            'Send Online Money Transfer to India Securely and Easily Through Spoton Money. Send Money Online Anytime to Your Friends & Family in India With Best Exchange Rates.',
          // ogUrl: 'your og url'
        },
      },
      {
        path: 'send-money-to-thailand',
        component: SectionComponent,
        data: {
          title:
            'Send Money to Thailand | Online Money Transfer | SpotOn Money',
          // tslint:disable-next-line: max-line-length
          description:
            'Send Online Money Transfer to Thailand Securely and Easily Through Spoton Money. Send Money Online Anytime to Your Friends & Family in Thailand With Best Exchange Rates.',
          // ogUrl: 'your og url'
        },
      },
      {
        path: 'send-money-to-malaysia',
        component: SectionComponent,
        data: {
          title:
            'Send Money to Malaysia | Online Money Transfer | SpotOn Money',
          // tslint:disable-next-line: max-line-length
          description:
            'Send Online Money Transfer to Malaysia Securely and Easily Through Spoton Money. Send Money Online Anytime to Your Friends & Family in Malaysia With Best Exchange Rates.',
          // ogUrl: 'your og url'
        },
      },
      {
        path: 'send-money-to-hong-kong',
        component: SectionComponent,
        data: {
          title:
            'Send Money to Hong Kong | Online Money Transfer | SpotOn Money',
          // tslint:disable-next-line: max-line-length
          description:
            'Send Online Money Transfer to Hong Kong Securely and Easily Through Spoton Money. Send Money Online Anytime to Your Friends & Family in Hong Kong With Best Exchange Rates.',
          // ogUrl: 'your og url'
        },
      },
      {
        path: 'send-money-to-canada',
        component: SectionComponent,
        data: {
          title: 'Send Money to Canada | Online Money Transfer | SpotOn Money',
          // tslint:disable-next-line: max-line-length
          description:
            'Send Online Money Transfer to Canada Securely and Easily Through Spoton Money. Send Money Online Anytime to Your Friends & Family in Canada With Best Exchange Rates.',
          // ogUrl: 'your og url'
        },
      },
      {
        path: 'send-money-to-kenya',
        component: SectionComponent,
        data: {
          title: 'Send Money to Kenya | Online Money Transfer | SpotOn Money',
          // tslint:disable-next-line: max-line-length
          description:
            'Send Online Money Transfer to Kenya Securely and Easily Through Spoton Money. Send Money Online Anytime to Your Friends & Family in Kenya With Best Exchange Rates.',
          // ogUrl: 'your og url'
        },
      },
      {
        path: 'send-money-to-united-arab-emirates',
        component: SectionComponent,
        data: {
          title:
            'Send Money to United Arab Emirates | Online Money Transfer | SpotOn Money',
          // tslint:disable-next-line: max-line-length
          description:
            'Send Online Money Transfer to United Arab Emirates Securely and Easily Through Spoton Money. Send Money Online Anytime to Your Friends & Family in United Arab Emirates With Best Exchange Rates.',
          // ogUrl: 'your og url'
        },
      },
      {
        path: 'send-money-in-usa',
        component: SectionComponent,
        data: {
          title: 'Send Money in USD | Online Money Transfer | SpotOn Money',
          // tslint:disable-next-line: max-line-length
          description:
            'Send Online Money Transfer to USA Securely and Easily Through Spoton Money. Send Money Online Anytime to Your Friends & Family in USA With Best Exchange Rates.',
          // ogUrl: 'your og url'
        },
      },
      {
        path: 'send-money-to-nepal',
        component: SectionComponent,
        data: {
          title: 'Send Money to Nepal | Online Money Transfer | SpotOn Money',
          // tslint:disable-next-line: max-line-length
          description:
            'Send Online Money Transfer to Nepal Securely and Easily Through Spoton Money. Send Money Online Anytime to Your Friends & Family in Nepal With Best Exchange Rates.',
          // ogUrl: 'your og url'
        },
      },
      {
        path: 'send-money-to-ghana',
        component: SectionComponent,
        data: {
          title: 'Send Money to Ghana | Online Money Transfer | SpotOn Money',
          // tslint:disable-next-line: max-line-length
          description:
            'Send Online Money Transfer to Ghana Securely and Easily Through Spoton Money. Send Money Online Anytime to Your Friends & Family in Ghana With Best Exchange Rates.',
          // ogUrl: 'your og url'
        },
      },
      {
        path: 'send-money-to-belgium',
        component: SectionComponent,
        data: {
          title: 'Send Money to Belgium | Online Money Transfer | SpotOn Money',
          // tslint:disable-next-line: max-line-length
          description:
            'Send Online Money Transfer to Belgium Securely and Easily Through Spoton Money. Send Money Online Anytime to Your Friends & Family in Belgium With Best Exchange Rates.',
          // ogUrl: 'your og url'
        },
      },
      {
        path: 'send-money-to-estonia',
        component: SectionComponent,
        data: {
          title: 'Send Money to Estonia | Online Money Transfer | SpotOn Money',
          // tslint:disable-next-line: max-line-length
          description:
            'Send Online Money Transfer to Estonia Securely and Easily Through Spoton Money. Send Money Online Anytime to Your Friends & Family in Estonia With Best Exchange Rates.',
          // ogUrl: 'your og url'
        },
      },
      {
        path: 'send-money-to-france',
        component: SectionComponent,
        data: {
          title: 'Send Money to France | Online Money Transfer | SpotOn Money',
          // tslint:disable-next-line: max-line-length
          description:
            'Send Online Money Transfer to France Securely and Easily Through Spoton Money. Send Money Online Anytime to Your Friends & Family in France With Best Exchange Rates.',
          // ogUrl: 'your og url'
        },
      },
      {
        path: 'send-money-to-australia',
        component: SectionComponent,
        data: {
          title:
            'Send Money to Australia | Online Money Transfer | SpotOn Money',
          // tslint:disable-next-line: max-line-length
          description:
            'Send Online Money Transfer to Australia Securely and Easily Through Spoton Money. Send Money Online Anytime to Your Friends & Family in Australia With Best Exchange Rates.',
          // ogUrl: 'your og url'
        },
      },
      {
        path: 'send-money-to-bahrain',
        component: SectionComponent,
        data: {
          title: 'Send Money to Bahrain | Online Money Transfer | SpotOn Money',
          // tslint:disable-next-line: max-line-length
          description:
            'Send Online Money Transfer to Bahrain Securely and Easily Through Spoton Money. Send Money Online Anytime to Your Friends & Family in Bahrain With Best Exchange Rates.',
          // ogUrl: 'your og url'
        },
      },
      {
        path: 'send-money-to-china',
        component: SectionComponent,
        data: {
          title: 'Send Money to China | Online Money Transfer | SpotOn Money',
          // tslint:disable-next-line: max-line-length
          description:
            'Send Online Money Transfer to China Securely and Easily Through Spoton Money. Send Money Online Anytime to Your Friends & Family in China With Best Exchange Rates.',
          // ogUrl: 'your og url'
        },
      },
      {
        path: 'send-money-to-croatia',
        component: SectionComponent,
        data: {
          title: 'Send Money to Croatia | Online Money Transfer | SpotOn Money',
          // tslint:disable-next-line: max-line-length
          description:
            'Send Online Money Transfer to Croatia Securely and Easily Through Spoton Money. Send Money Online Anytime to Your Friends & Family in Croatia With Best Exchange Rates.',
          // ogUrl: 'your og url'
        },
      },
      {
        path: 'send-money-to-denmark',
        component: SectionComponent,
        data: {
          title: 'Send Money to Denmark | Online Money Transfer | SpotOn Money',
          // tslint:disable-next-line: max-line-length
          description:
            'Send Online Money Transfer to Denmark Securely and Easily Through Spoton Money. Send Money Online Anytime to Your Friends & Family in Denmark With Best Exchange Rates.',
          // ogUrl: 'your og url'
        },
      },
      {
        path: 'send-money-to-hungary',
        component: SectionComponent,
        data: {
          title: 'Send Money to Hungary | Online Money Transfer | SpotOn Money',
          // tslint:disable-next-line: max-line-length
          description:
            'Send Online Money Transfer to Hungary Securely and Easily Through Spoton Money. Send Money Online Anytime to Your Friends & Family in Hungary With Best Exchange Rates.',
          // ogUrl: 'your og url'
        },
      },
      {
        path: 'send-money-to-indonesia',
        component: SectionComponent,
        data: {
          title:
            'Send Money to Indonesia | Online Money Transfer | SpotOn Money',
          // tslint:disable-next-line: max-line-length
          description:
            'Send Online Money Transfer to Indonesia Securely and Easily Through Spoton Money. Send Money Online Anytime to Your Friends & Family in Indonesia With Best Exchange Rates.',
          // ogUrl: 'your og url'
        },
      },
      {
        path: 'send-money-to-israel',
        component: SectionComponent,
        data: {
          title: 'Send Money to Israel | Online Money Transfer | SpotOn Money',
          // tslint:disable-next-line: max-line-length
          description:
            'Send Online Money Transfer to Israel Securely and Easily Through Spoton Money. Send Money Online Anytime to Your Friends & Family in Israel With Best Exchange Rates.',
          // ogUrl: 'your og url'
        },
      },
      {
        path: 'send-money-to-japan',
        component: SectionComponent,
        data: {
          title: 'Send Money to Japan | Online Money Transfer | SpotOn Money',
          // tslint:disable-next-line: max-line-length
          description:
            'Send Online Money Transfer to Japan Securely and Easily Through Spoton Money. Send Money Online Anytime to Your Friends & Family in Japan With Best Exchange Rates.',
          // ogUrl: 'your og url'
        },
      },
      {
        path: 'send-money-to-kuwait',
        component: SectionComponent,
        data: {
          title: 'Send Money to Kuwait | Online Money Transfer | SpotOn Money',
          // tslint:disable-next-line: max-line-length
          description:
            'Send Online Money Transfer to Kuwait Securely and Easily Through Spoton Money. Send Money Online Anytime to Your Friends & Family in Kuwait With Best Exchange Rates.',
          // ogUrl: 'your og url'
        },
      },
      {
        path: 'send-money-to-mexico',
        component: SectionComponent,
        data: {
          title: 'Send Money to Mexico | Online Money Transfer | SpotOn Money',
          // tslint:disable-next-line: max-line-length
          description:
            'Send Online Money Transfer to Mexico Securely and Easily Through Spoton Money. Send Money Online Anytime to Your Friends & Family in Mexico With Best Exchange Rates.',
          // ogUrl: 'your og url'
        },
      },
      {
        path: 'send-money-to-new-zealand',
        component: SectionComponent,
        data: {
          title:
            'Send Money to New Zealand | Online Money Transfer | SpotOn Money',
          // tslint:disable-next-line: max-line-length
          description:
            'Send Online Money Transfer to New Zealand Securely and Easily Through Spoton Money. Send Money Online Anytime to Your Friends & Family in New Zealand With Best Exchange Rates.',
          // ogUrl: 'your og url'
        },
      },
      {
        path: 'send-money-to-norway',
        component: SectionComponent,
        data: {
          title: 'Send Money to norway | Online Money Transfer | SpotOn Money',
          // tslint:disable-next-line: max-line-length
          description:
            'Send Online Money Transfer to norway Securely and Easily Through Spoton Money. Send Money Online Anytime to Your Friends & Family in norway With Best Exchange Rates.',
          // ogUrl: 'your og url'
        },
      },
      {
        path: 'send-money-to-oman',
        component: SectionComponent,
        data: {
          title: 'Send Money to Oman | Online Money Transfer | SpotOn Money',
          // tslint:disable-next-line: max-line-length
          description:
            'Send Online Money Transfer to Oman Securely and Easily Through Spoton Money. Send Money Online Anytime to Your Friends & Family in Oman With Best Exchange Rates.',
          // ogUrl: 'your og url'
        },
      },
      {
        path: 'send-money-to-poland',
        component: SectionComponent,
        data: {
          title: 'Send Money to Poland | Online Money Transfer | SpotOn Money',
          // tslint:disable-next-line: max-line-length
          description:
            'Send Online Money Transfer to Poland Securely and Easily Through Spoton Money. Send Money Online Anytime to Your Friends & Family in Poland With Best Exchange Rates.',
          // ogUrl: 'your og url'
        },
      },
      {
        path: 'send-money-to-qatar',
        component: SectionComponent,
        data: {
          title: 'Send Money to Qatar | Online Money Transfer | SpotOn Money',
          // tslint:disable-next-line: max-line-length
          description:
            'Send Online Money Transfer to Qatar Securely and Easily Through Spoton Money. Send Money Online Anytime to Your Friends & Family in Qatar With Best Exchange Rates.',
          // ogUrl: 'your og url'
        },
      },
      {
        path: 'send-money-to-saudi-arabia',
        component: SectionComponent,
        data: {
          title:
            'Send Money to Saudi Arabia | Online Money Transfer | SpotOn Money',
          // tslint:disable-next-line: max-line-length
          description:
            'Send Online Money Transfer to Saudi Arabia Securely and Easily Through Spoton Money. Send Money Online Anytime to Your Friends & Family in Saudi Arabia With Best Exchange Rates.',
          // ogUrl: 'your og url'
        },
      },
      {
        path: 'send-money-to-singapore',
        component: SectionComponent,
        data: {
          title:
            'Send Money to Singapore | Online Money Transfer | SpotOn Money',
          // tslint:disable-next-line: max-line-length
          description:
            'Send Online Money Transfer to Singapore Securely and Easily Through Spoton Money. Send Money Online Anytime to Your Friends & Family in Singapore With Best Exchange Rates.',
          // ogUrl: 'your og url'
        },
      },
      {
        path: 'send-money-to-south-africa',
        component: SectionComponent,
        data: {
          title:
            'Send Money to South Africa | Online Money Transfer | SpotOn Money',
          // tslint:disable-next-line: max-line-length
          description:
            'Send Online Money Transfer to South Africa Securely and Easily Through Spoton Money. Send Money Online Anytime to Your Friends & Family in South Africa With Best Exchange Rates.',
          // ogUrl: 'your og url'
        },
      },
      {
        path: 'send-money-to-sweden',
        component: SectionComponent,
        data: {
          title: 'Send Money to Sweden | Online Money Transfer | SpotOn Money',
          // tslint:disable-next-line: max-line-length
          description:
            'Send Online Money Transfer to Sweden Securely and Easily Through Spoton Money. Send Money Online Anytime to Your Friends & Family in Sweden With Best Exchange Rates.',
          // ogUrl: 'your og url'
        },
      },
      {
        path: 'send-money-to-switzerland',
        component: SectionComponent,
        data: {
          title:
            'Send Money to Switzerland | Online Money Transfer | SpotOn Money',
          // tslint:disable-next-line: max-line-length
          description:
            'Send Online Money Transfer to Switzerland Securely and Easily Through Spoton Money. Send Money Online Anytime to Your Friends & Family in Switzerland With Best Exchange Rates.',
          // ogUrl: 'your og url'
        },
      },
      {
        path: 'send-money-to-turkey',
        component: SectionComponent,
        data: {
          title: 'Send Money to Turkey | Online Money Transfer | SpotOn Money',
          // tslint:disable-next-line: max-line-length
          description:
            'Send Online Money Transfer to Turkey Securely and Easily Through Spoton Money. Send Money Online Anytime to Your Friends & Family in Turkey With Best Exchange Rates.',
          // ogUrl: 'your og url'
        },
      },
      {
        path: 'send-money-to-uganda',
        component: SectionComponent,
        data: {
          title: 'Send Money to Uganda | Online Money Transfer | SpotOn Money',
          // tslint:disable-next-line: max-line-length
          description:
            'Send Online Money Transfer to Uganda Securely and Easily Through Spoton Money. Send Money Online Anytime to Your Friends & Family in Uganda With Best Exchange Rates.',
          // ogUrl: 'your og url'
        },
      },
      {
        path: 'send-money-to-afghanistan',
        component: SectionComponent,
        data: {
          title:
            'Send Money to Afghanistan | Online Money Transfer | SpotOn Money',
          // tslint:disable-next-line: max-line-length
          description:
            'Send Online Money Transfer to Afghanistan Securely and Easily Through Spoton Money. Send Money Online Anytime to Your Friends & Family in Afghanistan With Best Exchange Rates.',
          // ogUrl: 'your og url'
        },
      },
      {
        path: 'send--to-CFAfranc',
        component: SectionComponent,
        data: {
          title: 'Send Money to Benin | Online Money Transfer | SpotOn Money',
          // tslint:disable-next-line: max-line-length
          description:
            'Send Online Money Transfer to Benin Securely and Easily Through Spoton Money. Send Money Online Anytime to Your Friends & Family in Benin With Best Exchange Rates.',
          // ogUrl: 'your og url'
        },
      },
      {
        path: 'send-money-to-botswana',
        component: SectionComponent,
        data: {
          title:
            'Send Money to Botswana | Online Money Transfer | SpotOn Money',
          // tslint:disable-next-line: max-line-length
          description:
            'Send Online Money Transfer to Botswana Securely and Easily Through Spoton Money. Send Money Online Anytime to Your Friends & Family in Botswana With Best Exchange Rates.',
          // ogUrl: 'your og url'
        },
      },
      {
        path: 'send-money-to-burkina-faso',
        component: SectionComponent,
        data: {
          title:
            'Send Money to Burkina Faso | Online Money Transfer | SpotOn Money',
          // tslint:disable-next-line: max-line-length
          description:
            'Send Online Money Transfer to Burkina Faso Securely and Easily Through Spoton Money. Send Money Online Anytime to Your Friends & Family in Burkina Faso With Best Exchange Rates.',
          // ogUrl: 'your og url'
        },
      },
      {
        path: 'send-money-to-burundi',
        component: SectionComponent,
        data: {
          title: 'Send Money to Burundi | Online Money Transfer | SpotOn Money',
          // tslint:disable-next-line: max-line-length
          description:
            'Send Online Money Transfer to Burundi Securely and Easily Through Spoton Money. Send Money Online Anytime to Your Friends & Family in Burundi With Best Exchange Rates.',
          // ogUrl: 'your og url'
        },
      },
      {
        path: 'send-money-to-cambodia',
        component: SectionComponent,
        data: {
          title:
            'Send Money to Cambodia | Online Money Transfer | SpotOn Money',
          // tslint:disable-next-line: max-line-length
          description:
            'Send Online Money Transfer to Cambodia Securely and Easily Through Spoton Money. Send Money Online Anytime to Your Friends & Family in Cambodia With Best Exchange Rates.',
          // ogUrl: 'your og url'
        },
      },
      {
        path: 'send-money-to-phillipines',
        component: SectionComponent,
        data: {
          title:
            'Send Money to Phillipines | Online Money Transfer | SpotOn Money',
          // tslint:disable-next-line: max-line-length
          description:
            'Send Online Money Transfer to Phillipines Securely and Easily Through Spoton Money. Send Money Online Anytime to Your Friends & Family in Phillipines With Best Exchange Rates.',
          // ogUrl: 'your og url'
        },
      },
      {
        path: 'send-money-to-vietnam',
        component: SectionComponent,
        data: {
          title: 'Send Money to Vietnam | Online Money Transfer | SpotOn Money',
          // tslint:disable-next-line: max-line-length
          description:
            'Send Online Money Transfer to Vietnam Securely and Easily Through Spoton Money. Send Money Online Anytime to Your Friends & Family in Vietnam With Best Exchange Rates.',
          // ogUrl: 'your og url'
        },
      },
      {
        path: 'send-money-to-pakistan',
        component: SectionComponent,
        data: {
          title:
            'Send Money to Pakistan | Online Money Transfer | SpotOn Money',
          // tslint:disable-next-line: max-line-length
          description:
            'Send Online Money Transfer to Pakistan Securely and Easily Through Spoton Money. Send Money Online Anytime to Your Friends & Family in Pakistan With Best Exchange Rates.',
          // ogUrl: 'your og url'
        },
      },
      {
        path: 'send-money-to-ethiopia',
        component: SectionComponent,
        data: {
          title:
            'Send Money to Ethiopia | Online Money Transfer | SpotOn Money',
          // tslint:disable-next-line: max-line-length
          description:
            'Send Online Money Transfer to Ethiopia Securely and Easily Through Spoton Money. Send Money Online Anytime to Your Friends & Family in Ethiopia With Best Exchange Rates.',
          // ogUrl: 'your og url'
        },
      },
      {
        path: 'send-money-to-russia',
        component: SectionComponent,
        data: {
          title: 'Send Money to Russia | Online Money Transfer | SpotOn Money',
          // tslint:disable-next-line: max-line-length
          description:
            'Send Online Money Transfer to Russia Securely and Easily Through Spoton Money. Send Money Online Anytime to Your Friends & Family in Russia With Best Exchange Rates.',
          // ogUrl: 'your og url'
        },
      },
      {
        path: 'send-money-to-rwanda',
        component: SectionComponent,
        data: {
          title: 'Send Money to Rwanda | Online Money Transfer | SpotOn Money',
          // tslint:disable-next-line: max-line-length
          description:
            'Send Online Money Transfer to Rwanda Securely and Easily Through Spoton Money. Send Money Online Anytime to Your Friends & Family in Rwanda With Best Exchange Rates.',
          // ogUrl: 'your og url'
        },
      },
      {
        path: 'send-money-to-tanzania',
        component: SectionComponent,
        data: {
          title:
            'Send Money to Tanzania | Online Money Transfer | SpotOn Money',
          // tslint:disable-next-line: max-line-length
          description:
            'Send Online Money Transfer to Tanzania Securely and Easily Through Spoton Money. Send Money Online Anytime to Your Friends & Family in Tanzania With Best Exchange Rates.',
          // ogUrl: 'your og url'
        },
      },
    ],
  },
  {
    path: 'how-it-works',
    component: HowItWorksPageComponent,
    data: {
      title: 'How it works| The Best Way to Transfer Money | SpotOn Money',
      description:
        'Find out how SpotOn Money makes international money transfers easy and secure. Learn about our process, guaranteed exchange rates, and how to send money online.',
      // ogUrl: 'your og url'
    },
  },

  {
    path: 'about-us',
    component: AboutUsPageComponent,
    data: {
      title: 'About Us |Quick and Easy Money Transfer| SpotOn Money',
      description:
        'SpotOn Money provides a secure online Easy Money Transfer service to Transfer Money with a guaranteed global exchange rate.',
      // ogUrl: 'your og url'
    },
  },
  {
    path: 'image-to-text',
    component: ImageToTextComponent,
    data: {
      title: 'Image to Text |Quick and Easy Convert Image to Text| GP AI',
      description:
        'GP AI provides a fast image to text service to convert image to text. It is Easy and vary secure images to text.',
      // ogUrl: 'your og url'
    },
  },
  {
    path: 'disclaimer',
    component: DisclaimerPageComponent,
    data: {
      title: 'Disclaimer | SpotOn Money',
      // tslint:disable-next-line: max-line-length
      description:
        'Take a look at our Disclaimer page. SpotOn Money provides secure online money transfer service to Sri Lanka with guranteed exchange rates.',
      // ogUrl: 'your og url'
    },
  },
  {
    path: 'terms-conditions',
    component: TermsAndConditionsComponent,
    data: {
      title: 'Terms & Conditions | SpotOn Money',
      description:
        'Please read the following terms and conditions relating to your use of this website carefully.',
      // ogUrl: 'your og url'
    },
  },
  {
    path: 'contact',
    component: ContactPageComponent,
    data: {
      title: 'Contact | Transfer currency worldwide | SpotOn Money ',
      // tslint:disable-next-line: max-line-length
      description:
        'Get in touch with SpotOn Money for secure and easy international money transfers. Contact us for assistance, support, or inquiries about our services.',
      // ogUrl: 'your og url'
    },
  },
  {
    path: 'contact-us-home-page',
    component: ContactUsHomePageComponent,
  },
  {
    path: 'blog',
    component: BlogListPageComponent,
    data: {
      title: 'Blog | Global exchange rate for money transfer | SpotOn Money',
      description:
        'Stay updated with SpotOn Money’s blog. Explore articles on international money transfers, financial tips, exchange rates, and more. ',
      // ogUrl: 'your og url'
    },
  },
  {
    path: 'blog/:id',
    component: BlogDetailViewPageComponent,
    data: {
      title: 'Blog | SpotOn Money',
      // description: 'description',
      // ogUrl: 'your og url'
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
