import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamNameByIdPipe } from './team-name-by-id.pipe';

@NgModule({
    declarations: [
        TeamNameByIdPipe,
    ],
    exports: [
        TeamNameByIdPipe
    ],
    imports: [
        CommonModule
    ]
})
export class PipesModule { }
