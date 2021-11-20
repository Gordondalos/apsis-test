import { createSelector } from '@ngrx/store';
import { UserInterface } from '../../interfaces/user.interface';
import { AppStateInterface } from '../../interfaces/app-state.interface';

export const baseSelector = (state: AppStateInterface): UserInterface[] => state.users;

export const usersSelector = createSelector(
  baseSelector,
  (usersState: UserInterface[]): UserInterface[] => usersState,
);

