import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DataService } from '../../../../shared/services/data.service';
import { Router } from '@angular/router';
import { SignUpUser } from '../../../../shared/interfaces/user.interface';

@Component({
  selector: 'app-add-key',
  templateUrl: './add-key.component.html',
  styleUrl: './add-key.component.scss',
})
export class AddKeyComponent {
  form!: FormGroup;
  userData!: SignUpUser;

  get username(): FormControl {
    return this.form.get('username') as FormControl;
  }
  get tmdb_key(): FormControl {
    return this.form.get('tmdb_key') as FormControl;
  }

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      username: '',
      tmdb_key: '',
    });

    this.dataService.getSignUpData().subscribe((data) => {
      this.userData = data;
    });
  }

  onSubmit() {
    // console.log('AddKeyComponent', this.username.value, this.apiKey.value);
    if (this.form.valid) {
      this.userData.username = this.username.value;
      this.userData.tmdb_key = this.tmdb_key.value;
      this.dataService.setSignUpData(this.userData);
      this.router.navigate(['register/choosePlan']);
    } else {
      console.log('Form is invalid');
    }
  }
}
