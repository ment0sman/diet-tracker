import { Action } from '@ngrx/store';
import { Creds } from '../models/User';

export enum LoginPageActionTypes {
  Login = '[Login Page] Login'
}

export class Login implements Action {
  readonly type = LoginPageActionTypes.Login;
  constructor(public payload: { credentials: Creds }) {}
}

export type LoginPageActionsUnion = Login;
