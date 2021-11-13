import { Action } from '@ngrx/store';
import { TeamInterface } from '../../interfaces/team.interface';

export enum ETeamsActions {
  updateTeamsAction = '[Teams Change] user change teams',
}

export class AllTeamsAction implements Action {
  readonly type = ETeamsActions.updateTeamsAction;
  constructor(public payload: TeamInterface[]) {
  }
}


export type TeamsActions = AllTeamsAction

