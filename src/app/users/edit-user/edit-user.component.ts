import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { cloneDeep, each, reject } from 'lodash-es';
import { TeamInterface } from '../../interfaces/team.interface';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { UserInterface } from '../../interfaces/user.interface';
import { uid } from 'uid';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { teamsSelector } from '../../teams/store/teams.selectors';
import { usersSelector } from '../store/users.selectors';
import { updateAllUsersSuccessAction } from '../store/users.actions';

@UntilDestroy()
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {

  teams: TeamInterface[] = [];
  form = new FormGroup({});
  model: UserInterface = {};
  users: UserInterface[] = [];

  fields: FormlyFieldConfig[] = [];

  constructor(
    public store: Store,
  ) {
  }

  ngOnInit(): void {
    //@ts-ignore
    this.store.pipe(select(teamsSelector))
      .pipe(untilDestroyed(this))
      .subscribe(teams => {
        this.teams = cloneDeep(teams);
        this.drawForm();
      });

//@ts-ignore
    this.store.pipe(select(usersSelector))
      .pipe(untilDestroyed(this))
      .subscribe(users => {
        this.users = cloneDeep(users);
      });
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
        },
      },
      {
        key: 'team',
        type: 'select',
        templateOptions: {
          label: $localize`Select teams`,
          options: this.getOptionTeams(),
          required: true,
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
          value: team.id,
        });
      }
    });

    return options;
  }

  edit(user: UserInterface) {
    this.model = user;
  }

  delete(user: UserInterface) {
    this.users = reject(this.users, u => u.id === user.id);
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
        id: uid(25),
      });
    }

    this.model = {};
    this.updateData();
  }

  updateData() {
    this.store.dispatch(updateAllUsersSuccessAction({ payload: cloneDeep(this.users) }));
  }

  trackFunc(index: number, user: UserInterface) {
    return user.id;
  };
}
