import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup/signup.component';
import { SharedModule } from 'src/app/_shared/shared/shared.module';
import { SignupContinueComponent } from './signup-continue/signup-continue.component';
import { SignupSummaryComponent } from './signup-summary/signup-summary.component';
import { IdScanDetailsComponent } from './id-scan-details/id-scan-details.component';
import { SignupPageComponent } from './signup-page/signup-page.component';

@NgModule({
  declarations: [
    SignupComponent,
    SignupContinueComponent,
    SignupSummaryComponent,
    IdScanDetailsComponent,
    SignupPageComponent,
  ],
  imports: [CommonModule, SignupRoutingModule, SharedModule],
})
export class SignupModule {}
