import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MyBeneficiaryService {
  constructor(private http: HttpClient, private common: CommonService) {}

  getBeneficiary(data: any) {
    const url = environment.getBeneficiary + data.email;
    let urlParams = new HttpParams();
    data.name ? (urlParams = urlParams.append('name', data.name)) : null;
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

  updateBeneficiary(data: any) {
    const url = environment.updateAgentBeneficiaryDetails;

    return this.http.put(url, data).pipe(
      catchError((err) => {
        return this.common.catchError(err);
      }),
      map((response: any) => {
        return response;
      })
    );
  }
  updateAgentBeneficiaryStatus(data: any) {
    const url =
      environment.updateAgentBeneficiaryStatus + '/' + data.agentBeneficiaryId;
    let urlParams = new HttpParams();
    urlParams = urlParams.append('isActive', data.isActive);
    return this.http.put(url, data, { params: urlParams }).pipe(
      catchError((err) => {
        return this.common.catchError(err);
      }),
      map((response: any) => {
        return response;
      })
    );
  }
  getNationality() {
    const url = environment.nationality;
    return this.http.get(url).pipe(
      catchError((err) => {
        return this.common.catchError(err);
      }),
      map((response: any) => {
        return response;
      })
    );
  }
  getCountryCode() {
    const url = environment.CountryCode;
    return this.http.get(url).pipe(
      catchError((err) => {
        return this.common.catchError(err);
      }),
      map((response: any) => {
        return response;
      })
    );
  }
  getClientCurrency() {
    const url = environment.clientCurrency;
    return this.http.get(url).pipe(
      catchError((err) => {
        return this.common.catchError(err);
      }),
      map((response: any) => {
        return response;
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

  updateAgentBeneficiaryBankAccountStatus(data: any) {
    const url =
      environment.agentBeneficiaryBankAccountStatus +
      '/' +
      data.agentBeneficiaryBankAccountDetailsId;
    let urlParams = new HttpParams();
    urlParams = urlParams.append('isActive', data.isActive);
    return this.http.put(url, null, { params: urlParams }).pipe(
      catchError((err) => {
        return this.common.catchError(err);
      }),
      map((response: any) => {
        return response;
      })
    );
  }
  checkIsBeneficiaryEditable(data: any) {
    const url =
      environment.checkIsBeneficiaryEditable + data.AgentbeneficiaryDetailsId;
    let urlParams = new HttpParams();
    data.AgentbeneficiaryDetailsId
      ? (urlParams = urlParams.append(
          'AgentbeneficiaryDetailsId',
          data.AgentbeneficiaryDetailsId
        ))
      : null;
    return this.http.get(url, { params: urlParams }).pipe(
      catchError((err) => {
        return this.common.catchError(err);
      }),
      map((response: any) => {
        return response;
      })
    );
  }
  saveAgentBeneficiaryDetails(data: any) {
    const url = environment.saveAgentBeneficiaryDetails;
    return this.http.post(url, data).pipe(
      catchError((err) => {
        return this.common.catchError(err);
      }),
      map((response: any) => {
        return response;
      })
    );
  }
  addBank(data: any, formdata: any) {
    const url =
      environment.addBank +
      '/' +
      data.ExposableId +
      '/' +
      data.countryId +
      '/' +
      '1';
    return this.http.post(url, formdata).pipe(
      catchError((err) => {
        return this.common.catchError(err);
      }),
      map((response: any) => {
        return response;
      })
    );
  }
  getAgentBeneficiryBankAccount(data: any) {
    const url =
      environment.agentBeneficiryBankAccount +
      '/' +
      data.agentBeneficiaryDetailsId;
    let urlParams = new HttpParams();
    data.pageNumber
      ? (urlParams = urlParams.append('pageNumber', data.pageNumber))
      : null;
    data.pageSize
      ? (urlParams = urlParams.append('pageSize', data.pageSize))
      : null;
    return this.http.get(url, { params: urlParams }).pipe(
      catchError((err) => {
        return this.common.catchError(err);
      }),
      map((response: any) => {
        return response;
      })
    );
  }
  saveAgentBeneficiaryDetailsCoporate(data: any) {
    const url = environment.saveAgentBeneficiaryDetailsCoporate;
    return this.http.post(url, data).pipe(
      catchError((err) => {
        return this.common.catchError(err);
      }),
      map((response: any) => {
        return response;
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
  getBeneficiaryDetailsById(data: any) {
    const url =
      environment.getBeneficiaryDetailsById +
      '/' +
      data.agentBeneficiaryDetailsId;
    // let urlParams = new HttpParams();
    // data.agentBeneficiaryDetailsId
    //   ? (urlParams = urlParams.append(
    //       'agentBeneficiaryDetailsId',
    //       data.agentBeneficiaryDetailsId
    //     ))
    //   : null;
    return this.http.get(url).pipe(
      catchError((err) => {
        return this.common.catchError(err);
      }),
      map((response: any) => {
        return response;
      })
    );
  }
  getAgentSender(data: any) {
    const url = environment.getAgentSender + '/' + data.agentExposableId;
    let urlParams = new HttpParams();
    data.email ? (urlParams = urlParams.append('email', data.email)) : null;
    return this.http.get(url, { params: urlParams }).pipe(
      catchError((err) => {
        return this.common.catchError(err);
      }),
      map((response: any) => {
        return response;
      })
    );
  }
  getAgentReceivingCountry(data: any) {
    const url = environment.getAgentCountry + '/' + data.exposableId;
    return this.http.get(url).pipe(
      catchError((err) => {
        return this.common.catchError(err);
      }),
      map((response: any) => {
        return response;
      })
    );
  }
  checkBeneficiaryEditable(data: any) {
    const url =
      environment.isBeneficiaryEditable + '/' + data.agentBeneficiaryDetailsId;
    return this.http.get(url).pipe(
      catchError((err) => {
        return this.common.catchError(err);
      }),
      map((response: any) => {
        return response;
      })
    );
  }

  getBankDetails(data: any) {
    const url =
      environment.getBankDetailsByExposableId +
      '/' +
      data.exposableId +
      '/' +
      data.countryId;
    return this.http.get(url).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err) => {
        return this.common.catchError(err);
      })
    );
  }
}
