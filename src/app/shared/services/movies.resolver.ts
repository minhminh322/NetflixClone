import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { MoviesService } from './movies.service';
import { Observable, tap } from 'rxjs';
import { DataService } from './data.service';

@Injectable({ providedIn: 'root' })
export class MoviesResolver implements Resolve<boolean> {
  constructor(
    private moviesService: MoviesService,
    private dataService: DataService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    this.dataService.setLoading(true);

    return this.moviesService
      .getMovies(1)
      .pipe(tap(() => this.dataService.setLoading(false)));
  }
}
