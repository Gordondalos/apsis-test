import { dashboardState, IDashboardState } from '../state/dashboard.state';
import { ECurrentDashboardActions } from '../actions/current-dashboard.actions';
import { EDashboardItemActions } from '../actions/dashboard-item.actions';

export const currentDashBoardNode = 'main'

export const currentDashBoardReducer = (state = dashboardState, action: any): IDashboardState => {

  switch (action.type) {

    case EDashboardItemActions.dashboardItemChangeAction: {
      return {
        ...state,
      };
    }

    case EDashboardItemActions.widgetTitleChangeAction: {
      return {
        ...state,
      };
    }

    case ECurrentDashboardActions.createCurrentDashboard:
      return {
        ...action.payload
      };
    case ECurrentDashboardActions.updateCurrentDashboard:
      return {
        ...action.payload
      };
    case ECurrentDashboardActions.updateCurrentDashboardTitle:
      return {
        ...state,
        title: action.payload
      };
    case ECurrentDashboardActions.deleteCurrentDashboard:
      return {};
    default:
      return state;
  }
};
