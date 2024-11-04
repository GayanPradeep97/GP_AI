import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrencydataService {
  currencuData: any;

  constructor(private http: HttpClient, private common: CommonService) {}

  public getSendingCurrenciesByExposableId(data: any) {
    // console.log('agentExposableId currency service', data.agentExposableId);
    const url = environment.agentSendingCurrency + data.agentExposableId; //need to change this ID
    // console.log('agentExposableId currency url', url);

    return this.http.get(url).pipe(
      catchError((err) => {
        return this.common.catchError(err);
      }),
      map((responce: any) => {
        return responce;
      })
    );
  }

  public getSendingReceivingCurrency(data: any) {
    const url =
      environment.agentSendingReceivingCurrency +
      data.agentExposableId +
      '/' +
      data.currencyCode; //need to change this ID
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
