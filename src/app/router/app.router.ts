import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../home/home.component';

import { AuthGuard } from '../auth/services/auth-guard.service';

export const router: Routes = [
  {
    path: 'home',
    canActivate: [AuthGuard],
    component: HomeComponent
  }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
