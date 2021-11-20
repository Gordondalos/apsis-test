import { Action, createReducer, on } from '@ngrx/store';
import { updateAllTeamsAction, updateAllTeamsFailureAction, updateAllTeamsSuccessAction } from './teams.actions';
import { TeamInterface } from '../../interfaces/team.interface';
import { AppStateInterface } from '../../interfaces/app-state.interface';

const initialUsersState: AppStateInterface['teams'] = [];

const teamsReducers = createReducer(
  initialUsersState,

  on(updateAllTeamsAction,
    (state): TeamInterface[] => state),

  on(updateAllTeamsSuccessAction,
    (state, action): TeamInterface[] => {
      if (action.payload) {
        return [...action.payload];
      }
      return state;

    }),

  on(updateAllTeamsFailureAction,
    (state, errors): TeamInterface[] => {
      return state;
    },
  ),
);

export function reducers(state: TeamInterface[], action: Action) {
  return teamsReducers(state, action);
}
