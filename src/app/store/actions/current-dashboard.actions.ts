import { Action } from '@ngrx/store';
import { IDashboardState } from '../state/dashboard.state';


export enum ECurrentDashboardActions {
  createCurrentDashboard = '[CURRENT DASHBOARD] create',
  updateCurrentDashboard = '[CURRENT DASHBOARD] update',
  updateCurrentDashboardTitle = '[CURRENT DASHBOARD] update title',
  deleteCurrentDashboard = '[CURRENT DASHBOARD] delete',
}

export class CreateCurrentDashboard implements Action {
  readonly type = ECurrentDashboardActions.createCurrentDashboard;
  constructor(public payload: IDashboardState) {
  }
}

export class UpdateCurrentDashboard implements Action {
  readonly type = ECurrentDashboardActions.updateCurrentDashboard;
  constructor(public payload: IDashboardState) {
  }
}

export class DeleteCurrentDashboard implements Action {
  readonly type = ECurrentDashboardActions.deleteCurrentDashboard;
  constructor(public payload: { id: number }) {
  }
}

export class UpdateCurrentDashboardTitle implements Action {
  readonly type = ECurrentDashboardActions.updateCurrentDashboardTitle;

  constructor(public payload: string) {
  }
}


export type CurrentDashboardAction = CreateCurrentDashboard
  | UpdateCurrentDashboard
  | DeleteCurrentDashboard
  | UpdateCurrentDashboardTitle

