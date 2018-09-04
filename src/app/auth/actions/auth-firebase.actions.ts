import { Action } from '@ngrx/store';
import { User } from '../models/User';

export enum AuthFirebaseActionTypes {
  LoginSuccess = '[Auth/Firebase] Login Success',
  LoginFailure = '[Auth/Firebase] Login Failure',
  LoginRedirect = '[Auth/Firebase] Login Redirect'
}

export class LoginSuccess implements Action {
  readonly type = AuthFirebaseActionTypes.LoginSuccess;
  constructor(public payload: { user: User }) {}
}

export class LoginFailure implements Action {
  readonly type = AuthFirebaseActionTypes.LoginFailure;
  constructor(public payload: { error: any }) {}
}

// Not carrying a payload, just an action dispatcher for switching
// the route on the app. We are essentially keeping the route states in the store
// and not handling that manually, much better approach this way
export class LoginRedirect implements Action {
  readonly type = AuthFirebaseActionTypes.LoginRedirect;
}

export type AuthFirebaseActionsUnion =
  | LoginFailure
  | LoginRedirect
  | LoginSuccess;
