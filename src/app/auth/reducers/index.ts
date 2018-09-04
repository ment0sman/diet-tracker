import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap,
  select
} from '@ngrx/store';

import * as fromRoot from '../../reducers';
import * as fromAuth from '../reducers/auth.reducer';
import * as fromLoginPage from '../reducers/login-page.reducer';

import { AuthFirebaseActions } from '../actions/';

// what our auth feature state looks like
// and what we will expose to the rest of hte app
export interface AuthState {
  status: fromAuth.State;
  loginPage: fromLoginPage.State;
}

// merging this feature reducer state with the one from root
export interface State extends fromRoot.State {
  auth: AuthState;
}

export const reducers: ActionReducerMap<
  AuthState,
  AuthFirebaseActions.AuthFirebaseActionsUnion
> = {
  status: fromAuth.reducer,
  loginPage: fromLoginPage.reducer
};

export const selectAuthState = createFeatureSelector<State, AuthState>('auth');

export const selectAuthStatusState = createSelector(
  selectAuthState,
  (state: AuthState) => state.status
);

export const selectLoginPageState = createSelector(
  selectAuthState,
  (state: AuthState) => state.loginPage
);

export const getUser = createSelector(selectAuthStatusState, fromAuth.getUser);

export const getLoggedIn = createSelector(getUser, user => !!user);

export const getLoginPageError = createSelector(
  selectLoginPageState,
  fromLoginPage.getError
);

export const getLoginPagePending = createSelector(
  selectLoginPageState,
  fromLoginPage.getPending
);
