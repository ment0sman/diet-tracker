import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap, switchMap } from 'rxjs/operators';
import {
  LoginPageActions,
  AuthActions,
  AuthFirebaseActions
} from '../actions/index';
import { Creds, User } from '../models/User';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthEffects {
  constructor(
    private authService: AuthService,
    private actions$: Actions,
    private router: Router
  ) {}

  @Effect()
  login$ = this.actions$.pipe(
    ofType<LoginPageActions.Login>(LoginPageActions.LoginPageActionTypes.Login),
    map(action => action.payload.credentials),
    // using exhaustMap here is important
    // we don't want to send multiple reqs to the fireBase
    // if the user clicks on the login button more than once
    exhaustMap((auth: Creds) =>
      this.authService.signInRegular(auth).pipe(
        map(() => this.authService.currentUser()),
        map((user: User) => new AuthActions.GetUser()),
        catchError(error => of(new AuthFirebaseActions.LoginFailure({ error })))
      )
    )
  );

  // we need dispatch: false on anything that is a non returned action
  // such as navigating to a route
  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$.pipe(
    ofType(
      AuthFirebaseActions.AuthFirebaseActionTypes.LoginRedirect,
      AuthActions.AuthActionTypes.Logout
    ),
    tap(authed => {
      this.router.navigate(['/login']);
    })
  );

  @Effect({ dispatch: false })
  loginSuccesful$ = this.actions$.pipe(
    ofType(AuthFirebaseActions.AuthFirebaseActionTypes.LoginSuccess),
    tap(() => {
      this.router.navigate(['/home']);
    })
  );

  @Effect()
  getUser$ = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.GetUser),
    map((action: AuthActions.GetUser) => action.payload),
    switchMap(() => this.authService.currentUser()),
    map(auth => {
      if (auth) {
        const user = new User(auth.uid, auth.email, auth.displayName);
        return new AuthFirebaseActions.LoginSuccess({ user });
        // }else{
        // return new AuthFirebaseActions.NotAuthenticated()
      }
    })
  );
}
