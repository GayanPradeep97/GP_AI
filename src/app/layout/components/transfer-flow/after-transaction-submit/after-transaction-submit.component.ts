import { Component, Input } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Subject, takeUntil } from 'rxjs';
import { DataService } from 'src/app/_services/shared-data/data.service';
import { TransferFlow2Service } from 'src/app/_services/transfer-flow2.service';

@Component({
  selector: 'app-after-transaction-submit',
  templateUrl: './after-transaction-submit.component.html',
  styleUrls: ['./after-transaction-submit.component.sass'],
})
export class AfterTransactionSubmitComponent {
  @Input() mode: any;
  @Input() data: any;
  @Input() dataNew: any;
  @Input() mytransaction: any;
  referenceNumber: any;
  amountReceived: any;

  accountNumber: any;
  accountName: any;
  bankName: any;
  sortCode: any;
  transactionDataId: any;
  public distroy$ = new Subject<void>();
  iban: any;
  amountSent: any;
  constructor(
    private modelref: NzModalRef,
    private dataService: DataService,
    private transferFlow2Service: TransferFlow2Service
  ) {}

  ngOnInit() {
    this.referenceNumber = this.dataService.transactionReferenceNew
      ? this.dataService.transactionReferenceNew
      : this.dataService.transactionReference;

    (this.amountSent =
      this.dataService.AllFinalDataFirstStep.totalAmountPayable.toLocaleString(
        'en-US',
        {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }
      )),
      this.getFinalTransactionData(this.data);
    this.getFinalTransactionDataNew(this.dataNew);
  }

  getFinalTransactionData(valueId: any) {
    const data: any = {};
    data['agentTransactionDetailId'] =
      this.dataService.summaryFinalBankDetailsId;
    this.transferFlow2Service
      .getFinalTransactionData(data)
      .pipe(takeUntil(this.distroy$))
      .subscribe((res: any) => {
        if (res['responseDto']) {
          this.accountNumber = res['responseDto']['accountNo'];
          this.accountName = res['responseDto']['accountName'];
          this.bankName = res['responseDto']['bankName'];
          this.sortCode = res['responseDto']['sortCode'];
          this.iban = res['responseDto']['iban'];
          this.dataService.transactionFinalData = {
            accountNumber: res['responseDto']['accountNo'],
            accountName: res['responseDto']['accountName'],
            bankName: res['responseDto']['bankName'],
            sortCode: res['responseDto']['sortCode'],
            iban: res['responseDto']['iban'],
          };
        }
      });
  }

  getFinalTransactionDataNew(valueId: any) {
    if (this.mytransaction === true) {
      const data: any = {};
      data['agentTransactionDetailId'] =
        this.dataService.summaryFinalBankDetailsId;
      this.transferFlow2Service
        .getFinalTransactionData(data)
        .pipe(takeUntil(this.distroy$))
        .subscribe((res: any) => {
          if (res['responseDto']) {
            this.accountNumber = res['responseDto']['accountNo'];
            this.accountName = res['responseDto']['accountName'];
            this.bankName = res['responseDto']['bankName'];
            this.sortCode = res['responseDto']['sortCode'];
            this.dataService.transactionFinalData = {
              accountNumber: res['responseDto']['accountNo'],
              accountName: res['responseDto']['accountName'],
              bankName: res['responseDto']['bankName'],
              sortCode: res['responseDto']['sortCode'],
            };
          }
        });
    }
  }

  closeModal() {
    this.modelref.close();
    location.reload();
  }
}
