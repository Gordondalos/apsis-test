import { UserInterface } from '../../interfaces/user.interface';
import { AllTeamsAction } from './teams.actions';

describe('teams action', () => {
  it('should create an instance', () => {
    const payload: UserInterface[] = [{name: 'mbv'}];
    const allUsersAction = new AllTeamsAction(payload);
    expect(allUsersAction).toBeTruthy();
  });

  it('should define property type', () => {
    const payload: UserInterface[] = [{name: 'mbv'}];
    const allUsersAction = new AllTeamsAction(payload);
    expect(allUsersAction.type).toBeTruthy();
  });


});
