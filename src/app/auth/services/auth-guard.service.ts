import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthFirebaseActions } from '../actions';
import * as fromAuth from '../reducers/index';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store<fromAuth.State>) {}

  canActivate(): Observable<boolean> {
    return this.store.pipe(
      select(fromAuth.getLoggedIn),
      map(authed => {
        if (!authed) {
          this.store.dispatch(new AuthFirebaseActions.LoginRedirect());
          return false;
        }

        return true;
      }),
      take(1)
    );
  }
}
