import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  constructor(private commonService: CommonService, private http: HttpClient) {}

  saveSignUpStep1(data: any) {
    const url = environment.signUpStep1;
    return this.http.post(url, data).pipe(
      map((user: any) => {
        return user;
      }),
      catchError((err) => {
        return this.commonService.catchError(err);
      })
    );
  }
  saveSignUp(data: any) {
    const url = environment.signUp + data.agentExposableId;
    return this.http.post(url, data).pipe(
      map((user: any) => {
        return user;
      }),
      catchError((err) => {
        return this.commonService.catchError(err);
      })
    );
  }
  getSignUpDetails(data: any) {
    const url = environment.signupDetails + data;
    return this.http.get(url, data).pipe(
      map((user: any) => {
        return user;
      }),
      catchError((err) => {
        return this.commonService.catchError(err);
      })
    );
  }
  dualRegistration(data: any) {
    const url = environment.checkRualRegistrationOfUser;
    let urlparams = new HttpParams();
    data.dateOfBirth &&
      (urlparams = urlparams.append('dateOfBirth', data.dateOfBirth));
    data.placeOfBirth &&
      (urlparams = urlparams.append('placeOfBirth', data.placeOfBirth));
    data.telephoneNo &&
      (urlparams = urlparams.append('telephoneNo', data.telephoneNo));
    data.customerName &&
      (urlparams = urlparams.append('customerName', data.customerName));
    return this.http.get(url, { params: urlparams }).pipe(
      catchError((err) => {
        return this.commonService.catchError(err);
      }),
      map((response: any) => {
        return response;
      })
    );
  }
  updateAgentJourneyId(data: any, refNumber: any) {
    const url = environment.updateAgentJourneyId + refNumber;
    return this.http.put(url, data).pipe(
      catchError((err: any) => {
        return this.commonService.catchError(err);
      }),
      map((response: any) => {
        return response;
      })
    );
  }

  verify(data: any) {
    const url = environment.verifyUser;
    let urlParams = new HttpParams();
    urlParams = urlParams.append('username', data.username);
    urlParams = urlParams.append('token', data.token);
    return this.http.get(url, { params: urlParams }).pipe(
      map((user: any) => {
        return user;
      }),
      catchError((err) => {
        return this.commonService.catchError(err);
      })
    );
  }
}
