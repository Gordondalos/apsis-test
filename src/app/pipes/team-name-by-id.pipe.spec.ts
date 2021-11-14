import { TeamNameByIdPipe } from './team-name-by-id.pipe';

describe('TeamNameByIdPipe', () => {
  it('create an instance', () => {
    const pipe = new TeamNameByIdPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return team name', () => {
    const pipe = new TeamNameByIdPipe();
    const teams = [
      { name: 'one', id: '1' },
      { name: 'two', id: '2' },
    ];
    const teamName = pipe.transform('1', teams);

    expect(teamName).toBe('one');
  });
});
