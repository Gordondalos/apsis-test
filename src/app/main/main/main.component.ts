import { Component, OnInit } from '@angular/core';
import { DynamicService } from '../../services/dynamic.service';
import { EditUserComponent } from '../../users/edit-user/edit-user.component';
import { EditTeamsComponent } from '../../teams/edit-teams/edit-teams.component';
import { TeamInterface } from '../../interfaces/team.interface';
import { Store } from '@ngrx/store';
import { UserInterface } from '../../interfaces/user.interface';
import { loadTeamsAction } from '../../teams/store/teams.actions';
import { updateAllUsersAction } from '../../users/store/users.actions';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {

  teams: TeamInterface[] = [];
  users: UserInterface[] = [];

  constructor(
    public dynamicService: DynamicService,
    public store: Store,
  ) {
  }

  ngOnInit(): void {
    this.store.dispatch(loadTeamsAction());
    this.store.dispatch(updateAllUsersAction());
  }

  editUser(): void {
    this.dynamicService.openComponentEvent$.next({
      component: EditUserComponent,
      prop: {},
    });
  }

  editTeam(): void {
    this.dynamicService.openComponentEvent$.next({
      component: EditTeamsComponent,
      prop: {},
    });
  }

}
