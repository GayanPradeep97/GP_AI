import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CompanyDetailService {
  constructor(private http: HttpClient, private commons: CommonService) {}

  private responseHandler() {
    this.commons.hideLoading();
  }

  getAllCompanyType() {
    const url = environment.getAllCompanyType;
    return this.http.get(url).pipe(
      map((user: any) => {
        return user;
      }),
      catchError((err) => {
        return this.commons.catchError(err);
      })
    );
  }
}
