import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SettingService {
  constructor(private http: HttpClient, private commonService: CommonService) {}

  settingData: any;

  getExposableIdByUsername(data: any) {
    const url = environment.agentSender;
    let urlparams = new HttpParams();
    data.username
      ? (urlparams = urlparams.append('username', data.username))
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
  getUserSetting(data: any) {
    const url = environment.getUserSetting;
    let urlparams = new HttpParams();
    urlparams = urlparams.append('username', data.username);
    return this.http.get(url, { params: urlparams }).pipe(
      catchError((err) => {
        return this.commonService.catchError(err);
      }),
      map((response: any) => {
        return response;
      })
    );
  }

  getAgentDetails(data: any, exposableId: any) {
    const url = environment.agentSenderDetails + exposableId;
    let urlparams = new HttpParams();
    data.email ? (urlparams = urlparams.append('email', data.email)) : null;
    return this.http.get(url, { params: urlparams }).pipe(
      catchError((err) => {
        return this.commonService.catchError(err);
      }),
      map((response: any) => {
        return response;
      })
    );
  }

  updateUserDetails(data: any) {
    const url = environment.updateUser;
    return this.http.put(url, data).pipe(
      catchError((err) => {
        return this.commonService.catchError(err);
      }),
      map((response: any) => {
        return response;
      })
    );
  }
}
