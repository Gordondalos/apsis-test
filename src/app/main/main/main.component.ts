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

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  teams: TeamInterface[] = [];

  constructor(
    private mainService: MainService,
    private dynamicService: DynamicService,
    private tableService: TableService,
    public store$: Store<IAppState>,
  ) {
    this.store$.pipe(select(teamsSelector))
      .subscribe((teams) => {
        if (teams && teams.length) {
          this.tableService.updateTeams(teams).then();
        }
      });
  }

  ngOnInit(): void {
    this.loadData().then();
  }

  async loadData() {
    this.teams = await this.tableService.getTeams();
    if (this.teams?.length) {
      this.store$.dispatch(new AllTeamsAction(cloneDeep(this.teams)));
    }
  }

  createUser() {
    this.dynamicService.openComponentEvent$.next({
      component: EditUserComponent,
      prop: {}
    });
  }

  editTeam() {
    this.dynamicService.openComponentEvent$.next({
      component: EditGroupComponent,
      prop: {}
    });
  }

}
