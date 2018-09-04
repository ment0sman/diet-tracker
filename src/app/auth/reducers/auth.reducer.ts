import { AuthFirebaseActions, AuthActions } from '../actions';
import { User } from '../models/User';

export interface State {
  user: User | null;
}

export const initialState: State = {
  user: null
};

export function reducer(
  state = initialState,
  action:
    | AuthFirebaseActions.AuthFirebaseActionsUnion
    | AuthActions.AuthActionsUnion
): State {
  switch (action.type) {
    case AuthFirebaseActions.AuthFirebaseActionTypes.LoginSuccess: {
      return {
        ...state,
        user: action.payload.user
      };
    }

    case AuthActions.AuthActionTypes.Logout: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}

// projecting state prop
export const getUser = (state: State) => state.user;
