import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../interfaces/user.interface';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  user!: User;
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.authService.user.subscribe((user) => {
      // console.log('NavBarComponent', user);
      this.user = user;
    });
  }

  signOut() {
    this.authService.signOut();
    this.router.navigate(['/home']);
  }
}
