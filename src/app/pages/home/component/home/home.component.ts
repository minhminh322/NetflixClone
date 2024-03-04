import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MoviesService } from '../../../../shared/movies.service';
import { Observable } from 'rxjs';
import { Movie } from '../../../../shared/movie.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
}
