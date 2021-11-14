import { IAppState } from '../state/app.state';
import { createSelector } from '@ngrx/store';

export const teamsSelector = (state: IAppState) => {
  return state.main.teams;
};

export const teams = createSelector(
  teamsSelector,
  state => {
    return state;
  }
);

