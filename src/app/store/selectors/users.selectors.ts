import { IAppState } from '../state/app.state';
import { createSelector } from '@ngrx/store';

export const usersSelector = (state: IAppState) => {
  return state.main.users;
};

export const users = createSelector(
  usersSelector,
  state => {
    return state;
  }
);

