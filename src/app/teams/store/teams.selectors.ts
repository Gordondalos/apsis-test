import { AppStateInterface } from '../../interfaces/app-state.interface';
import { TeamInterface } from '../../interfaces/team.interface';
import { createSelector } from '@ngrx/store';


export const baseSelector = (state: AppStateInterface): TeamInterface[] => {
  return state.teams;
};

export const teamsSelector = createSelector(
  baseSelector,
  (teams: TeamInterface[]): TeamInterface[] => teams,
);
