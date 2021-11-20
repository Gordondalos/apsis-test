import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTeamsComponent } from './edit-teams.component';
import { provideMockStore } from '@ngrx/store/testing';
import { AllTeamsAction } from '../store/actions/teams.actions';
import { cloneDeep } from 'lodash-es';

describe('EditGroupComponent', () => {
  let component: EditTeamsComponent;
  let fixture: ComponentFixture<EditTeamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditTeamsComponent],
      providers: [provideMockStore({})],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init', () => {
    component.teams = [
      { name: 'one', id: '1' },
      { name: 'two', id: '2' },
    ];
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should delete teams correctly', () => {
    component.teams = [
      { name: 'one', id: '1' },
      { name: 'two', id: '2' },
    ];
    component.delete({ name: 'one', id: '1' });
    expect(component.teams).toEqual([{ name: 'two', id: '2' }]);
  });

  it('should insert model', () => {
    const team = { name: 'one', id: '1' };
    component.edit(team);
    expect(component.model).toEqual(team);
  });

  it('should clear model on submit', () => {
    component.teams = [
      { name: 'one', id: '1' },
      { name: 'two', id: '2' },
    ];
    const model = { name: 'one', id: '1' };
    component.onSubmit(model);

    expect(component.model).toEqual({});
  });

  it('should update length teams on submit', () => {
    component.teams = [
      { name: 'one', id: '1' },
      { name: 'two', id: '2' },
    ];
    const model = { name: 'one', id: '3' };
    component.onSubmit(model);

    expect(component.teams.length).toBe(3);
  });

  it('should update one team on submit', () => {
    component.teams = [
      { name: 'one', id: '1' },
      { name: 'two', id: '2' },
    ];
    const model = { name: 'www', id: '1' };
    component.onSubmit(model);

    expect(component.teams[0]).toEqual({ name: 'www', id: '1' });
  });


  it('should update store state', () => {
    component.teams = [
      { name: 'one', id: '1' },
      { name: 'two', id: '2' },
    ];
    component.updateData();
    component.store$
      .subscribe(res => {
        expect(res).toBeTruthy();
      });
  });

  it('should return index of team', () => {
    component.teams = [
      { name: 'one', id: '1' },
      { name: 'two', id: '2' },
    ];
    const res = component.trackFunc(1, {id: '1'});
    expect(res).toBe('1');
  });


});
