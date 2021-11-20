import { createAction, props } from '@ngrx/store';
import { UserInterface } from '../../interfaces/user.interface';
import { UserActionTypes } from '../../interfaces/user.action-types';


export const updateAllUsersAction = createAction(UserActionTypes.UPDATE_USERS);

export const loadUserAction = createAction(UserActionTypes.LOAD_USERS);

export const updateAllUsersSuccessAction = createAction(
  UserActionTypes.UPDATE_SUCCESS,
  props<{ payload: UserInterface[] }>(),
);

export const updateAllFailureAction = createAction(
  UserActionTypes.UPDATE_FAILURE,
  props<{ errors: any }>(),
);





