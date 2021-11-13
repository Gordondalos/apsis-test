import { TeamInterface } from '../../interfaces/team.interface';
import { UserInterface } from '../../interfaces/user.interface';

export interface IDashboardState {
  teams: TeamInterface[];
  users: UserInterface[];
}


export const dashboardState: IDashboardState = {
  teams: [],
  users: []
}

