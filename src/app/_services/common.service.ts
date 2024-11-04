import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  service: any;
  test: any = null;

  private loading = new Subject();
  private transfesr = new BehaviorSubject<any>({ value: 0 });
  private newTransfer = new BehaviorSubject<any>({ value: 0 });
  constructor(private notification: NzNotificationService) {}

  // shareDataSubject = new Subject<any>(); //Decalring new RxJs Subject
  //
  // sendDataToOtherComponent(somedata) {
  //   // console.log('sendDataToOtherComponent >>> ', somedata);
  //   this.shareDataSubject.next(somedata);
  // }

  showLoading() {
    // console.log('showLoading method >>>>>>> ');
    this.loading.next({ status: true });
  }

  hideLoading() {
    // console.log('hideLoading method >>>>>>> ');
    this.loading.next({ status: false });
  }

  public getLoadingStatus(): Observable<any> {
    // console.log('getLoadingStatus Observable >>>>>>> ');
    return this.loading.asObservable();
  }

  // setTransfersCount(data) {
  //   this.transfesr.next({value: data});
  // }

  // public getTransfersCount() {
  //   return this.transfesr.asObservable();
  // }

  // setNewTransfersCount(data) {
  //   this.newTransfer.next({value: data});
  // }

  // public getNewTransfersCount() {
  //   return this.newTransfer.asObservable();
  // }

  parseJwt(token: any) {
    // console.log('token >>>>> ', token);
    if (token) {
      const base64Url = token.split('.')[1];
      // console.log('base64Url >>>>> ', base64Url);

      const base64 = decodeURIComponent(
        atob(base64Url)
          .split('')
          .map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join('')
      );
      return JSON.parse(base64);
    }
  }

  catchError(error: any): Observable<Object> {
    if (error.status === 401 || error.status === 0) {
      // TODO address unauthorised access
      // console.log('Server connection error, Contact system administrator -- ', error.status);
      // this.notify.error('Error', 'Server connection error, Contact system administrator', this.notifyConf);
    } else if (error.status === 400) {
      error.error.errors.forEach((err: any) => {
        this.notification.create('error', 'Input Error', err);
      });
    } else if (error.status === 404) {
      // TODO token setting
      // console.log('Server connection error, Contact system administrator -- ', error.status);
      // this.notify.error('Error', 'Server connection error, Contact system administrator', this.notifyConf);
    } else if (error.status === 500) {
      // TODO handel 500
      // console.log('Server connection error, Contact system administrator -- ', error.status);
      // this.notify.error('Error', 'Server connection error, Contact system administrator', this.notifyConf);
    } else if (error.status === 504) {
      // TODO handel 504
      // console.log('Server connection error, Contact system administrator -- ', error.status);
      // this.notify.error('Error', 'Server connection error, Contact system administrator', this.notifyConf);
    }
    this.hideLoading();
    // return Observable.throw(error);
    return throwError(error);
  }
}
