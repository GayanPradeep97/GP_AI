import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CommonService } from './common.service';
import { catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AgentDetailsDataServiceService {
  agentDetailsData: any;

  constructor(private http: HttpClient, private commons: CommonService) {}

  private responseHandler() {
    this.commons.hideLoading();
  }

  getExposableIdByUserName(data: any) {
    const url = environment.agentSender;
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

  getAgentExposableId() {
    const url = environment.agentDetails + environment.agentRegNumber;
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

  getAgentSenderData(data: any) {
    const url = environment.agentSenderDetails + data.agentExposableId;

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
}
