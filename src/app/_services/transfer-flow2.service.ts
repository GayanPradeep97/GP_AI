import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransferFlow2Service {
  constructor(private http: HttpClient, private common: CommonService) {}

  public getAgentReceivingCountry(data: any) {
    const url =
      environment.getagentReceivingCountriesByselctCountries +
      data.agentTransferAapprovedSendingReceivingCurrenciesId;
    return this.http.get(url).pipe(
      catchError((err) => {
        return this.common.catchError(err);
      }),
      map((responce: any) => {
        return responce;
      })
    );
  }

  getAgentBenificaryDetails(data: any) {
    const url = environment.getBeneficiaryByFilter + data.email;
    let urlParams = new HttpParams();
    data.name ? (urlParams = urlParams.append('name', data.name)) : null;
    data.isCustomer
      ? (urlParams = urlParams.append('isCustomer', data.isCustomer))
      : null;
    data.contactNumber
      ? (urlParams = urlParams.append('contactNumber', data.contactNumber))
      : null;
    data.pageNumber
      ? (urlParams = urlParams.append('pageNumber', data.pageNumber))
      : null;
    data.pageSize
      ? (urlParams = urlParams.append('pageSize', data.pageSize))
      : null;
    data.address
      ? (urlParams = urlParams.append('address', data.address))
      : null;
    data.countryId
      ? (urlParams = urlParams.append('countryId', data.countryId))
      : null;
    return this.http.get(url, { params: urlParams }).pipe(
      catchError((err) => {
        return this.common.catchError(err);
      }),
      map((response: any) => {
        // this.responseHandler();
        return response;
      })
    );
  }

  getRefferences(data: any) {
    const url = environment.getRefferences + data.countryselectCode;
    return this.http.get(url).pipe(
      catchError((err) => {
        return this.common.catchError(err);
      }),
      map((responce: any) => {
        return responce;
      })
    );
  }

  getExistingBenificaryBankDetails(data: any) {
    const url =
      environment.getExistingBenificaryBankDetails + data.BeneficiaryDetailsId;
    let urlParams = new HttpParams();

    urlParams = urlParams.append('countryId', data.countryId);
    urlParams = urlParams.append(
      'agentTransferApprovedSendingReceivingCurrenciesId',
      data.agentTransferApprovedSendingReceivingCurrenciesId
    );
    return this.http.get(url, { params: urlParams }).pipe(
      catchError((err) => {
        return this.common.catchError(err);
      }),
      map((responce: any) => {
        return responce;
      })
    );
  }

  getAllCountryCodes() {
    const url = environment.getAllCOuntryCodes;
    return this.http.get(url).pipe(
      catchError((err) => {
        return this.common.catchError(err);
      }),
      map((responce: any) => {
        return responce;
      })
    );
  }

  getAllgetNationality() {
    const url = environment.getNationality;
    return this.http.get(url).pipe(
      catchError((err) => {
        return this.common.catchError(err);
      }),
      map((responce: any) => {
        return responce;
      })
    );
  }

  getAllExistingBankAccountDetails(data: any) {
    const url =
      environment.getAllExistingBankAccdetails + data.BeneficiaryDetailsId;
    let urlParams = new HttpParams();

    urlParams = urlParams.append('countryId', data.countryId);
    urlParams = urlParams.append(
      'agentTransferApprovedSendingReceivingCurrenciesId',
      data.agentTransferApprovedSendingReceivingCurrenciesId
    );
    return this.http.get(url, { params: urlParams }).pipe(
      catchError((err) => {
        return this.common.catchError(err);
      }),
      map((responce: any) => {
        return responce;
      })
    );
  }

  getAllExistingBenificaryDetailsForPatchData(data: any) {
    const url =
      environment.getAllBenificaryDetails + data.agentBeneficiaryDetailsId;
    return this.http.get(url).pipe(
      catchError((err) => {
        return this.common.catchError(err);
      }),
      map((responce: any) => {
        return responce;
      })
    );
  }

  saveNewBenificary(formdata: any) {
    const url = environment.SaveNewBenificary;
    return this.http.post(url, formdata).pipe(
      catchError((err) => {
        return this.common.catchError(err);
      }),
      map((responce: any) => {
        return responce;
      })
    );
  }

  addNewBank(data: any, formdata: any) {
    const url =
      environment.addNewBank +
      data.exposableId +
      '/' +
      data.countryId +
      '/' +
      data.reqestType;
    return this.http.post(url, formdata).pipe(
      catchError((err) => {
        return this.common.catchError(err);
      }),
      map((responce: any) => {
        return responce;
      })
    );
  }

  SaveFinalTransaction(formdata: any) {
    const url = environment.saveTransaction;
    return this.http.post(url, formdata).pipe(
      catchError((err) => {
        return this.common.catchError(err);
      }),
      map((responce: any) => {
        return responce;
      })
    );
  }

  getFinalTransactionData(data: any) {
    const url =
      environment.getFinalTransactionData + data.agentTransactionDetailId;

    return this.http.get(url).pipe(
      catchError((err) => {
        return this.common.catchError(err);
      }),
      map((responce: any) => {
        return responce;
      })
    );
  }

  getAgentReceivingCountries(data: any) {
    const url =
      environment.agentReceivingCountries + '/' + data.clientcurrencyid;
    let urlParams = new HttpParams();

    urlParams = urlParams.append('clientcurrencyid', data.clientcurrencyid);

    return this.http.get(url, { params: urlParams }).pipe(
      catchError((err) => {
        return this.common.catchError(err);
      }),
      map((response: any) => {
        return response;
      })
    );
  }
}
