import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { MainComponent } from './main.component';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainComponent],
      providers: [provideMockStore({})],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load teams and users after init', () => {
    component.ngOnInit();
    expect(component.teams).toBeTruthy();
    expect(component.users).toBeTruthy();
  });


  it('should store change', () => {
    const teams = [{name: 'vasa'}];
    window.localStorage.setItem('teams', JSON.stringify(teams));
    component.teams = teams;
    component.store.subscribe(res => {
      expect(res).toBeTruthy();
    });
  });

  it('should store change user', () => {
    component.editUser();
    component.dynamicService.openComponentEvent$
      .subscribe((res: any) => {
        expect(res).toBeTruthy();
      })
  });

  it('should store change team', () => {
    component.editTeam();
    component.dynamicService.openComponentEvent$
      .subscribe((res: any) => {
        expect(res).toBeTruthy();
      })
  });

});
