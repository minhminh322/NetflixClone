import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorsService } from '../../../../shared/services/validators.service';
import { DataService } from '../../../../shared/services/data.service';
import { SignUpUser } from '../../../../shared/interfaces/user.interface';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  form!: FormGroup;
  hide = true;
  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }

  get password(): FormGroup {
    return this.form.get('password') as FormGroup;
  }

  get pwd(): FormControl {
    return this.password.get('pwd') as FormControl;
  }

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,
    private dataService: DataService,
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
        [this.validatorsService.checkEmail],
      ],
      password: this.fb.group(
        {
          pwd: ['', [Validators.required, Validators.minLength(6)]],
          confirm: '',
        },
        { validators: [this.validatorsService.passwordMatch] }
      ),
    });
  }

  onSubmit() {
    // console.log('RegisterComponent', this.email.value, this.pwd.value);
    if (this.form.valid) {
      this.dataService.setSignUpData({
        username: '',
        email: this.email.value,
        password: this.pwd.value,
        role: '',
        tmdb_key: '',
      } as SignUpUser);
      this.router.navigate(['register/addKey']);
    } else {
      console.log('Form is invalid');
    }
  }
}
