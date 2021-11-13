import { createSelector } from '@ngrx/store';
import { IDashboardState } from '../state/dashboard.state';
import { currentDashboardSelector } from './current-dashboard.selector';


export const dashboardItemSelect = (props: { id: string }) => createSelector(
  currentDashboardSelector,
  (state: IDashboardState) => {
    return state.config.find((item) => item.id === props.id);
  }
);

export const dashboardItems = () => createSelector(
  currentDashboardSelector,
  (state: IDashboardState) => {
    debugger
    return state.config;
  }
);

