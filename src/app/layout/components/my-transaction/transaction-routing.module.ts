import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MyTransactionComponent } from './my-transaction/my-transaction.component';
import { ViewTransactionModalComponent } from './view-transaction-modal/view-transaction-modal.component';

const routes: Routes = [
  {
    path: '',
    component: MyTransactionComponent,
  },

];


@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionRoutingModule { }
