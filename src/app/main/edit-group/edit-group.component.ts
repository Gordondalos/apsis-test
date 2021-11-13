import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TeamInterface } from '../../interfaces/team.interface';
import { each, reject } from 'lodash-es';
import { uid } from 'uid';

class FormlyFieldConfig {
}

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.scss']
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
        label: 'Team title',
        placeholder: 'Add title team',
        required: true,
      }
    }
  ];


  constructor() {
  }

  ngOnInit(): void {
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
        id: uid(25)
      });
    }

    this.model = {};
  }

  delete(team: TeamInterface): void {
    this.teams = reject(this.teams, (t: TeamInterface) => t.id === team.id);
  }

  edit(team: TeamInterface) {
    this.model = team;
  }

  updateData(){

  }
}
