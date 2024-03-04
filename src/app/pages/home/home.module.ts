import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';
import { HomeComponent } from './component/home/home.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MovieListComponent } from './component/movie-list/movie-list.component';
import { MovieItemComponent } from './component/movie-item/movie-item.component';

@NgModule({
  declarations: [
    NavBarComponent,
    HomeComponent,
    MovieListComponent,
    MovieItemComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  exports: [HomeComponent, NavBarComponent],
})
export class HomeModule {}
