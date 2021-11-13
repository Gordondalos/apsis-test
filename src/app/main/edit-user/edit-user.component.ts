import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { teamsSelector } from '../../store/selectors/teams.selector';
import { cloneDeep, each } from 'lodash-es';
import { IAppState } from '../../store/state/app.state';
import { TeamInterface } from '../../interfaces/team.interface';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { UserInterface } from '../../interfaces/user.interface';
import { uid } from 'uid';

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
      .subscribe((teams: TeamInterface[]) => {
        if (teams && teams.length) {
          this.teams = cloneDeep(teams);
          console.log('teams', teams);
          this.drawForm();
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

  edit(team: any) {

  }

  delete(team: any) {

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

  updateData(){

  }
}
