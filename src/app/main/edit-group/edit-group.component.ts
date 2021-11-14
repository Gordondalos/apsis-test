import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TeamInterface } from '../../interfaces/team.interface';
import { cloneDeep, each, reject } from 'lodash-es';
import { uid } from 'uid';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../../store/state/app.state';
import { teamsSelector } from '../../store/selectors/teams.selector';

import { AllTeamsAction } from '../../store/actions/teams.actions';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

class FormlyFieldConfig {
}

@UntilDestroy()
@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.scss'],
})
export class EditGroupComponent implements OnInit {

  teams: TeamInterface[] = [];

  form = new FormGroup({});
  model: TeamInterface = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'name',
      type: 'input',
      templateOptions: {
        label: $localize`Team title`,
        placeholder: $localize`Add title team`,
        required: true,
      },
    },
  ];


  constructor(
    public store$: Store<IAppState>,
  ) {
  }

  ngOnInit(): void {
    this.store$.pipe(select(teamsSelector))
      .pipe(untilDestroyed(this))
      .subscribe(teams => {
        if (teams && teams.length) {
          this.teams = cloneDeep(teams);
        }
      });
  }


  onSubmit(model: TeamInterface) {
    let found = false;
    each(this.teams, (team: TeamInterface, index: number) => {
      if (team.id === model.id) {
        this.teams[index] = model;
        found = true;
      }
    });
    if (!found) {
      this.teams.push({
        ...model,
        id: uid(25),
      });
    }
    this.model = {};
    this.updateData();
  }

  delete(team: TeamInterface): void {
    this.teams = reject(this.teams, (t: TeamInterface) => t.id === team.id);
    this.updateData();
  }

  edit(team: TeamInterface) {
    this.model = team;
  }

  updateData() {
    this.store$.dispatch(new AllTeamsAction(cloneDeep(this.teams)));
  }
}
