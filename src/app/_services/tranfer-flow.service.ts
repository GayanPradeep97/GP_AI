import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CommonService } from './common.service';
import { catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranferFlowService {
  constructor(private http: HttpClient, private common: CommonService) {}

  public getSendingCurrencies(data: any) {
    const url = environment.agentSendingCurrency + data.agentExposableId; //need to change this ID

    return this.http.get(url).pipe(
      catchError((err) => {
        return this.common.catchError(err);
      }),
      map((responce: any) => {
        return responce;
      })
    );
  }

  getAgntExposableId(data: any) {
    const url = environment.getAgentExposableId; //need to change this ID
    let urlParams = new HttpParams();
    urlParams = urlParams.append('username', data.username);
    return this.http.get(url, { params: urlParams }).pipe(
      catchError((err) => {
        return this.common.catchError(err);
      }),
      map((responce: any) => {
        return responce;
      })
    );
  }

  getSndingRecivingCurrencis(data: any) {
    const url =
      environment.sendingRecevingCurrency +
      data.agentExposableId +
      '/' +
      data.sendingCurrency;

    return this.http.get(url).pipe(
      catchError((err) => {
        return this.common.catchError(err);
      }),
      map((responce: any) => {
        return responce;
      })
    );
  }

  getAgentReceivingCurrency(data: any) {
    const url = environment.getAgentRecevingCurrency + data.exposableId;
    return this.http.get(url).pipe(
      catchError((err) => {
        return this.common.catchError(err);
      }),
      map((response: any) => {
        return response;
      })
    );
  }

  gtAllPaymentModes(data: any) {
    const url = environment.getPaymentModes + data.agentExposableId;
    return this.http.get(url).pipe(
      catchError((err) => {
        return this.common.catchError(err);
      }),
      map((responce: any) => {
        return responce;
      })
    );
  }

  gtAllTransactionModes(data: any) {
    const url =
      environment.getTransactionModes +
      data.agentExposableId +
      '/' +
      data.agentTransferRceivingCurrncyId;
    return this.http.get(url).pipe(
      catchError((err) => {
        return this.common.catchError(err);
      }),
      map((responce: any) => {
        return responce;
      })
    );
  }

  getAgntTransactionRats(data: any) {
    const url =
      environment.getAgentTransactionFee +
      data.agentExposableId +
      '/' +
      'RECEIVEAMOUNT';

    let urlParams = new HttpParams();
    urlParams = urlParams.append('sendingCurrencyId', data.sendingCurrencyId);
    urlParams = urlParams.append(
      'receivingCurrencyId',
      data.receivingCurrencyId
    );
    urlParams = urlParams.append('amount', data.amount);
    urlParams = urlParams.append('providerType', data.providerType);
    urlParams = urlParams.append('email', data.email);
    return this.http.get(url, { params: urlParams }).pipe(
      catchError((err) => {
        return this.common.catchError(err);
      }),
      map((responce: any) => {
        return responce;
      })
    );
  }

  getAgntTransactionRatsReceived(data: any) {
    const url =
      environment.getAgentTransactionFee +
      data.agentExposableId +
      '/' +
      'SENDAMOUNT';

    let urlParams = new HttpParams();
    urlParams = urlParams.append('sendingCurrencyId', data.sendingCurrencyId);
    urlParams = urlParams.append(
      'receivingCurrencyId',
      data.receivingCurrencyId
    );
    urlParams = urlParams.append('amount', data.amount);
    urlParams = urlParams.append('providerType', data.providerType);
    urlParams = urlParams.append('email', data.email);
    return this.http.get(url, { params: urlParams }).pipe(
      catchError((err) => {
        return this.common.catchError(err);
      }),
      map((responce: any) => {
        return responce;
      })
    );
  }

  getAgentConfiguredTransferFee(data: any) {
    const url =
      environment.getAgentConfugreTransferFee +
      data.agentTransferApprovedSendingCurrenciesId +
      '/' +
      data.agentCurrencyTransactionModeId +
      '/' +
      data.transferFeeType +
      '/' +
      data.agentPaymentModeId;

    let urlParams = new HttpParams();
    urlParams = urlParams.append('amount', data.amount);

    return this.http.get(url, { params: urlParams }).pipe(
      catchError((err) => {
        return this.common.catchError(err);
      }),
      map((responce: any) => {
        return responce;
      })
    );
  }

  getAgenetSenderDetails(data: any) {
    const url = environment.agentSenderDetailsByCriteria + data.exposableId;

    let urlParams = new HttpParams();

    urlParams = urlParams.append('email', data.email);
    return this.http.get(url, { params: urlParams }).pipe(
      catchError((err) => {
        return this.common.catchError(err);
      }),
      map((responce: any) => {
        return responce;
      })
    );
  }

  getAllExistingBankDetails(data: any) {
    const url =
      environment.getBankDetailsExcisting +
      data.exposableId +
      '/' +
      data.countryId;
    return this.http.get(url).pipe(
      catchError((err) => {
        return this.common.catchError(err);
      }),
      map((responce: any) => {
        return responce;
      })
    );
  }

  saveFirstStep(data: any) {
    const url = environment.saveTransferFlow;
    return this.http.post(url, data).pipe(
      catchError((err) => {
        return this.common.catchError(err);
      }),
      map((responce: any) => {
        return responce;
      })
    );
  }
  updateFinalStep(data: any) {
    const url = environment.updateTransferFlow;
    return this.http.put(url, data).pipe(
      catchError((err) => {
        return this.common.catchError(err);
      }),
      map((responce: any) => {
        return responce;
      })
    );
  }

  checkRatesvalidOrNot(data: any) {
    const url = environment.checkratescorrect;

    let urlParams = new HttpParams();

    urlParams = urlParams.append('receivingAmount', data.receivingAmount);
    urlParams = urlParams.append('sendingAmount', data.sendingAmount);
    urlParams = urlParams.append('totalPayable', data.totalPayable);
    urlParams = urlParams.append('fee', data.fee);
    urlParams = urlParams.append('currencyRate', data.currencyRate);
    urlParams = urlParams.append('isSendingAmount', data.isSendingAmount);

    return this.http.get(url, { params: urlParams }).pipe(
      catchError((err) => {
        return this.common.catchError(err);
      }),
      map((responce: any) => {
        return responce;
      })
    );
  }
}
