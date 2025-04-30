import { Routes } from '@angular/router';

import { authGuard } from './auth/auth.guard';

import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';

export const routes: Routes = [{
  path: 'login',
  component: LoginComponent
}, {
  path: '',
  component: MainComponent,
  canActivate: [authGuard],
}, {
  path: '**', redirectTo: ''
}];
