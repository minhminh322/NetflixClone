import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import {
  Movie,
  MovieDetail,
  MovieResponse,
  MovieTrailerResponse,
} from '../interfaces/movie.interface';

@Injectable()
export class MoviesService {
  private readonly baseUrl = 'https://api.themoviedb.org/3/';
  private apiKey = 'db5a07bd3847c12e9b74c6543c7cca81'; // TODO: store the apiKey in env or backend
  movieList$ = new Subject<Movie[]>();
  constructor(private http: HttpClient) {}

  getMovies(pageNum: number): Observable<MovieResponse> {
    return this.http
      .get<MovieResponse>(
        `${this.baseUrl}/discover/movie?page=${pageNum}&api_key=${this.apiKey}`
      )
      .pipe(
        tap(({ results }) => {
          this.movieList$.next(results);
        })
      );
  }

  getMovieById(id: string): Observable<MovieDetail> {
    return this.http
      .get<MovieDetail>(
        `${this.baseUrl}/movie/${id}?language=en-US&api_key=${this.apiKey}`
      )
      .pipe(
        tap((movieDetail: MovieDetail) => {
          return movieDetail;
        })
      );
  }

  getMovieTrailer(id: string): Observable<MovieTrailerResponse> {
    return this.http
      .get<MovieTrailerResponse>(
        `${this.baseUrl}/movie/${id}/videos?language=en-US&api_key=${this.apiKey}`
      )
      .pipe(
        tap((movieTrailer: MovieTrailerResponse) => {
          return movieTrailer;
        })
      );
  }
}
