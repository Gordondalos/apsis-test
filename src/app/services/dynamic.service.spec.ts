import { TestBed } from '@angular/core/testing';

import { DynamicService } from './dynamic.service';
import { EditUserComponent } from '../main/edit-user/edit-user.component';
import { DynamicInterface } from '../interfaces/dynamic.Interface';

describe('DynamicService', () => {
  let service: DynamicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send subject', () => {
    service.openComponentEvent$.next({ component: EditUserComponent, prop: {} });
    service.openComponentEvent$
      .subscribe((res: DynamicInterface) => {
        expect(res.component).toBeTruthy();
      });

  });
});
