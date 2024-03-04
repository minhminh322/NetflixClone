import { Component, Input } from '@angular/core';
import { Movie } from '../../../../shared/movie.interface';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrl: './movie-item.component.scss',
})
export class MovieItemComponent {
  @Input('movie') movie!: Movie;

  ngOnInit() {
    console.log(this.movie);
  }
}
