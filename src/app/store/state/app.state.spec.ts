import { getInitialState } from './app.state';

describe('test initial state', () => {
  it('shold initial state', () => {
    expect(getInitialState()).toBeTruthy();
  });

});
