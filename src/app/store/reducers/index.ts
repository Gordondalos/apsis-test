import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { currentDashBoardReducer } from './dashboard.reducers';
import { IDashboardState } from '../state/dashboard.state';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { environment } from '../../../environments/environment';


export interface State {
  router?: RouterReducerState;
  main: IDashboardState;
}

export const reducers: ActionReducerMap<State> = {
  router: routerReducer,
  main: currentDashBoardReducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
