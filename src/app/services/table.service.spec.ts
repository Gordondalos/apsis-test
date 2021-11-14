import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { TableService } from './table.service';

describe('TableService', () => {
  let service: TableService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({})],
    });
    service = TestBed.inject(TableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return items of UserInterface', async () => {
    window.localStorage.setItem('users', JSON.stringify([{name: 'vasa'}]));
    const res = await service.getData('users');
    expect(res.length).toBe(1);
  });

  it('should return true if update data', async () => {
    const res = await service.update( [{name: 'vasa'}], 'users');
    expect(res).toBeTruthy()
  });

  it('should get data or []', async () => {
    localStorage.setItem('users', JSON.stringify([]));
    const res = await service.getAllData().toPromise();
    expect(res?.length).toBe(0)

  });

  it('should get false', async () => {
    const res = service.errorHandler(new Error('qweqwe'));
    expect(res).toBeFalse()
  });
});
