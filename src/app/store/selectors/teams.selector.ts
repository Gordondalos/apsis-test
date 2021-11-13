import { IAppState } from '../state/app.state';
import { createSelector } from '@ngrx/store';
import { IDashboardState } from '../state/dashboard.state';
import { TeamInterface } from '../../interfaces/team.interface';

export const teamsSelector = (state: IAppState) => {
  return state.main.teams;
};

export const teams = createSelector(
  teamsSelector,
  (state) => {
    return state;
  }
);

