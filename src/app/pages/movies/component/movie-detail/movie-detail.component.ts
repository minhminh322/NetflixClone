import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MovieDetail } from '../../../../shared/interfaces/movie.interface';
import { MoviesService } from '../../../../shared/services/movies.service';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { MovieTrailerComponent } from '../movie-trailer/movie-trailer.component';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.scss',
})
export class MovieDetailComponent {
  movieDetail!: MovieDetail;
  private sub = new Subscription();
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private moviesService: MoviesService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.sub = this.activatedRoute.data.subscribe((data) => {
      this.movieDetail = data['movieDetail'];
    });
    // this.sub = this.activatedRoute.paramMap.subscribe((params) => {
    //   const id = params.get('id');
    //   if (id) {
    //     this.moviesService.getMovieById(id).subscribe((movieDetail) => {
    //       console.log(movieDetail);
    //       this.movieDetail = movieDetail;
    //     });
    //   }
    // });
  }

  playTrailer() {
    this.dialog.open(MovieTrailerComponent, {
      data: {
        id: this.movieDetail.id,
      },
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
