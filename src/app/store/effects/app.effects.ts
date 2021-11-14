import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { ETeamsActions } from '../actions/teams.actions';
import { TableService } from '../../services/table.service';
import { EMPTY, from } from 'rxjs';


@Injectable()
export class AppEffects {

  constructor(
    private actions$: Actions,
    private tableService: TableService
  ) {}

  /*
  * show how use effect for update data
  * */
  updatedAt$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ETeamsActions.updateTeamsAction),
      mergeMap((data: {payload: any}) => from(this.tableService.update(data.payload,'teams'))
        .pipe(
          map((res: boolean) => {
            return { type: ETeamsActions.updateTeamsAction, payload: data.payload }
          }),
          catchError(() => EMPTY)
        ))
    )}, {dispatch: false}) // effect stop dispatch
    // )})
}
