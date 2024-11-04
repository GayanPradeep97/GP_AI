import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs';
import { user } from '../_models/users';

@Injectable({
  providedIn: 'root',
})
export class CoporateSenderDataService {
  constructor(private http: HttpClient, private commons: CommonService) {}

  private responseHandler() {
    this.commons.hideLoading();
  }

  public getAgentCoporateSenderData(data: any) {
    const url = environment.agentCooperateSender + data;
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

  checkCoporateSenderAvailable(data: any) {
    const url = environment.checkCorporateSenderAvailable;

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

  uploadCoporateSenderDocuments(data: any, formData: any) {
    const url = environment.uploadSenderDocuments + data.coorporateId;

    // let urlParams = new HttpParams();

    // urlParams = urlParams.append('documentDetails', data.documentDetails);
    return this.http.post(url, formData).pipe(
      map((user: any) => {
        return user;
      }),
      catchError((err) => {
        return this.commons.catchError(err);
      })
    );
  }
}
