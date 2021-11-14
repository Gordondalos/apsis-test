import { AllUsersAction } from './users.actions';
import { UserInterface } from '../../interfaces/user.interface';

describe('users action', () => {
  it('should create an instance', () => {
    const payload: UserInterface[] = [{name: 'kolya'}];
    const allUsersAction = new AllUsersAction(payload);
    expect(allUsersAction).toBeTruthy();
  });

  it('should define property type', () => {
    const payload: UserInterface[] = [{name: 'kolya'}];
    const allUsersAction = new AllUsersAction(payload);
    expect(allUsersAction.type).toBeTruthy();
  });


});
