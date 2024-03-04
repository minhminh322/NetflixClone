import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Movie, MovieResponse } from './movie.interface';

@Injectable()
export class MoviesService {
  private readonly baseUrl = 'https://api.themoviedb.org/3/';
  private apiKey = 'db5a07bd3847c12e9b74c6543c7cca81';
  movieList$ = new Subject<Movie[]>();
  constructor(private http: HttpClient) {}

  getMovies(): Observable<MovieResponse> {
    return this.http
      .get<MovieResponse>(
        `${this.baseUrl}/discover/movie?api_key=${this.apiKey}`
      )
      .pipe(
        tap(({ results }) => {
          this.movieList$.next(results);
        })
      );
  }
}
