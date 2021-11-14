import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EditGroupComponent } from './edit-group/edit-group.component';
import { TableTotalComponent } from './table-total/table-total.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { FormlyModule } from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { PipesModule } from '../pipes/pipes.module';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },

];

@NgModule({
  declarations: [
    MainComponent,
    EditUserComponent,
    EditGroupComponent,
    TableTotalComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatMenuModule,
    FormlyModule.forChild(),
    ReactiveFormsModule,
    MatListModule,
    PipesModule,
  ],
})
export class MainModule {
}
