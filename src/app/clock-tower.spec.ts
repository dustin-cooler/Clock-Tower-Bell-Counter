import { ClockTower } from './clock-tower';

describe('ClockTower', () => {
  it('should count 5 bells between 2:00 and 3:00', () => {
    const tower = new ClockTower();
    const startTime = '2:00';
    const endTime = '3:00';
    expect(tower.countBells(startTime, endTime)).toEqual(5);
  });

  it('should count 5 bells between 14:00 and 15:00', () => {
    const tower = new ClockTower();
    const startTime = '14:00';
    const endTime = '15:00';
    expect(tower.countBells(startTime, endTime)).toEqual(5);
  });

  it('should count 3 bells between 14:23 and 15:42', () => {
    const tower = new ClockTower();
    const startTime = '14:23';
    const endTime = '15:42';
    expect(tower.countBells(startTime, endTime)).toEqual(3);
  });

  it('should count 24 bells between 23:00 and 1:00', () => {
    const tower = new ClockTower();
    const startTime = '23:00';
    const endTime = '1:00';
    expect(tower.countBells(startTime, endTime)).toEqual(24);
  });
});
