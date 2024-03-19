import { NgModule } from '@angular/core';
import { MoviesComponent } from './movies.component';
import { MovieListComponent } from './component/movie-list/movie-list.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MovieItemComponent } from './component/movie-item/movie-item.component';
import { SharedModule } from '../../shared/shared.module';
import { MovieDetailComponent } from './component/movie-detail/movie-detail.component';
import { MovieTrailerComponent } from './component/movie-trailer/movie-trailer.component';
import { YouTubePlayer } from '@angular/youtube-player';
import { AuthGuard } from '../../core/auth.guard';
import { MoviesResolver } from '../../shared/services/movies.resolver';
import { MovieDetailResolver } from '../../shared/services/movieDetail.resolver';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: MoviesComponent,
        resolve: { movies: MoviesResolver },
      },
      {
        path: ':id',
        component: MovieDetailComponent,
        resolve: { movieDetail: MovieDetailResolver },
      },
    ],
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [
    MoviesComponent,
    MovieListComponent,
    MovieItemComponent,
    MovieDetailComponent,
    MovieTrailerComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    YouTubePlayer,
    InfiniteScrollModule,
    RouterModule.forChild(routes),
  ],
  exports: [],
})
export class MoviesModule {}
