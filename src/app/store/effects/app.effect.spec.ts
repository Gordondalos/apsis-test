import { Actions, createEffect } from '@ngrx/effects';
import { AppEffects } from './app.effects';
import { TableService } from '../../services/table.service';


describe('createEffect', () => {
  it('shold createEffect', () => {
    const tableService = new TableService();
    const actions = new Actions();
    const appEffects: any = new AppEffects(actions, tableService);
    expect(appEffects).toBeTruthy();
  });

});
