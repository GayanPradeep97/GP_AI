import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrencyConversionLocalService {
  constructor(private http: HttpClient, private common: CommonService) {}

  public getCurrencyConversionDetailsExternal(data: any) {
    const url =
      environment.agentCurrencyRate +
      data.agentExposableId +
      '/' +
      'SENDAMOUNT' +
      '/';
    data.requestType;

    let urlParams = new HttpParams();

    urlParams = urlParams.append('sendingCurrencyId', data.sendingCurrencyId);
    urlParams = urlParams.append(
      'receivingCurrencyId',
      data.receivingCurrencyId
    );
    urlParams = urlParams.append('amount', data.amount);
    urlParams = urlParams.append('providerType', data.providerType);
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
}
