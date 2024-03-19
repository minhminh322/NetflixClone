import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DataService } from '../../../../shared/services/data.service';
import { SignUpUser, User } from '../../../../shared/interfaces/user.interface';
import { AuthService } from '../../../../shared/services/auth.service';

export interface MoviePlan {
  option: string;
  basic: string;
  standard: string;
  premium: string;
}

const moviePlan: MoviePlan[] = [
  {
    option: 'Monthly Price',
    basic: '$9.99',
    standard: '$15.49',
    premium: '$19.99',
  },
  {
    option: 'Video Quality',
    basic: 'Good',
    standard: 'Better',
    premium: 'Best',
  },
  {
    option: 'Resolution',
    basic: '480p',
    standard: '1080p',
    premium: '4k + HDR',
  },
  {
    option: 'Watch on your Tv, computer, mobile phone and tablet',
    basic: 'true',
    standard: 'true',
    premium: 'true',
  },
];

@Component({
  selector: 'app-choose-plan',
  templateUrl: './choose-plan.component.html',
  styleUrl: './choose-plan.component.scss',
})
export class ChoosePlanComponent {
  userData!: SignUpUser;
  user!: User;
  choosePlanControl = new FormControl();
  displayedColumns: string[] = ['option', 'basic', 'standard', 'premium'];
  dataSource = new MatTableDataSource<MoviePlan>(moviePlan);
  constructor(
    private dataService: DataService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.dataService.getSignUpData().subscribe((data) => {
      this.userData = data;
    });
    this.authService.user.subscribe((user) => {
      this.user = user;
    });
  }
  onSubmit() {
    if (this.user) {
      const user: SignUpUser = {
        username: this.user.username,
        email: this.user.email,
        password: 'password123', // TODO: Change this to the user's password
        role: this.choosePlanControl.value,
        tmdb_key: this.user.tmdb_key,
      };
      this.authService.updateUser(user).subscribe((response) => {
        alert('User updated successfully');
      });
      this.router.navigate(['/']);
    } else {
      this.userData.role = this.choosePlanControl.value;
      this.dataService.setSignUpData(this.userData);

      const user: SignUpUser = {
        username: this.userData.username,
        email: this.userData.email,
        password: this.userData.password,
        role: this.userData.role,
        tmdb_key: this.userData.tmdb_key,
      };
      this.authService.signup(user).subscribe((response) => {
        alert('User created successfully');
      });

      this.router.navigate(['/login']);
    }
  }
}
