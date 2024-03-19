import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import { Observable, debounceTime, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ValidatorsService {
  constructor(private http: HttpClient) {}

  passwordMatch = (group: FormGroup): ValidationErrors | null => {
    const password = group.get('pwd');
    const confirmPassword = group.get('confirm');
    if (password?.value !== confirmPassword?.value) {
      return { passwordNotMatch: true };
    }
    return null;
  };

  checkEmail = (
    control: AbstractControl
  ): Observable<ValidationErrors | null> => {
    const url = 'http://localhost:4231/auth/check-email';
    return this.http.post(url, { email: control.value }).pipe(
      debounceTime(500),
      map((response: any) => {
        if (response) {
          return { emailTaken: true };
        }
        return null;
      })
    );
  };
}
