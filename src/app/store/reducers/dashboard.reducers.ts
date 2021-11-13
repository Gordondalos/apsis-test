import { dashboardState, IDashboardState } from '../state/dashboard.state';
import { ECurrentDashboardActions } from '../actions/current-dashboard.actions';
import { ETeamsActions } from '../actions/teams.actions';


export const currentDashBoardReducer = (state = dashboardState, action: any): IDashboardState => {

  switch (action.type) {

    case ETeamsActions.updateTeamsAction:{
      return {
        ...state,
        teams: [...action.payload]
      };
    }

    // case ECurrentDashboardActions.updateCurrentDashboard:
    //   return {
    //     ...action.payload
    //   };
    // case ECurrentDashboardActions.updateCurrentDashboardTitle:
    //   return {
    //     ...state,
    //     title: action.payload
    //   };
    // case ECurrentDashboardActions.deleteCurrentDashboard:
    //   return {};
    default:
      return state;
  }
};
