import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/teams.reducers';
import { EditTeamsComponent } from './edit-teams/edit-teams.component';
import { FormlyModule } from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { PipesModule } from '../pipes/pipes.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EffectsModule } from '@ngrx/effects';
import { TeamsEffects } from './store/teams.effects';

@NgModule({
  declarations: [
    EditTeamsComponent
  ],
  imports: [
    CommonModule,
    FormlyModule.forChild(),
    ReactiveFormsModule,
    MatListModule,
    PipesModule,
    MatIconModule,
    MatButtonModule,
    EffectsModule.forFeature([TeamsEffects]),
    StoreModule.forFeature('teams', reducers)
  ],
  providers: [TeamsEffects]
})
export class TeamsModule { }
