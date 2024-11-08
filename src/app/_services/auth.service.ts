import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CommonService } from './common.service';
import { Router } from '@angular/router';
import { TokenService } from './token.service';
import { BehaviorSubject, Observable, catchError, from, map } from 'rxjs';
import { user } from '../_models/users';
import { environment } from 'src/environments/environment';
import { DataService } from './shared-data/data.service';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import {
  Auth,
  createUserWithEmailAndPassword,
  updateProfile,
} from '@angular/fire/auth';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public currentUser!: Observable<any>;

  private firebaseAuth = inject(Auth);
  private firebaseService = inject(FirebaseService);
  private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  constructor(
    private http: HttpClient,
    private commonService: CommonService,
    private router: Router,
    private tokenStorage: TokenService,
    private dataService: DataService
  ) {
    onAuthStateChanged(this.firebaseAuth, (user) => {
      if (user) {
        this.currentUserSubject.next(user);
        console.log('Current user:', user); // Log current user when logged in
        console.log('User ID (UID):', user.uid);
        this.dataService.setLoggedUserId(user.uid); // Set UID in DataService; // Set isLoggedIn value in shared service
      } else {
        this.currentUserSubject.next(null);
        console.log('No user logged in'); // Log when no user is logged in
        this.dataService.setLoggedUserId(null);
      }
    });

    this.currentUser = this.currentUserSubject.asObservable();
    console.log('new current user', this.currentUser);
  }

  public get currentUserValue(): user {
    return this.currentUserSubject?.value;
  }

  register(
    email: string,
    username: string,
    password: string
  ): Observable<void> {
    const promise = createUserWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then((response) =>
      updateProfile(response.user, { displayName: username })
    );
    return from(promise);
  }

  // Login user with Firebase Authentication
  login(email: string, password: string): Observable<any> {
    const promise = signInWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    );
    signInWithEmailAndPassword(this.firebaseAuth, email, password).then(
      () => {}
    );
    return from(promise);
  }

  //login user
  // login(data: any) {
  //   const url = environment.authenticate;
  //   return this.http.post<user>(url, data).pipe(
  //     map((user: any) => {
  //       return user;
  //     }),
  //     catchError((err) => {
  //       return this.commonService.catchError(err);
  //     })
  //   );
  // }

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
function then(arg0: (userCredential: any) => any) {
  throw new Error('Function not implemented.');
}
