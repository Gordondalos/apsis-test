import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicComponent } from './dynamic.component';
import { DynamicInterface } from '../../interfaces/dynamic.Interface';
import { EditUserComponent } from '../../main/edit-user/edit-user.component';
import { provideMockStore } from '@ngrx/store/testing';
import { AppComponent } from '../../app.component';

describe('DinamicComponent', () => {
  let component: DynamicComponent;
  let fixture: ComponentFixture<DynamicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DynamicComponent],
      providers: [provideMockStore({})],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicComponent);
    component = fixture.componentInstance;
    component.data = {
      component: EditUserComponent,
      prop: {},
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('has component after init', () => {
    component.ngOnInit();
    expect(component.component).toBe(EditUserComponent);
  });
  it('has inputs after init', () => {
    component.ngOnInit();
    expect(component.inputs).toEqual({ data: {} });
  });

  it('has outputs after init', () => {
    component.ngOnInit();
    expect(component.outputs.changeEvent).toBeTruthy();
  });


});
