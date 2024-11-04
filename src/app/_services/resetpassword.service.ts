import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResetpasswordService {
  constructor(private http: HttpClient, private commonService: CommonService) {}
  resetpassword(data: any) {
    const url = environment.resetPassword;
    return this.http.post(url, data).pipe(
      catchError((err) => {
        return this.commonService.catchError(err);
      }),
      map((response: any) => {
        return response;
      })
    );
  }

  resetpasswordrequest(data: any) {
    const url = environment.request;
    let urlParams = new HttpParams();

    data.isMobile
      ? (urlParams = urlParams.append('isMobile', data.isMobile))
      : null;
    data.isCustomerRequest
      ? (urlParams = urlParams.append(
          'isCustomerRequest',
          data.isCustomerRequest
        ))
      : null;

    return this.http.post(url, data, { params: urlParams }).pipe(
      catchError((err) => {
        return this.commonService.catchError(err);
      }),
      map((response: any) => {
        return response;
      })
    );
  }

  checkTokenValidityCustomer(data: any) {
    const url = environment.resetPassword;
    let urlparams = new HttpParams();

    data.token ? (urlparams = urlparams.append('token', data.token)) : null;
    data.dateOfBirth
      ? (urlparams = urlparams.append('dateOfBirth', data.dateOfBirth))
      : null;

    return this.http.get(url, { params: urlparams }).pipe(
      catchError((err) => {
        return this.commonService.catchError(err);
      }),
      map((response: any) => {
        return response;
      })
    );
  }

  public sendNewPassword(data: any) {
    const url = environment.passwordReset;

    return this.http.post(url, data).pipe(
      catchError((err) => {
        return this.commonService.catchError(err);
      }),
      map((response: any) => {
        return response;
      })
    );
  }
}
