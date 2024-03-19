import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { SignInUser, SignUpUser, User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = `http://localhost:4231/auth`;
  public userSubject!: BehaviorSubject<User>;
  public user: Observable<User>;
  constructor(private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User>({} as User);
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  // TODO: declare a baseUrl here

  signup({ username, email, password, role, tmdb_key }: SignUpUser) {
    const url = [this.baseUrl, 'signup'].join('/');
    const body = {
      username: username,
      password: password,
      email: email,
      role: role,
      tmdb_key: tmdb_key,
    };
    return this.http.post(url, body).pipe((response: any) => {
      return response;
    });
  }

  updateUser({ username, email, password, role, tmdb_key }: SignUpUser) {
    const url = [this.baseUrl, 'userupdate'].join('/');
    const body = {
      username: username,
      password: password,
      email: email,
      role: role,
      tmdb_key: tmdb_key,
    };
    return this.http.patch<SignInUser>(url, body).pipe(
      map((response: SignInUser) => {
        const user: User = {
          id: response.user.id,
          username: response.user.username,
          email: response.user.email,
          accessToken: response.accessToken,
          role: response.user.role,
          tmdb_key: response.user.tmdb_key,
        };
        console.log('Update user', user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.userSubject.next(user);
        this.startRefreshTokenTimer();
        return user;
      })
    );
  }

  signIn(email: string, password: string) {
    const url = [this.baseUrl, 'signin'].join('/');
    const body = {
      email: email,
      password: password,
    };
    return this.http.post<SignInUser>(url, body).pipe(
      map((response: SignInUser) => {
        // TODO: Implement decode token
        const user: User = {
          id: response.user.id,
          username: response.user.username,
          email: response.user.email,
          accessToken: response.accessToken,
          role: response.user.role,
          tmdb_key: response.user.tmdb_key,
        };
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.userSubject.next(user);
        this.startRefreshTokenTimer();
        return user;
      })
    );
  }

  signOut() {
    localStorage.removeItem('currentUser');
    this.userSubject.next({} as User);
    this.stopRefreshTokenTimer();
  }

  refreshToken() {
    const url = [this.baseUrl, 'refresh-token'].join('/');
    const user = JSON.parse(
      localStorage.getItem('currentUser') || '{}'
    ) as User;

    const body = {
      id: user?.id,
      username: user?.username,
      email: user?.email,
      role: user?.role,
      tmdb_key: user?.tmdb_key,
    };
    return this.http.post<SignInUser>(url, body).pipe(
      map((response: SignInUser) => {
        const user: User = {
          id: response.user.id,
          username: response.user.username,
          email: response.user.email,
          accessToken: response.accessToken,
          role: response.user.role,
          tmdb_key: response.user.tmdb_key,
        };
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.userSubject.next(user);
        this.startRefreshTokenTimer();
        return user;
      })
    );
  }
  // helper methods

  private refreshTokenTimeout: any;

  private startRefreshTokenTimer() {
    // parse json object from base64 encoded jwt token
    // const jwtToken = JSON.parse(atob(this.userValue.jwtToken.split('.')[1]));
    // // set a timeout to refresh the token a minute before it expires
    // const expires = new Date(jwtToken.exp * 1000);
    // const timeout = expires.getTime() - Date.now() - (60 * 1000);
    // this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }
}
