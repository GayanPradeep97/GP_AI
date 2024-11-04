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
import { AuthService } from 'src/app/_services/auth.service';
import { CommonService } from 'src/app/_services/common.service';
import { DataService } from 'src/app/_services/shared-data/data.service';
import { TokenService } from 'src/app/_services/token.service';
import { environment } from 'src/environments/environment';

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

      // Log current isLoggedIn value before making the request
      console.log(
        'Before making request, isLoggedIn:',
        this.dataService.isLoggedIn
      );
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
          const token = this.tokenService.getRefreshToken();
          if (token) {
            return this.handle401Error(authReq, next);
          }

          this.handleLogout();
        }
        return throwError(() => error);
      }),
      finalize(() => {
        this.stopLoader();

        // Log current isLoggedIn value after the request is processed
        console.log(
          'After request is processed, isLoggedIn:',
          this.dataService.isLoggedIn
        );
      })
    );
  }
  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      const token = this.tokenService.getRefreshToken();
      const formdata: any = {
        username: 'user@mxpbx.com',
        password: 'Test_1user',
        grantType: 'Core Admin',
        refreshToken: token,
      };

      if (token)
        return this.authService.refreshToken(formdata).pipe(
          switchMap((token: any) => {
            this.isRefreshing = false;
            this.tokenService.saveToken(token['jwttoken']);
            localStorage.setItem('isToken', 'true');
            this.refreshTokenSubject.next(token['jwttoken']);
            return next.handle(this.addTokenHeader(request, token['jwttoken']));
          }),
          catchError((err) => {
            this.isRefreshing = false;

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
