import { Action } from '@ngrx/store';
import { UserInterface } from '../../interfaces/user.interface';

export enum EUsersActions {
  updateUsersAction = '[Users Change] user change user list',
}

export class AllUsersAction implements Action {
  readonly type = EUsersActions.updateUsersAction;
  constructor(public payload: UserInterface[]) {
  }
}


export type UsersActions = AllUsersAction

