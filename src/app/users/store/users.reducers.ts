import { Action, createReducer, on } from '@ngrx/store';
import { AppStateInterface } from '../../interfaces/app-state.interface';
import { updateAllFailureAction, updateAllUsersAction, updateAllUsersSuccessAction } from './users.actions';
import { UserInterface } from '../../interfaces/user.interface';


const initialUsersState:  AppStateInterface['users'] = [];


const usersReducers = createReducer(
  initialUsersState,
  on(
    updateAllUsersAction,
    (state): UserInterface[] => state
  ),
  on(
    updateAllUsersSuccessAction,
    (state, action): UserInterface[] => {
      if (action.payload) {
        return [...action.payload];
      }
      return state;
    }
  ),
on(
  updateAllFailureAction,
  (state, errors): UserInterface[] => ({
    ...state,
  })
)
);

export function reducers(state: UserInterface[], action: Action) {
  return usersReducers(state, action);
}

