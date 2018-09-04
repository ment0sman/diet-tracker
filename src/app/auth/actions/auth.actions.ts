import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  Logout = '[Auth] Logout',
  GetUser = '[Auth] GetUser'
}

// just the logout action dispatch, we are handling routes
// on the effects / store instead of manually :)
export class Logout implements Action {
  readonly type = AuthActionTypes.Logout;
}

export class GetUser implements Action {
  readonly type = AuthActionTypes.GetUser;
  constructor(public payload?: any) {}
}

export type AuthActionsUnion = Logout | GetUser;
