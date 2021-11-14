import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableTotalComponent } from './table-total.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Store, StoreModule } from '@ngrx/store';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IAppState } from '../../store/state/app.state';

describe('TableTotalComponent', () => {
  let component: TableTotalComponent;
  let fixture: ComponentFixture<TableTotalComponent>;
  let store: Store<IAppState>;
  const initialState = {
    main: {
      teams: [],
      users: [],
    },
  };

  beforeEach(() => {

    fixture = TestBed.createComponent(TableTotalComponent);

    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [StoreModule.forRoot({})],
      declarations: [TableTotalComponent],
      providers: [provideMockStore({initialState})],
    }).compileComponents();

    component = fixture.componentInstance;
    // store = TestBed.inject(MockStore);
    // component.store$ = store;

    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should create', () => {
    expect(component.columns).toBeTruthy();
  });
});
