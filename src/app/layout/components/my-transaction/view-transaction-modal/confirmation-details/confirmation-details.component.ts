import { Component } from '@angular/core';
import { DataService } from 'src/app/_services/shared-data/data.service';

@Component({
  selector: 'app-confirmation-details',
  templateUrl: './confirmation-details.component.html',
  styleUrls: ['./confirmation-details.component.sass'],
})
export class ConfirmationDetailsComponent {
  invoiceId: any;
  transferReferrence: any;
  date: any;
  senderName: any;
  transferedAmount: any;
  benifisaryFirstName: any;
  benifisaryLastName: any;
  madeOfService: any;
  ReceivedAmmount: any;
  sendingCurrency: any;
  recipientCurrency: any;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    console.log(this.dataService.saveAllTransactionData);

    this.invoiceId = this.dataService.saveAllTransactionData.invoiceId;
    this.transferReferrence =
      this.dataService.saveAllTransactionData.invoiceTransferNumber;
    this.date = this.dataService.saveAllTransactionData.invoiceDate;
    this.senderName = this.dataService.saveAllTransactionData.invoiceSenderName;
    this.transferedAmount =
      this.dataService.saveAllTransactionData.totalAmountPayable.toLocaleString(
        'en-US',
        {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }
      );
    this.benifisaryFirstName = this.dataService.newBenifisaryNames
      ? this.dataService.newBenifisaryNames.bFirstname
      : this.dataService.saveAllTransactionData.beneficiaryFirstName;
    this.benifisaryLastName = this.dataService.newBenifisaryNames
      ? this.dataService.newBenifisaryNames.bLastname
      : this.dataService.saveAllTransactionData.beneficiaryLastName;
    this.madeOfService =
      this.dataService.saveAllTransactionData.invoiceTransferAs;
    this.ReceivedAmmount =
      this.dataService.saveAllTransactionData.invoiceReceivedAmount.toLocaleString(
        'en-US',
        {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }
      );

    this.sendingCurrency =
      this.dataService.saveAllTransactionData.sendingCurrency;

    this.recipientCurrency =
      this.dataService.saveAllTransactionData.recipientCurrency;

    // console.log(
    //   'madeOfService',
    //   this.dataService.saveAllTransactionData.invoiceTransferAs
    // );
    // console.log(
    //   'ReceivedAmmount',
    //   this.dataService.saveAllTransactionData.invoiceReceivedAmount
    // );
  }
}
