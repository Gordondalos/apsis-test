import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { MainService } from './services/main.service';
import { DynamicInterface } from './interfaces/dynamicInterface';
import { DynamicService } from './services/dynamic.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('drawer', {static: false}) driver: MatDrawer | undefined;
  data?: DynamicInterface;

  constructor(
    private mainService: MainService,
    private dynamicService: DynamicService
  ) {
  }

  ngOnInit() {
    this.mainService.sidenavState
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        if (res) {
          this.driver?.open();
        } else {
          this.driver?.close();
        }
      });

    this.dynamicService.openComponentEvent$
      .pipe(untilDestroyed(this))
      .subscribe((value: DynamicInterface) => {
        this.data = value;
        this.driver?.open();
      });

  }

}
