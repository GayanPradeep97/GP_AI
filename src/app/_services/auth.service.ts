import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { Router } from '@angular/router';
import { TokenService } from './token.service';
import { BehaviorSubject, Observable, catchError, map } from 'rxjs';
import { user } from '../_models/users';
import { environment } from 'src/environments/environment';
import { DataService } from './shared-data/data.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public currentUser!: Observable<any>;
  private currentUserSubject!: BehaviorSubject<user>;

  constructor(
    private http: HttpClient,
    private commonService: CommonService,
    private router: Router,
    private tokenStorage: TokenService,
    private dataService: DataService
  ) {
    // this.currentUserSubject = new BehaviorSubject<user>(
    //   JSON.parse(JSON.stringify(localStorage.getItem('currentUser')))
    // );
    // this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): user {
    return this.currentUserSubject.value;
  }

  //login user
  login(data: any) {
    const url = environment.authenticate;
    return this.http.post<user>(url, data).pipe(
      map((user: any) => {
        return user;
      }),
      catchError((err) => {
        return this.commonService.catchError(err);
      })
    );
  }

  isLoggedIn(): boolean {
    // return (this.currentUserValue && this.currentUserValue.jwttoken);
    return !!this.currentUserValue?.jwttoken;
  }

  logout() {
    // remove user from local storage to log user out
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('currentclient');
    sessionStorage.clear();
    this.router.navigate(['/login']);
    sessionStorage.removeItem('currentActiveUserAccount');
  }

  setRefreshToken(token: any) {
    sessionStorage.setItem('currentUser', token);
    this.tokenStorage.saveToken(token.jwttoken);
  }
  refreshToken(data: any) {
    const url = environment.refresh;
    return this.http.post(url, data).pipe(
      catchError((err) => {
        return this.commonService.catchError(err);
      }),
      map((response: any) => {
        // this.responseHandler();
        return response;
      })
    );
  }

  getTfaCode(data: any) {
    const url = environment.TFACode;
    return this.http.post(url, data).pipe(
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
