import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import {
  MovieTrailer,
  MovieTrailerResponse,
} from '../../../../shared/interfaces/movie.interface';
import { MoviesService } from '../../../../shared/services/movies.service';

@Component({
  selector: 'app-movie-trailer',
  templateUrl: './movie-trailer.component.html',
  styleUrl: './movie-trailer.component.scss',
})
export class MovieTrailerComponent {
  trailerList: MovieTrailer[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: string },
    private moviesService: MoviesService
  ) {}

  ngOnInit() {
    this.moviesService
      .getMovieTrailer(this.data.id)
      .subscribe((trailer: MovieTrailerResponse) => {
        this.trailerList = trailer.results;
      });
  }
}
