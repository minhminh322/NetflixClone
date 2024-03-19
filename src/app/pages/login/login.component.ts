import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ValidatorsService } from '../../shared/services/validators.service';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  form!: FormGroup;
  hide = true;

  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }

  get pwd(): FormControl {
    return this.form.get('pwd') as FormControl;
  }

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit() {
    this.form = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
        ],
        // [this.validatorsService.checkEmail],
      ],
      pwd: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  onSubmit() {
    if (this.form.valid) {
      this.authService.signIn(this.email.value, this.pwd.value).subscribe({
        next: (value) => {
          // console.log('User is logged in', value);
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error(error);
        },
      });
    }
  }
}
