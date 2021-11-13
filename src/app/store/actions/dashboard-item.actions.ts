import { Action } from '@ngrx/store';

export enum EDashboardItemActions {
  widgetTitleChangeAction = '[WIDGET CHANGE TITLE] widget change title',
  dashboardItemChangeAction = '[DashboardItem change] DashboardItem change'
}

export class DashBoardTitleChangeAction implements Action {
  readonly type = EDashboardItemActions.widgetTitleChangeAction;
  constructor(public payload: {
    id: string,
    title: string
  }) {
  }
}

export class UpdateDashboardItem implements Action {
  readonly type = EDashboardItemActions.dashboardItemChangeAction;
  constructor(public payload: any) {
  }
}

export type DashboardItemActions = UpdateDashboardItem | DashBoardTitleChangeAction

