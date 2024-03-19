import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { RouterModule, Routes } from '@angular/router';
import { AddKeyComponent } from './component/add-key/add-key.component';
import { ChoosePlanComponent } from './component/choose-plan/choose-plan.component';
import { SharedModule } from '../../shared/shared.module';
import { SignUpComponent } from './component/sign-up/sign-up.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: SignUpComponent },
      { path: 'addKey', component: AddKeyComponent },
      { path: 'choosePlan', component: ChoosePlanComponent },
    ],
  },
];

@NgModule({
  declarations: [
    RegisterComponent,
    AddKeyComponent,
    ChoosePlanComponent,
    SignUpComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
})
export class RegisterModule {}
