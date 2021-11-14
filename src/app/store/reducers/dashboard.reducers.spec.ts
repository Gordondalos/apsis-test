import { currentDashBoardReducer } from './dashboard.reducers';
import { ETeamsActions } from '../actions/teams.actions';
import { dashboardState } from '../state/dashboard.state';
import { EUsersActions } from '../actions/users.actions';


describe('dashboard reducers', () => {
  it('should update teams', () => {
    const action = {
      type: ETeamsActions.updateTeamsAction,
      payload: [{name: 'Kola'}]
    };
    const res =  currentDashBoardReducer(dashboardState, action);
    expect(res.teams.length).toBe(1);
  });

  it('should update users', () => {
    const action = {
      type: EUsersActions.updateUsersAction,
      payload: [{name: 'Kola'}]
    };
    const res =  currentDashBoardReducer(dashboardState, action);
    expect(res.users.length).toBe(1);
  });

  it('should return return state', () => {
    const action = {
      // type: EUsersActions.updateUsersAction,
      payload: [{name: 'Kola'}]
    };
    const res =  currentDashBoardReducer(dashboardState, action);
    expect(res).toBeTruthy();
  });


});
