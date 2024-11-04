import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { DecimalPipe, registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './layout/pages/dashboard/header/header.component';
import { DashboardComponent } from './layout/pages/dashboard/dashboard/dashboard.component';
import { SharedModule } from './_shared/shared/shared.module';
import { PopupMessageComponent } from './layout/common-components/popup-message/popup-message.component';
import { HeaderMobViewComponent } from './layout/pages/dashboard/header/header-mob-view/header-mob-view.component';
import { AccountDetailsViewModalNewComponent } from './layout/common-components/account-details-view-modal-new/account-details-view-modal-new.component';
import { ForgotPasswordComponent } from './layout/pages/forgot-password/forgot-password.component';
import { HomeComponent } from './layout/pages/home/home/home.component';
import { FooterComponent } from './layout/pages/dashboard/footer/footer.component';
import { SignupModule } from './layout/pages/signup/signup.module';
import { BasicInformationsComponent } from './layout/components/setting/basic-informations/basic-informations.component';
import { SettingComponent } from './layout/components/setting/setting/setting.component';
import { IdentityDetailsComponent } from './layout/components/setting/identity-details/identity-details.component';
import { PrimaryIdentityUploadComponent } from './layout/components/setting/identity-details/primary-identity-upload/primary-identity-upload.component';
import { SecondryIdentityUploadComponent } from './layout/components/setting/identity-details/secondry-identity-upload/secondry-identity-upload.component';
import { TransactionModule } from './layout/components/my-transaction/transaction.module';
import { MyBeneficiariesModule } from './layout/components/my-beneficiaries/my-beneficiaries.module';
import { TransferFlowComponent } from './layout/components/transfer-flow/transfer-flow.component';
import { CorporateAccountBasicInformationComponent } from './layout/components/create-corporate-account/corporate-account-basic-information/corporate-account-basic-information.component';
import { CorporateAccountDocumentationComponent } from './layout/components/create-corporate-account/corporate-account-documentation/corporate-account-documentation.component';
import { CreateCorporateAccountComponent } from './layout/components/create-corporate-account/create-corporate-account.component';
import { AccountDetailsComponent } from './layout/common-components/account-details/account-details.component';
import { LoadingComponent } from './layout/common-components/loading/loading.component';

import { LoginComponent } from './layout/pages/login/login.component';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { IconDefinition } from '@ant-design/icons-angular';
import { UserOutline } from '@ant-design/icons-angular/icons';
import { VerificationCodeComponent } from './layout/pages/verification-code/verification-code.component';
import { ResetPasswordModalComponent } from './layout/pages/reset-password-modal/reset-password-modal.component';
import { AfterLoginPopoupComponent } from './layout/pages/login/after-login-popoup/after-login-popoup.component';
import { JwtInterceptor } from './_validators/JwtInterceptor';
import { TransferViewComponent } from './layout/components/transfer-flow/transfer-view/transfer-view.component';
import { TransferBeneficiaryComponent } from './layout/components/transfer-flow/transfer-beneficiary/transfer-beneficiary.component';
import { TransferSummeryComponent } from './layout/components/transfer-flow/transfer-summery/transfer-summery.component';
import { AfterTransactionSubmitComponent } from './layout/components/transfer-flow/after-transaction-submit/after-transaction-submit.component';
import { TwoFactorCodeComponent } from './layout/pages/two-factor-code/two-factor-code.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { CheckIdDocumentsComponent } from './layout/pages/check-id-documents/check-id-documents.component';
import { NzResultModule } from 'ng-zorro-antd/result';

const icons: IconDefinition[] = [UserOutline];
registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoadingComponent,
    DashboardComponent,
    PopupMessageComponent,
    HeaderMobViewComponent,
    AccountDetailsViewModalNewComponent,
    ForgotPasswordComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    BasicInformationsComponent,
    SettingComponent,
    IdentityDetailsComponent,
    PrimaryIdentityUploadComponent,
    SecondryIdentityUploadComponent,
    TransferFlowComponent,
    CorporateAccountDocumentationComponent,
    CreateCorporateAccountComponent,
    CorporateAccountBasicInformationComponent,
    AccountDetailsComponent,
    VerificationCodeComponent,
    ResetPasswordModalComponent,
    AfterLoginPopoupComponent,
    TransferViewComponent,
    TransferBeneficiaryComponent,
    TransferSummeryComponent,
    AfterTransactionSubmitComponent,
    TwoFactorCodeComponent,
    CheckIdDocumentsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    SignupModule,
    TransactionModule,
    MyBeneficiariesModule,
    NgOtpInputModule,
    NzResultModule,
  ],

  providers: [
    { provide: NZ_I18N, useValue: en_US },
    { provide: NZ_ICONS, useValue: icons },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    DecimalPipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
