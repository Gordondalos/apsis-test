import { IAppState } from '../state/app.state';
import { currentDashBoardNode } from '../reducers/dashboard.reducers';
import { createSelector } from '@ngrx/store';
import { IDashboardState } from '../state/dashboard.state';

export const currentDashboardSelector = (state: IAppState) => {
  return state[currentDashBoardNode];
};


export const selectCurrentDashboard = createSelector(
  currentDashboardSelector,
  (state: IDashboardState) => {
    return state;
  }
);


