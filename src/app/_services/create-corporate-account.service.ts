import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { environment } from 'src/environments/environment';
import { user } from '../_models/users';
import { catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CreateCorporateAccountService {
  constructor(private http: HttpClient, private commonService: CommonService) {}

  private responseHandler() {
    this.commonService.hideLoading();
  }

  getContactRole() {
    const url = environment.getContactRole;
    return this.http.get(url).pipe(
      catchError((err: any) => {
        return this.commonService.catchError(err);
      }),
      map((response: any) => {
        this.responseHandler();
        return response;
      })
    );
  }

  addNewCorporateSender(formData: any) {
    const url = environment.addNewCorporateSender;

    return this.http.post(url, formData).pipe(
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
