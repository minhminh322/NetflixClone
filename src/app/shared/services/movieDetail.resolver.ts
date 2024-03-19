import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { MoviesService } from './movies.service';
import { Observable, of, tap } from 'rxjs';
import { DataService } from './data.service';

@Injectable({ providedIn: 'root' })
export class MovieDetailResolver implements Resolve<boolean> {
  constructor(
    private moviesService: MoviesService,
    private dataService: DataService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    this.dataService.setLoading(true);
    const id = route.paramMap.get('id');
    if (!id) return of(null);

    return this.moviesService
      .getMovieById(id)
      .pipe(tap(() => this.dataService.setLoading(false)));
  }
}
