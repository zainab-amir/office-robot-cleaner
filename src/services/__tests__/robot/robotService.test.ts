import { getUniquePlacesCleaned } from '../../robot/robotService';
import { Command } from '../../robot/robotService.types';

describe('Robot Service', () => {
  test('no command provided', () => {
    const result = getUniquePlacesCleaned({ x: 0, y: 0 }, []);
    expect(result).toEqual(1);
  });

  test('movement on same spots multiple times', () => {
    const commands: Command[] = Array(50)
      .fill([
        { direction: 'north', steps: 1 },
        { direction: 'south', steps: 1 },
      ])
      .flat();
    const result = getUniquePlacesCleaned({ x: 0, y: 0 }, commands);
    expect(result).toEqual(2);
  });

  test('small square pattern', () => {
    const result = getUniquePlacesCleaned({ x: 0, y: 0 }, [
      { direction: 'north', steps: 1 },
      { direction: 'east', steps: 1 },
      { direction: 'south', steps: 1 },
      { direction: 'west', steps: 1 },
    ]);
    expect(result).toEqual(4);
  });

  test('random pattern with a line segment that does not overlap', () => {
    const result = getUniquePlacesCleaned({ x: 0, y: 0 }, [
      { direction: 'north', steps: 1 },
      { direction: 'east', steps: 1 },
      { direction: 'north', steps: 1 },
      { direction: 'west', steps: 5 },
      { direction: 'south', steps: 1 },
      { direction: 'east', steps: 1 },
    ]);
    expect(result).toEqual(11);
  });

  test('max square pattern from positive start position', () => {
    const result = getUniquePlacesCleaned({ x: 0, y: 0 }, [
      { direction: 'north', steps: 99999 },
      { direction: 'east', steps: 99999 },
      { direction: 'south', steps: 99999 },
      { direction: 'west', steps: 99999 },
    ]);
    expect(result).toEqual(399996);
  });

  test('max square pattern from negative start position', () => {
    const result = getUniquePlacesCleaned({ x: -99999, y: -99999 }, [
      { direction: 'north', steps: 99999 },
      { direction: 'east', steps: 99999 },
      { direction: 'south', steps: 99999 },
      { direction: 'west', steps: 99999 },
    ]);
    expect(result).toEqual(399996);
  });

  test('spiral pattern from positive start position', () => {
    const result = getUniquePlacesCleaned({ x: 0, y: 0 }, [
      { direction: 'north', steps: 3 },
      { direction: 'east', steps: 3 },
      { direction: 'south', steps: 3 },
      { direction: 'west', steps: 2 },
      { direction: 'north', steps: 2 },
      { direction: 'east', steps: 1 },
      { direction: 'south', steps: 1 },
    ]);
    expect(result).toEqual(16);
  });

  test('spiral pattern from negative start position', () => {
    const result = getUniquePlacesCleaned({ x: 0, y: 0 }, [
      { direction: 'north', steps: 3 },
      { direction: 'east', steps: 3 },
      { direction: 'south', steps: 3 },
      { direction: 'west', steps: 2 },
      { direction: 'north', steps: 2 },
      { direction: 'east', steps: 1 },
      { direction: 'south', steps: 1 },
    ]);
    expect(result).toEqual(16);
  });
});
