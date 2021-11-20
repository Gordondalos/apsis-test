import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { UserInterface } from '../../interfaces/user.interface';
import { TeamInterface } from '../../interfaces/team.interface';
import { cloneDeep, each } from 'lodash-es';
import { select, Store } from '@ngrx/store';
import { usersSelector } from '../../users/store/users.selectors';
import {  updateAllUsersSuccessAction } from '../../users/store/users.actions';
import { teamsSelector } from '../../teams/store/teams.selectors';
import { updateAllTeamsSuccessAction } from '../../teams/store/teams.actions';


export class Group {
  level = 0;
  parent!: Group;
  expanded = true;
  totalCounts = 0;

  get visible(): boolean {
    return !this.parent || this.parent.visible && this.parent.expanded;
  }
}

@UntilDestroy()
@Component({
  selector: 'app-table-total',
  templateUrl: './table-total.component.html',
  styleUrls: ['./table-total.component.scss'],
})
export class TableTotalComponent implements OnInit {
  get users(): UserInterface[] {
    return this._users;
  }

  set users(value: UserInterface[]) {
    this._users = value;
  }

  private _users: UserInterface[] = [];

  get teams(): TeamInterface[] {
    return this._teams;
  }

  set teams(value: TeamInterface[]) {
    this._teams = value;
  }

  private _teams: TeamInterface[] = [];

  title = 'Grid Grouping';

  public dataSource = new MatTableDataSource<any | Group>([]);

  _allData!: any[];
  columns: any[] = [
    {
      field: 'team',
    },
    {
      field: 'name',
    },
    {
      field: 'count',
    },
    // {
    //   field: 'id'
    // },

  ];
  displayedColumns: string[];
  groupByColumns: string[] = [];

  constructor(
    public store: Store,
  ) {

    this.displayedColumns = this.columns.map(column => column.field);
    this.groupByColumns = ['team'];
  }

  ngOnInit() {
    this.init();
  }

  async init() {
    //@ts-ignore
    this.store.pipe(select(usersSelector))
      .pipe(untilDestroyed(this))
      .subscribe((users: UserInterface[]) => {
        this.users = cloneDeep(users);
        this.loadData(this.users);
      });

    //@ts-ignore
    this.store.pipe(select(teamsSelector))
      .pipe(untilDestroyed(this))
      .subscribe((teams: TeamInterface[]) => {
        this.teams = cloneDeep(teams);
      });
  }

  loadData(users: UserInterface[]) {
    this._allData = users;
    this.dataSource.data = this.addGroups(this._allData, this.groupByColumns);
    this.dataSource.filterPredicate = this.customFilterPredicate.bind(this);
    this.dataSource.filter = performance.now().toString();
  }


  customFilterPredicate(data: any | Group): boolean {
    return data instanceof Group ? data.visible : this.getDataRowVisible(data);
  }

  getDataRowVisible(data: any): boolean {
    const groupRows = this.dataSource.data.filter(
      row => {
        if (!(row instanceof Group)) {
          return false;
        }
        let match = true;
        this.groupByColumns.forEach((column: string) => {
          // @ts-ignore
          if (!row[column] || !data[column] || row[column] !== data[column]) {
            match = false;
          }
        });
        return match;
      },
    );

    if (groupRows.length === 0) {
      return true;
    }
    const parent = groupRows[0] as Group;
    return parent.visible && parent.expanded;
  }

  groupHeaderClick(row: { expanded: boolean; }) {
    row.expanded = !row.expanded;
    this.dataSource.filter = performance.now().toString();
  }

  addGroups(data: any[], groupByColumns: string[]): any[] {
    const rootGroup = new Group();
    rootGroup.expanded = true;
    return this.getSublevel(data, 0, groupByColumns, rootGroup);
  }

  getSublevel(data: any[], level: number, groupByColumns: string[], parent: Group): any[] {
    if (level >= groupByColumns.length) {
      return data;
    }
    const groups = this.uniqueBy(
      data.map(
        row => {
          const result = new Group();
          result.level = level + 1;
          result.parent = parent;
          for (let i = 0; i <= level; i++) {
            // @ts-ignore
            result[groupByColumns[i]] = row[groupByColumns[i]];
          }
          return result;
        },
      ),
      JSON.stringify);

    const currentColumn = groupByColumns[level];
    let subGroups: any[] = [];
    groups.forEach((group: Group) => {
      // @ts-ignore
      const rowsInGroup = data.filter(row => group[currentColumn] === row[currentColumn]);
      group.totalCounts = rowsInGroup.length;
      const subGroup = this.getSublevel(rowsInGroup, level + 1, groupByColumns, group);
      subGroup.unshift(group);
      subGroups = subGroups.concat(subGroup);
    });
    return subGroups;
  }

  uniqueBy(a: any[], key: { (value: any, replacer?: ((this: any, key: string, value: any) => any) | undefined, space?: string | number | undefined): string; (value: any, replacer?: (string | number)[] | null | undefined, space?: string | number | undefined): string; (arg0: any): any; }) {
    const seen = {};
    return a.filter(item => {
      const k = key(item);
      // @ts-ignore
      return seen.hasOwnProperty(k) ? false : (seen[k] = true);
    });
  }

  isGroup(index: any, item: { level: boolean; }): boolean {
    return item.level;
  }

  changeCount(row: any, operation: string): void {
    if (operation === 'add') {
      row.count += 1;
    } else {
      if (row.count > 0) {
        row.count -= 1;
      }
    }
    each(this.users, (user, index) => {
      if (user.id === row.id) {
        this.users[index] = row;
        for (let team of this.teams) {
          if (team.id === row.team) {
            if (!team.count) {
              team.count = 0;
            }
            if (operation === 'add') {
              team.count += 1;
            } else {
              team.count -= 1;
            }
          }
        }
      }
    });
    this.updateData();
  }

  updateData() {
    this.store.dispatch(updateAllUsersSuccessAction({ payload: cloneDeep(this.users) }));
    this.store.dispatch(updateAllTeamsSuccessAction({payload: this.teams}));
  }
}
