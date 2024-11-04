import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { AboutUsPageComponent } from './about-us-page/about-us-page.component';
import { BlogDetailViewPageComponent } from './blog-pages/blog-detail-view-page/blog-detail-view-page.component';
import { BlogListPageComponent } from './blog-pages/blog-list-page/blog-list-page.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { ContactUsHomePageComponent } from './contact-us-home-page/contact-us-home-page.component';
import { DisclaimerPageComponent } from './disclaimer-page/disclaimer-page.component';
import { HowItWorksPageComponent } from './how-it-works-page/how-it-works-page.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { SharedModule } from 'src/app/_shared/shared/shared.module';
import { AppDownloadSecComponent } from './sections/app-download-sec/app-download-sec.component';
import { DescriptionEuSecComponent } from './sections/description-eu-sec/description-eu-sec.component';
import { FeaturesEuSecComponent } from './sections/features-eu-sec/features-eu-sec.component';
import { HowWorksSecComponent } from './sections/how-works-sec/how-works-sec.component';
import { QuestionsSecComponent } from './sections/questions-sec/questions-sec.component';
import { HomeBannerComponent } from './home-banner/home-banner.component';
import { FeaturesSlSecComponent } from './sections/features-sl-sec/features-sl-sec.component';
import { DescriptionSlSecComponent } from './sections/description-sl-sec/description-sl-sec.component';
import { ConvenienceSlSecComponent } from './sections/convenience-sl-sec/convenience-sl-sec.component';
import { HeaderComponent } from '../dashboard/header/header.component';
import { FooterComponent } from '../dashboard/footer/footer.component';
import { HomeRouteComponent } from './home-route/home-route.component';
import { SectionComponent } from './sections/section/section.component';
import { HomeSectionComponent } from './sections/home-section/home-section.component';

@NgModule({
  declarations: [
    AboutUsPageComponent,
    BlogDetailViewPageComponent,
    BlogListPageComponent,
    ContactPageComponent,
    ContactUsHomePageComponent,
    DisclaimerPageComponent,
    HowItWorksPageComponent,
    TermsAndConditionsComponent,
    AppDownloadSecComponent,
    DescriptionEuSecComponent,
    FeaturesEuSecComponent,
    HowWorksSecComponent,
    QuestionsSecComponent,
    HomeBannerComponent,
    FeaturesSlSecComponent,
    DescriptionSlSecComponent,
    ConvenienceSlSecComponent,
    HomeRouteComponent,
    SectionComponent,
    HomeSectionComponent,
  ],
  imports: [CommonModule, SharedModule, HomeRoutingModule],
})
export class HomeModule {}
