import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from '../login/login.component';
import { HomeComponent } from '../home/home.component';

import { AuthGuard } from '../services/auth-guard.service';

export const router: Routes = [

  {
    path: '',
    component: LoginComponent
  },
  {
      path: 'home',
      canActivate: [AuthGuard],
      component: HomeComponent
  }

];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
