import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicComponent } from './dinamic/dynamic.component';
import { DynamicModule } from 'ng-dynamic-component';


@NgModule({
  declarations: [
    DynamicComponent
  ],
  exports: [
    DynamicComponent
  ],
  imports: [
    CommonModule,
    DynamicModule
  ]
})
export class MyDynamicModule { }
