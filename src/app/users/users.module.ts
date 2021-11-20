import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/users.reducers';
import { EffectsModule } from '@ngrx/effects';
import { UsersEffect } from './store/users.effects';
import { EditUserComponent } from './edit-user/edit-user.component';
import { MatListModule } from '@angular/material/list';
import { PipesModule } from '../pipes/pipes.module';
import { FormlyModule } from '@ngx-formly/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EditUserComponent,
  ],
  imports: [
    CommonModule,
    EffectsModule.forFeature([UsersEffect]),
    StoreModule.forFeature('users', reducers),
    MatListModule,
    PipesModule,
    FormlyModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule
  ],
})
export class UsersModule {
}
