import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TableService } from '../../services/table.service';
import { loadTeamsAction, updateAllTeamsAction, updateAllTeamsFailureAction, updateAllTeamsSuccessAction } from './teams.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { TeamInterface } from '../../interfaces/team.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { PersistentService } from '../../services/persistent.service';


@Injectable()
export class TeamsEffects {

  updateAllTeams = createEffect(() =>
    this.actions$.pipe(
      ofType(updateAllTeamsAction),
      switchMap(() => {
        return this.tableService.getTeams()
          .pipe(
            map((teams: TeamInterface[]) => {
              return updateAllTeamsSuccessAction({ payload: teams });
            }),
            catchError((errorResponse: HttpErrorResponse) => {
              return of(updateAllTeamsFailureAction({ errors: errorResponse }));
            }),
          );
      }),
    ), { dispatch: false },
  );

  updateLocalStorage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateAllTeamsSuccessAction),
        tap(action => {
          if (action && action.payload) {
            const { payload } = action;
            this.persistService.set('teams', payload);
          }

        }),
      ),
    { dispatch: false },
  );

  loadTeamFromLocalstorage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loadTeamsAction),
        switchMap(() => {
          return this.tableService.getTeams()
            .pipe(
              map((teams: TeamInterface[]) => {
                return updateAllTeamsSuccessAction({ payload: teams });
              }),
              catchError((errorResponse: HttpErrorResponse) => {
                return of(updateAllTeamsFailureAction({ errors: errorResponse }));
              }),
            );
        }),
      ),
  );

  constructor(
    private actions$: Actions,
    private persistService: PersistentService,
    private tableService: TableService) {
  }

}
