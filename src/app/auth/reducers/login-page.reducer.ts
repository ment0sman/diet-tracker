import { AuthFirebaseActions, LoginPageActions } from '../actions';

export interface State {
  error: string | null;
  pending: boolean;
}

export const initialState: State = {
  error: null,
  pending: false
};

export function reducer(
  state = initialState,
  action:
    | AuthFirebaseActions.AuthFirebaseActionsUnion
    | LoginPageActions.LoginPageActionsUnion
): State {
  switch (action.type) {
    case LoginPageActions.LoginPageActionTypes.Login: {
      return {
        ...state,
        error: null,
        pending: true
      };
    }
    case AuthFirebaseActions.AuthFirebaseActionTypes.LoginSuccess: {
      return {
        ...state,
        error: null,
        pending: false
      };
    }

    case AuthFirebaseActions.AuthFirebaseActionTypes.LoginFailure: {
      return {
        ...state,
        error: action.payload.error,
        pending: false
      };
    }

    default: {
      return state;
    }
  }
}

// projections of state
export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
