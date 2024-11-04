import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  catchError,
  filter,
  finalize,
  Observable,
  switchMap,
  take,
  throwError,
} from 'rxjs';
import { CommonService } from '../_services/common.service';
import { DataService } from '../_services/shared-data/data.service';
import { environment } from 'src/environments/environment';
import { TokenService } from '../_services/token.service';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  request = 0;
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  constructor(
    private commonService: CommonService,
    private tokenService: TokenService,
    private router: Router,
    private dataService: DataService,
    private authService: AuthService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<Object>> {
    let authReq = req;

    const token = this.tokenService.getToken();
    if (token != null) {
      authReq = this.addTokenHeader(req, token);
    }

    this.commonService.showLoading();
    this.request++;

    return next.handle(authReq).pipe(
      catchError((error) => {
        if (
          error instanceof HttpErrorResponse &&
          error.status === 401 &&
          !authReq.url.includes(environment.authenticate)
        ) {
          // console.log('401 un authorized');
          // const token = this.tokenService.getRefreshToken();
          // if (token) {
          //   return this.handle401Error(authReq, next);
          // }
          localStorage.clear();
          this.handleLogout();
          this.dataService.isLoggedIn = false;
          this.router.navigate(['']);
          window.location.reload();
        }
        return throwError(() => error);
      }),
      finalize(() => {
        this.stopLoader();
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      const token = this.tokenService.getRefreshToken();
      const formdata: any = {
        username: 'premkumar@codelantic.com',
        password: 'Test_1user',
        grantType: 'Agent Customer',
        refreshToken: token,
      };

      if (token)
        return this.authService.refreshToken(formdata).pipe(
          switchMap((token: any) => {
            this.isRefreshing = false;

            this.tokenService.saveToken(token['jwttoken']);

            this.dataService.isLoggedIn = true;
            localStorage.setItem('isToken', 'true');
            this.refreshTokenSubject.next(token['jwttoken']);

            return next.handle(this.addTokenHeader(request, token['jwttoken']));
          }),
          catchError((err) => {
            this.isRefreshing = false;

            // this.tokenService.signOut();
            this.handleLogout();
            return throwError(() => new Error(err));
          })
        );
    }
    return this.refreshTokenSubject.pipe(
      filter((token) => token !== null),
      take(1),
      switchMap((token) => next.handle(this.addTokenHeader(request, token)))
    );
  }

  stopLoader() {
    this.request--;
    if (this.request <= 0) {
      this.commonService.hideLoading();
    }
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({
      headers: request.headers.set('Authorization', 'Bearer ' + token),
    });
  }

  private handleLogout() {
    this.clearStorage();
    this.dataService.isLoggedIn = false;
    this.router.navigate(['']); // Redirect to the login page
  }

  private clearStorage() {
    localStorage.clear();
    sessionStorage.clear();
    this.tokenService.clearToken();
  }
}
