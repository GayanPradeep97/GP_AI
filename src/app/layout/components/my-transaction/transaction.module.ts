import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyTransactionComponent } from './my-transaction/my-transaction.component';
import { SharedModule } from 'src/app/_shared/shared/shared.module';
import { TransactionRoutingModule } from './transaction-routing.module';
import { ViewTransactionModalComponent } from './view-transaction-modal/view-transaction-modal.component';
import { ViewComponent } from './view-transaction-modal/view/view.component';
import { UserDetailsComponent } from './view-transaction-modal/user-details/user-details.component';
import { BenificaryDetailsComponent } from './view-transaction-modal/benificary-details/benificary-details.component';
import { ConfirmationDetailsComponent } from './view-transaction-modal/confirmation-details/confirmation-details.component';

@NgModule({
  declarations: [
    MyTransactionComponent,
    ViewTransactionModalComponent,
    ViewComponent,
    UserDetailsComponent,
    BenificaryDetailsComponent,
    ConfirmationDetailsComponent,
  ],
  imports: [CommonModule, SharedModule, TransactionRoutingModule],
})
export class TransactionModule {}
