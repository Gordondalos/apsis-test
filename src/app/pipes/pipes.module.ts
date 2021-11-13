import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamNameByIdPipe } from './team-name-by-id.pipe';
import { SumCountPipe } from './sum-count.pipe';

@NgModule({
    declarations: [
        TeamNameByIdPipe,
        SumCountPipe,
    ],
  exports: [
    TeamNameByIdPipe,
    SumCountPipe
  ],
    imports: [
        CommonModule
    ]
})
export class PipesModule { }
