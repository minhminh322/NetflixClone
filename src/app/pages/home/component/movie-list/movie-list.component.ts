import { Component } from '@angular/core';
import { MoviesService } from '../../../../shared/movies.service';
import { Observable } from 'rxjs';
import { Movie } from '../../../../shared/movie.interface';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss',
})
export class MovieListComponent {
  movies$!: Observable<Movie[]>;

  constructor(private movieService: MoviesService) {}
  ngOnInit() {
    this.movies$ = this.movieService.movieList$;
    this.movieService.getMovies().subscribe();
  }
}
