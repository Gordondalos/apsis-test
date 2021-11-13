import { RouterReducerState } from '@ngrx/router-store';
import { dashboardState, IDashboardState } from './dashboard.state';

export interface IAppState {
  router?: RouterReducerState;
  main: IDashboardState;
}


export const appState: IAppState = {
  main: dashboardState
};

export function getInitialState(): IAppState {
  return appState;
}
