import { Component, OnInit } from '@angular/core';
import { MainService } from '../../services/main.service';
import { DynamicService } from '../../services/dynamic.service';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { EditGroupComponent } from '../edit-group/edit-group.component';
import { TableService } from '../../services/table.service';
import { TeamInterface } from '../../interfaces/team.interface';
import { AllTeamsAction } from '../../store/actions/teams.actions';
import { cloneDeep } from 'lodash-es';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../../store/state/app.state';
import { teamsSelector } from '../../store/selectors/teams.selector';
import { UserInterface } from '../../interfaces/user.interface';
import { usersSelector } from '../../store/selectors/users.selectors';
import { AllUsersAction } from '../../store/actions/users.actions';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {

  teams: TeamInterface[] = [];
  users: UserInterface[] = [];

  constructor(
    private mainService: MainService,
    private dynamicService: DynamicService,
    private tableService: TableService,
    public store$: Store<IAppState>,
  ) {
    this.store$.pipe(select(teamsSelector))
      .pipe(untilDestroyed(this))
      .subscribe((teams: TeamInterface[]) => {
        if (teams && teams.length) {
          // in a real project this is a bad decision
          this.tableService.update(teams, 'teams').then();
          this.teams = cloneDeep(teams);
        }
      });

    this.store$.pipe(select(usersSelector))
      .pipe(untilDestroyed(this))
      .subscribe((users: UserInterface[]) => {
        if (users && users.length) {
          // in a real project this is a bad decision
          this.tableService.update(users, 'users').then();
          this.users = cloneDeep(users);
        }
      });
  }

  ngOnInit(): void {
    this.loadData().then();
  }

  async loadData() {
    this.teams = await this.tableService.getData('teams');
    if (this.teams?.length) {
      this.store$.dispatch(new AllTeamsAction(cloneDeep(this.teams)));
    }

    this.users = await this.tableService.getData('users');
    if (this.users?.length) {
      this.store$.dispatch(new AllUsersAction(cloneDeep(this.users)));
    }
  }

  editUser(): void {
    this.dynamicService.openComponentEvent$.next({
      component: EditUserComponent,
      prop: {},
    });
  }

  editTeam(): void {
    this.dynamicService.openComponentEvent$.next({
      component: EditGroupComponent,
      prop: {},
    });
  }

}
