import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EditGroupComponent } from './edit-group/edit-group.component';
import { EditCounterComponent } from './edit-counter/edit-counter.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },

];

@NgModule({
  declarations: [
    MainComponent,
    EditUserComponent,
    EditGroupComponent,
    EditCounterComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatButtonModule
    ]
})
export class MainModule { }
