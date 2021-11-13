import { IAppState } from '../state/app.state';
import { createSelector } from '@ngrx/store';
import { IDashboardState } from '../state/dashboard.state';

export const currentDashboardSelector = (state: IAppState) => {
  return state['main'];
};


export const selectCurrentDashboard = createSelector(
  currentDashboardSelector,
  (state: IDashboardState) => {
    return state;
  }
);


