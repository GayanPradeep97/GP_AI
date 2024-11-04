import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MyTansactionService {
  constructor(private http: HttpClient, private common: CommonService) {}

  getExposableId(data: any) {
    const url = environment.getExposableId;
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

  getTabaleDataWithFilter(data: any) {
    const url = environment.getTableDataWithFilter;
    let urlParams = new HttpParams();

    urlParams = urlParams.append('userName', data.userName);
    urlParams = urlParams.append('pageNumber', data.pageNumber);
    urlParams = urlParams.append('pageSize', data.pageSize);
    urlParams = urlParams.append('transactionSummery', data.transactionSummery);

    data.beneficiaryName
      ? (urlParams = urlParams.append('beneficiaryName', data.beneficiaryName))
      : null;
    data.contactNumber
      ? (urlParams = urlParams.append('contactNumber', data.contactNumber))
      : null;

    return this.http.get(url, { params: urlParams }).pipe(
      catchError((err) => {
        return this.common.catchError(err);
      }),
      map((responce: any) => {
        return responce;
      })
    );
  }

  getAgentSenderDtailsForCustomer(data: any) {
    const url =
      environment.agentSenderDetailsForCustomer + data.agentExposableId;
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

  getcustomerTransactionDetails(data: any) {
    const url =
      environment.getviewCustomerTransferDetails +
      data.agentTransactionDetailId;

    return this.http.get(url).pipe(
      catchError((err) => {
        return this.common.catchError(err);
      }),
      map((responce: any) => {
        return responce;
      })
    );
  }

  getNationality() {
    const url = environment.getAllNationality;

    return this.http.get(url).pipe(
      catchError((err) => {
        return this.common.catchError(err);
      }),
      map((responce: any) => {
        return responce;
      })
    );
  }

  getCountryCode() {
    const url = environment.getAllCountryCode;

    return this.http.get(url).pipe(
      catchError((err) => {
        return this.common.catchError(err);
      }),
      map((responce: any) => {
        return responce;
      })
    );
  }

  getClientCurrency() {
    const url = environment.getClientCurrency;

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

  getAgentReceivingCountry(data: any) {
    const url = environment.getAgentRecevingCountries + data.clientCountryId;
    return this.http.get(url).pipe(
      catchError((err) => {
        return this.common.catchError(err);
      }),
      map((responce: any) => {
        return responce;
      })
    );
  }

  chckBenifisaryEditableOrNot(data: any) {
    const url =
      environment.checkBenifisaryEditable + data.agentBeneficiaryDetailsId;
    return this.http.get(url).pipe(
      catchError((err) => {
        return this.common.catchError(err);
      }),
      map((responce: any) => {
        return responce;
      })
    );
  }

  chckBenifisaryBankDtailsEditableOrNot(data: any) {
    const url =
      environment.checkBenificaryBankEditable + data.agentBeneficiaryDetailsId;

    let urlParams = new HttpParams();

    urlParams = urlParams.append(
      'agentBeneficiaryBankAccountDetailsId',
      data.agentBeneficiaryBankAccountDetailsId
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

  updateBenifisaryDtails(formdata: any) {
    const url = environment.updateBenificaryDetails;
    return this.http.put(url, formdata).pipe(
      catchError((err) => {
        return this.common.catchError(err);
      }),
      map((responce: any) => {
        return responce;
      })
    );
  }

  updateBenifisaryBankDetails(data: any, formdata: any) {
    const url =
      environment.updateBenificaryBankDetials +
      data.exposableId +
      '/' +
      data.countryId +
      '/' +
      data.transactionDtailsId;
    return this.http.put(url, formdata).pipe(
      catchError((err) => {
        return this.common.catchError(err);
      }),
      map((responce: any) => {
        return responce;
      })
    );
  }

  getAgentBenifisaryDetails(data: any) {
    const url =
      environment.agentBenifisaryDetails +
      data.exposableId +
      '/' +
      data.agentSenderDetailsId;
    return this.http.get(url).pipe(
      catchError((err) => {
        return this.common.catchError(err);
      }),
      map((responce: any) => {
        return responce;
      })
    );
  }
}
