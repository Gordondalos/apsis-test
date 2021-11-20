import { UserInterface } from './user.interface';
import { TeamInterface } from './team.interface';

export interface AppStateInterface {
  users: UserInterface[],
  teams: TeamInterface[],
  errors: any
}
