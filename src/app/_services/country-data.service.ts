import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountryDataService {
  constructor(private http: HttpClient, private commons: CommonService) {}

  private responseHandler() {
    this.commons.hideLoading();
  }

  getCountryForContctPage() {
    const url = environment.getCountry;
    return this.http.get(url).pipe(
      catchError((err: any) => {
        return this.commons.catchError(err);
      }),
      map((response: any) => {
        this.responseHandler();
        return response;
      })
    );
  }

  getCountryCode() {
    const url = environment.getCountryCode;
    return this.http.get(url).pipe(
      map((user: any) => {
        return user;
      }),
      catchError((err) => {
        return this.commons.catchError(err);
      })
    );
  }

  getSignupAllCountries(data: any) {
    const url = environment.getSignupCountries + data.agentExposableId;
    return this.http.get(url).pipe(
      map((user: any) => {
        return user;
      }),
      catchError((err) => {
        return this.commons.catchError(err);
      })
    );
  }
}
