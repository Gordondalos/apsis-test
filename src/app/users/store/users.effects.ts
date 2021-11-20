import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { updateAllFailureAction, updateAllUsersAction, updateAllUsersSuccessAction } from './users.actions';
import { TableService } from '../../services/table.service';
import { PersistentService } from '../../services/persistent.service';
import { UserInterface } from '../../interfaces/user.interface';

@Injectable()
export class UsersEffect {
  updateAllUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateAllUsersAction),
      switchMap(() => {
        return this.tableService.getUsers()
          .pipe(
            map((users: UserInterface[]) => {
              // this.persistService.set('token', currentUser.token);
              return updateAllUsersSuccessAction({ payload: users });
            }),
            catchError((errorResponse: HttpErrorResponse) => {
              return of(
                updateAllFailureAction({ errors: { message: 'show error' } }),
              );
            }),
          );
      }),
    ), { dispatch: true },
  );

  updateAllDataInLocalstorage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateAllUsersSuccessAction),
        tap(action => {
          if (action && action.payload) {
            const { payload } = action;
            this.persistService.set('users', payload);
          }
        }),
      ),
    { dispatch: false },
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private tableService: TableService,
    private persistService: PersistentService,
  ) {
  }
}
