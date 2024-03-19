import { Component } from '@angular/core';
import { MoviesService } from '../../../../shared/services/movies.service';
import { Observable } from 'rxjs';
import { Movie } from '../../../../shared/interfaces/movie.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss',
})
export class MovieListComponent {
  public movies!: Movie[];
  public page: number = 1;

  constructor(
    private activatedRoute: ActivatedRoute,
    private movieService: MoviesService
  ) {}
  ngOnInit() {
    // this.movies$ = this.movieService.movieList$;
    // this.movieService.getMovies().subscribe();
    this.activatedRoute.data.subscribe((data) => {
      this.movies = data['movies']['results'];
    });
    // this.movies = this.activatedRoute.snapshot.data['movies']['results'];
  }

  fetchMovies() {
    console.log('Fetching ... ', this.page);
    this.movieService.getMovies(this.page).subscribe((data) => {
      this.movies = [...this.movies, ...data['results']];
      this.page++;
    });
  }
}
