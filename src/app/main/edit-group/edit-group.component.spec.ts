import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGroupComponent } from './edit-group.component';
import { provideMockStore } from '@ngrx/store/testing';

describe('EditGroupComponent', () => {
  let component: EditGroupComponent;
  let fixture: ComponentFixture<EditGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditGroupComponent],
      providers: [provideMockStore({})],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
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
    const team =  { name: 'one', id: '1' };
    component.edit(team);
    expect(component.model).toEqual(team);
  });

  it('should clear model on submit', () => {
    component.teams = [
      { name: 'one', id: '1' },
      { name: 'two', id: '2' },
    ];
    const model =  { name: 'one', id: '1' };
    component.onSubmit(model);

    expect(component.model).toEqual({});
  });

  it('should update length teams on submit', () => {
    component.teams = [
      { name: 'one', id: '1' },
      { name: 'two', id: '2' },
    ];
    const model =  { name: 'one', id: '3' };
    component.onSubmit(model);

    expect(component.teams.length).toBe(3);
  });

  it('should update one team on submit', () => {
    component.teams = [
      { name: 'one', id: '1' },
      { name: 'two', id: '2' },
    ];
    const model =  { name: 'www', id: '1' };
    component.onSubmit(model);

    expect(component.teams[0]).toEqual( { name: 'www', id: '1' });
  });
});
