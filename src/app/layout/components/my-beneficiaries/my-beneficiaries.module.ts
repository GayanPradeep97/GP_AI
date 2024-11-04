import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BeneficiariesComponent } from './beneficiaries/beneficiaries.component';
import { SharedModule } from 'src/app/_shared/shared/shared.module';
import { AddBeneficiaryModalComponent } from './add-beneficiary-modal/add-beneficiary-modal.component';
import { ViewBeneficiaryModalComponent } from './view-beneficiary-modal/view-beneficiary-modal.component';



@NgModule({
  declarations: [
    BeneficiariesComponent,
    AddBeneficiaryModalComponent,
    ViewBeneficiaryModalComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class MyBeneficiariesModule { }
