import { SumCountPipe } from './sum-count.pipe';

describe('SumCountPipe', () => {
  it('create an instance', () => {
    const pipe = new SumCountPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return count sum', () => {
    const pipe = new SumCountPipe();
    const users = [
      { id: '2', name: 'Bobs', team: '1', count: 2 },
      { id: '3', name: 'John', team: '1', count: 2 },
    ];
    const res = pipe.transform('1', users);
    expect(res).toBe(4);
  });
});
