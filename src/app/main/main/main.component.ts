import { Component, OnInit } from '@angular/core';
import { MainService } from '../../services/main.service';
import { DynamicService } from '../../services/dynamic.service';
import { EditUserComponent } from '../edit-user/edit-user.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(
    private mainService: MainService,
    private dynamicService: DynamicService
  ) {
  }

  ngOnInit(): void {

  }

  setSidenav(state: boolean) {
    this.mainService.sidenavState.next(state);
  }

  createUser() {
    this.dynamicService.openComponentEvent$.next({
      component: EditUserComponent,
      prop: {}
    })
  }
}
