import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './component/register/register.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AddKeyComponent } from './component/add-key/add-key.component';
import { ChoosePlanComponent } from './component/choose-plan/choose-plan.component';
import { HomeModule } from '../home/home.module';

@NgModule({
  declarations: [RegisterComponent, AddKeyComponent, ChoosePlanComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    HomeModule,
  ],
})
export class RegisterModule {}
