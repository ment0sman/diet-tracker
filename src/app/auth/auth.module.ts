import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { LoginPageComponent } from './containers/login-page.component';
import { LoginFormComponent } from './components/login-form.component';

import { ClarityModule, ClrFormsNextModule } from '@clr/angular';

import * as firebase from 'firebase';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { environment } from '../../environments/environment';

import { AuthEffects } from './effects/auth.effects';
import { reducers } from './reducers';

import { AuthRoutingModule } from './auth-routing.module';

export const COMPONENTS = [LoginPageComponent, LoginFormComponent];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ClarityModule,
    ClrFormsNextModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([AuthEffects])
  ],
  declarations: COMPONENTS
})
export class AuthModule {}
