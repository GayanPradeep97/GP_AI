import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SecondaryIdentityService {
  constructor(private http: HttpClient, private commonService: CommonService) {}
  getSecondaryIdentity(data: any) {
    const url = environment.getSecondaryIdentity + '/' + data;
    return this.http.get(url).pipe(
      catchError((err) => {
        return this.commonService.catchError(err);
      }),
      map((response: any) => {
        // this.responseHandler();
        return response;
      })
    );
  }
  saveSecondaryIdentity(formData: any, data: any) {
    const url = environment.saveSecondaryId + data.customerDetailsId;
    let urlParams = new HttpParams();
    data.secondaryIdType
      ? (urlParams = urlParams.append('secondaryIdType', data.secondaryIdType))
      : null;
    return this.http.post(url, formData, { params: urlParams }).pipe(
      catchError((err) => {
        return this.commonService.catchError(err);
      }),
      map((response: any) => {
        // this.responseHandler();
        return response;
      })
    );
  }
}
