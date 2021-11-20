import { createAction, props } from '@ngrx/store';
import { TeamsActionTypes } from '../../interfaces/teams.action-types';
import { TeamInterface } from '../../interfaces/team.interface';


export const updateAllTeamsAction = createAction(TeamsActionTypes.UPDATE_TEAMS);

export const loadTeamsAction = createAction(TeamsActionTypes.LOAD_TEAMS);

export const updateAllTeamsSuccessAction = createAction(TeamsActionTypes.UPDATE_TEAMS_SUCCESS,
  props<{payload: TeamInterface[]}>(),
);

export const updateAllTeamsFailureAction = createAction(TeamsActionTypes.UPDATE_TEAMS_FAILURE,
  props<{errors: any}>(),
);
