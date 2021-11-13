import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { teamsSelector } from '../../store/selectors/teams.selector';
import { cloneDeep, each, reject } from 'lodash-es';
import { IAppState } from '../../store/state/app.state';
import { TeamInterface } from '../../interfaces/team.interface';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { UserInterface } from '../../interfaces/user.interface';
import { uid } from 'uid';
import { AllUsersAction } from '../../store/actions/users.actions';
import { usersSelector } from '../../store/selectors/users.selectors';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  teams: TeamInterface[] = [];
  form = new FormGroup({});
  model: UserInterface = {};
  users: UserInterface[] = [];

  fields: FormlyFieldConfig[] = [];

  constructor(
    public store$: Store<IAppState>,
  ) {
  }

  ngOnInit(): void {
    this.store$.pipe(select(teamsSelector))
      .pipe(untilDestroyed(this))
      .subscribe((teams: TeamInterface[]) => {
        if (teams && teams.length) {
          this.teams = cloneDeep(teams);
          this.drawForm();
        }
      });

    this.store$.pipe(select(usersSelector))
      .pipe(untilDestroyed(this))
      .subscribe((users: UserInterface[]) => {
        if (users && users.length) {
          this.users = cloneDeep(users);
        }
      });

    this.drawForm();
  }

  drawForm() {
    this.fields = [
      {
        key: 'name',
        type: 'input',
        templateOptions: {
          label: $localize`User name`,
          placeholder: $localize`Add user name`,
          required: true,
        }
      },
      {
        key: 'team',
        type: 'select',
        templateOptions: {
          label: $localize`Select teams`,
          options: this.getOptionTeams()
        },
      },
    ];
  }

  getOptionTeams(): { label: string, value: string }[] {
    const options: { label: string, value: string }[] = [];
    this.teams.forEach((team: TeamInterface) => {
      if (team.name && team.id) {
        options.push({
          label: team.name,
          value: team.id
        });
      }
    });
    return options;
  }

  edit(user: UserInterface) {
    this.model = user;
  }

  delete(user: UserInterface) {
    this.users = reject(this.users, (u) => u.id === user.id);
    this.updateData();
  }

  onSubmit(model: UserInterface) {
    let found = false;
    each(this.users, (user, index) => {
      if (user.id === model.id) {
        this.users[index] = model;
        found = true;
      }
    });
    if (!found) {
      this.users.push({
        ...model,
        count: 0,
        id: uid(25)
      });
    }

    this.model = {};
    this.updateData();
  }

  updateData() {
    this.store$.dispatch(new AllUsersAction(cloneDeep(this.users)));
  }
}
