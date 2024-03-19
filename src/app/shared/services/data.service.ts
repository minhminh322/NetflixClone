import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SignUpUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private loading$ = new BehaviorSubject<boolean>(false);
  private signUpData = new BehaviorSubject<SignUpUser>({} as SignUpUser); // Provide an initial value of type 'SignUpUser'
  constructor() {}

  getLoading() {
    return this.loading$.asObservable();
  }

  setLoading(value: boolean) {
    this.loading$.next(value);
  }

  getSignUpData() {
    return this.signUpData.asObservable();
  }

  setSignUpData(data: SignUpUser) {
    this.signUpData.next(data);
  }
}
