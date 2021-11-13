import { RouterReducerState } from '@ngrx/router-store';
import { currentDashBoardNode } from '../reducers/dashboard.reducers';
import { dashboardState, IDashboardState } from './dashboard.state';

export interface IAppState {
  router?: RouterReducerState;
  [currentDashBoardNode]: IDashboardState;
}


export const appState: IAppState = {
  [currentDashBoardNode]: dashboardState
};


export function getInitialState(): IAppState {
  return appState;
}
