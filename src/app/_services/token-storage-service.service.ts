import { Injectable } from '@angular/core';

const TOKEN_KEY = '';
const REFRESHTOKEN_KEY = '';
const USER_KEY = 'auth-user';
const EMAIL = 'email';
const AGENT_EXPOSABLE_ID = 'AGENT_EXPOSABLE_ID';
const PersonalAndCorporate = '';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageServiceService {
  constructor() {}
  removeItem(): void {
    // window.sessionStorage.clear();
    window.sessionStorage.removeItem(TOKEN_KEY);
  }

  public saveToken(token: string): void {
    // window.sessionStorage.removeItem(TOKEN_KEY);
    // window.sessionStorage.setItem(TOKEN_KEY, token);

    window.sessionStorage.setItem(TOKEN_KEY, token);

    // const user = this.getUser();
    // if (user.id) {
    //   this.saveUser({ ...user, accessToken: token });
    // }
  }

  public getToken(): string | null {
    // return window.sessionStorage.getItem(TOKEN_KEY);
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveRefreshToken(token: string): void {
    window.sessionStorage.removeItem(REFRESHTOKEN_KEY);
    window.sessionStorage.setItem(REFRESHTOKEN_KEY, token);
  }

  public getRefreshToken(): string | null {
    return window.sessionStorage.getItem(REFRESHTOKEN_KEY);
  }

  public saveEmail(email: any): void {
    // window.sessionStorage.removeItem(USER_KEY);
    // window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    window.sessionStorage.removeItem(EMAIL);
    window.sessionStorage.setItem(EMAIL, email);
    // console.log('email >>>>> ', email);
  }
  public saveUser(user: any): void {
    // console.log('new user', user);
    // window.sessionStorage.removeItem(USER_KEY);
    // window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  public removeUser(): void {
    // window.sessionStorage.removeItem(USER_KEY);
    // window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    window.sessionStorage.removeItem(USER_KEY);
  }

  public getUser(): any {
    // const user = window.sessionStorage.getItem(USER_KEY);
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  public getEmail(): any {
    // const user = window.sessionStorage.getItem(USER_KEY);
    const email = window.sessionStorage.getItem(EMAIL);
    if (email) {
      return email;
    }
    return '';
  }

  signOut(): void {
    window.window.sessionStorage.clear();
    window.sessionStorage.clear();
  }

  saveAgentExposableId(data: any) {
    window.sessionStorage.setItem('AGENT_EXPOSABLE_ID', data);
  }
  getAgentExposable() {
    return window.sessionStorage.getItem('AGENT_EXPOSABLE_ID')!;
  }
}
