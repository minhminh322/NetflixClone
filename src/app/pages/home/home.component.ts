import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MoviesService } from '../../shared/services/movies.service';
import { Observable } from 'rxjs';
import { Movie } from '../../shared/interfaces/movie.interface';
import { User } from '../../shared/interfaces/user.interface';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  user!: User;
  email = new FormControl('', [Validators.required, Validators.email]);

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.authService.user.subscribe((user) => {
      this.user = user;
    });
  }
}
