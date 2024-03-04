import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/component/home/home.component';
import { LoginComponent } from './pages/login/component/login/login.component';
import { RegisterComponent } from './pages/register/component/register/register.component';
import { AddKeyComponent } from './pages/register/component/add-key/add-key.component';
import { ChoosePlanComponent } from './pages/register/component/choose-plan/choose-plan.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'register',
    children: [
      { path: '', component: RegisterComponent },
      { path: 'addKey', component: AddKeyComponent },
      { path: 'choosePlan', component: ChoosePlanComponent },
    ],
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
