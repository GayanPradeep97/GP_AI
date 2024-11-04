import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './layout/pages/dashboard/dashboard/dashboard.component';
import { HomeComponent } from './layout/pages/home/home/home.component';
import { SettingComponent } from './layout/components/setting/setting/setting.component';
import { AuthGuard } from './_guard/auth.guard';
import { MyTransactionComponent } from './layout/components/my-transaction/my-transaction/my-transaction.component';
import { BeneficiariesComponent } from './layout/components/my-beneficiaries/beneficiaries/beneficiaries.component';
import { BlogDetailViewPageComponent } from './layout/pages/home/blog-pages/blog-detail-view-page/blog-detail-view-page.component';
import { BlogListPageComponent } from './layout/pages/home/blog-pages/blog-list-page/blog-list-page.component';
import { AboutUsPageComponent } from './layout/pages/home/about-us-page/about-us-page.component';
import { ContactPageComponent } from './layout/pages/home/contact-page/contact-page.component';
import { HowItWorksPageComponent } from './layout/pages/home/how-it-works-page/how-it-works-page.component';
import { TransferFlowComponent } from './layout/components/transfer-flow/transfer-flow.component';
import { DisclaimerPageComponent } from './layout/pages/home/disclaimer-page/disclaimer-page.component';
import { TermsAndConditionsComponent } from './layout/pages/home/terms-and-conditions/terms-and-conditions.component';

import { ContactUsHomePageComponent } from './layout/pages/home/contact-us-home-page/contact-us-home-page.component';
import { HomeBannerComponent } from './layout/pages/home/home-banner/home-banner.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'transactions',
      },
      {
        path: 'transactions',
        loadChildren: () =>
          import('./layout/components/my-transaction/transaction.module').then(
            (m) => m.TransactionModule
          ),
        // component: MyTransactionComponent,
      },
      {
        path: 'beneficiaries',
        // loadChildren: () => import('./layout/components/my-beneficiaries/my-beneficiaries.module').then(m => m.MyBeneficiariesModule)
        component: BeneficiariesComponent,
      },
      {
        path: 'settings',
        component: SettingComponent,
      },
    ],
  },
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '',
      },
      {
        path: '',
        loadChildren: () =>
          import('./layout/pages/home/home.module').then((m) => m.HomeModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
