import { IAppState } from '../state/app.state';
import { createSelector } from '@ngrx/store';
import { IDashboardState } from '../state/dashboard.state';

export const teamsSelector = (state: IAppState) => {
  return state.main;
};

export const teams = createSelector(
  teamsSelector,
  (state: IDashboardState) => {
    return state.teams;
  }
);

