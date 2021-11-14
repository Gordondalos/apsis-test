import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableTotalComponent } from './table-total.component';
import { provideMockStore } from '@ngrx/store/testing';

describe('TableTotalComponent', () => {
  let component: TableTotalComponent;
  let fixture: ComponentFixture<TableTotalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableTotalComponent],
      providers: [provideMockStore({})],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init', () => {
    const users = [
      { id: '1', name: 'Bob', team: '1', count: 2 },
    ];
    localStorage.setItem('users', JSON.stringify(users));
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should load data', () => {
    const users = [
      { id: '1', name: 'Bob', team: '1', count: 2 },
    ];
    localStorage.setItem('users', JSON.stringify(users));
    component.loadData(users);
    expect(component._allData).toEqual(users);
  });

  it('should test customFilterPredicate', () => {
    const data = {
      level: 0,
      parent: undefined,
      expanded: true,
      totalCounts: 0,
    };
    const res = component.customFilterPredicate(data);
    expect(res).toBeTruthy();
  });

  it('should show group visible', () => {
    const data = {
      level: 0,
      parent: undefined,
      expanded: true,
      totalCounts: 0,
    };
    const res = component.getDataRowVisible(data);
    expect(res).toBeTruthy();
  });

  it('should expand header', () => {
    const data = {
      level: 0,
      parent: undefined,
      expanded: true,
      totalCounts: 0,
    };
    const exp = { expanded: true };
    component.groupHeaderClick(exp);
    expect(exp.expanded).toBeFalse();
  });

  it('should add group', () => {
    const data = {
      level: 0,
      parent: undefined,
      expanded: true,
      totalCounts: 0,
    };
    const res =  component.addGroups([data], []);
    expect(res).toBeTruthy();
  });

});
