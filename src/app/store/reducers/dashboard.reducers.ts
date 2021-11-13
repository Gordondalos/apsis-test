import { dashboardState, IDashboardState } from '../state/dashboard.state';
import { ETeamsActions } from '../actions/teams.actions';
import { EUsersActions } from '../actions/users.actions';


export const currentDashBoardReducer = (state = dashboardState, action: any): IDashboardState => {

  switch (action.type) {

    case ETeamsActions.updateTeamsAction: {
      return {
        ...state,
        teams: [...action.payload]
      };
    }
    case EUsersActions.updateUsersAction: {
      return {
        ...state,
        users: [...action.payload]
      };
    }
    default:
      return state;
  }
};
