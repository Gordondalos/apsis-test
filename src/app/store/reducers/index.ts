import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { currentDashBoardReducer } from './dashboard.reducers';
import { IDashboardState } from '../state/dashboard.state';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';

const currentDashBoardNode = 'currentDashboard';

export interface State {
  router?: RouterReducerState;
  [currentDashBoardNode]: IDashboardState;
}

export const reducers: ActionReducerMap<State> = {
  router: routerReducer,
  [currentDashBoardNode]: currentDashBoardReducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
