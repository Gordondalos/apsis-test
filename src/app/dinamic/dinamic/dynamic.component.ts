import { Component, Input, OnInit } from '@angular/core';
import { DynamicInterface } from '../../interfaces/dynamicInterface';

@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.scss']
})
export class DynamicComponent implements OnInit {
  @Input() data!: DynamicInterface;

  component: any;
  inputs: any;
  outputs: any;

  constructor() {
  }

  ngOnInit(): void {

    this.component = this.data.component;

    this.inputs = {
      data: this.data.prop,
    };

    this.outputs = {
      changeEvent: (event: any) => {
        console.log(event);
      },
    };
  }

}
