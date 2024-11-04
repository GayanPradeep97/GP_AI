import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PrimaryIdService {
  constructor(private http: HttpClient, private commonService: CommonService) {}
  getAgentIdentity(data: any) {
    const url = environment.getAgentIdentity + '/' + data;
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
  savePrimaryIdentity(formData: any, data: any) {
    const url = environment.savePrimaryIdentity + data.customerDetailsId;
    let urlParams = new HttpParams();
    data.primaryId
      ? (urlParams = urlParams.append('primaryId', data.primaryId))
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
