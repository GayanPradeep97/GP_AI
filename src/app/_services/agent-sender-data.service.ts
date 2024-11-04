import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AgentSenderDataService {
  constructor(
    private httpClient: HttpClient,
    private commonService: CommonService
  ) {}

  private responseHandler() {
    this.commonService.hideLoading();
  }

  getAgentSenderDataByEmail(data: any) {
    const url = environment.getSenderDetailByUserEmail + data.exposableId;
    let urlParams = new HttpParams();
    urlParams = urlParams.append('email', data.email);
    return this.httpClient.get(url, { params: urlParams }).pipe(
      catchError((err: any) => {
        return this.commonService.catchError(err);
      }),
      map((response: any) => {
        this.responseHandler();
        return response;
      })
    );
  }
}
