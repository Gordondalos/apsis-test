import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { EditUserComponent } from './edit-user.component';

describe('EditUserComponent', () => {
  let component: EditUserComponent;
  let fixture: ComponentFixture<EditUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditUserComponent],
      providers: [provideMockStore({})],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should drawForm on Init', () => {
    component.teams = [
      { name: 'one', id: '1' },
      { name: 'two', id: '2' },
    ];
    component.users = [
      { id: '1', name: 'Bob', team: '1', count: 2 },
    ];
    component.drawForm();
    expect(component.fields).toBeTruthy();
  });

  it('should create options', () => {
    component.teams = [
      { name: 'one', id: '1' },
      { name: 'two', id: '2' },
    ];
    component.users = [
      { id: '1', name: 'Bob', team: '1', count: 2 },
    ];
    const options = component.getOptionTeams();
    expect(options).not.toBeUndefined();
  });

  it('should update user from model', () => {
    const user = { id: '1', name: 'Bob', team: '1', count: 2 };
    component.edit(user);
    expect(component.model).not.toBeUndefined();
    expect(component.model).toEqual(user);
  });

  it('should delete user from users', () => {
    component.users = [
      { id: '1', name: 'Bob', team: '1', count: 2 },
    ];
    const user = { id: '1', name: 'Bob', team: '1', count: 2 };
    component.delete(user);
    expect(component.users).not.toBeUndefined();
    expect(component.users).toEqual([]);
  });

  it('should update user on Submit', () => {
    component.users = [
      { id: '1', name: 'Bob', team: '1', count: 2 },
    ];

    const user = { id: '1', name: 'Mark', team: '2', count: 3 };
    component.onSubmit(user);

    expect(component.users).not.toBeUndefined();
    expect(component.users).toEqual([{ ...user }]);
  });

  it('should add user on Submit', () => {
    component.users = [
      { id: '2', name: 'Bobs', team: '1', count: 2 },
    ];
    const user = { id: '1', name: 'Mark', team: '2', count: 3 };
    component.onSubmit(user);
    expect(component.users).not.toBeUndefined();
    expect(component.users.length).toBe(2);
  });

  it('should clear model on Submit', () => {
    component.users = [
      { id: '2', name: 'Bobs', team: '1', count: 2 },
    ];
    const user = { id: '1', name: 'Mark', team: '2', count: 3 };
    component.onSubmit(user);
    expect(component.model).not.toBeUndefined();
    expect(component.model).toEqual({});
  });



});
