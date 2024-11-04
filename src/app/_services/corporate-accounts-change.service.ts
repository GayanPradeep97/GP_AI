import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CorporateAccountsChangeService {
  constructor(private http: HttpClient, private commons: CommonService) {}

  private responseHandler() {
    this.commons.hideLoading();
  }

  public getCorporateExposableId(data: any) {
    const url = environment.corporateUseracount;

    let urlParams = new HttpParams();

    urlParams = urlParams.append('username', data.username);
    return this.http.get(url, { params: urlParams }).pipe(
      catchError((err: any) => {
        return this.commons.catchError(err);
      }),
      map((response: any) => {
        this.responseHandler();
        return response;
      })
    );
  }

  public getCorporateAcountData(data: any) {
    const url = environment.corporateUserData + data.exposableId;

    let urlParams = new HttpParams();

    urlParams = urlParams.append('email', data.email);
    return this.http.get(url, { params: urlParams }).pipe(
      catchError((err: any) => {
        return this.commons.catchError(err);
      }),
      map((response: any) => {
        this.responseHandler();
        return response;
      })
    );
  }

  public getCorporateAccess(data: any) {
    const url = environment.corporateAccess + data;
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

  public checkFileExisting(data: any) {
    const url = environment.checkFileExisting;
    let urlParams = new HttpParams();

    urlParams = urlParams.append('email', data.email);
    urlParams = urlParams.append('dateOfBirth', data.dateOfBirth);
    urlParams = urlParams.append('birthPlace', data.birthPlace);
    return this.http.get(url, { params: urlParams }).pipe(
      catchError((err: any) => {
        return this.commons.catchError(err);
      }),
      map((response: any) => {
        this.responseHandler();
        return response;
      })
    );
  }
}
