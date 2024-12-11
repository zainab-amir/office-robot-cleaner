import { Command } from './robotService.types';
import { Point } from '../../utils/common.types';
import { directionDelta } from '../../utils/constants';
import { createHash } from '../../utils/helper';

/**
 * Calculates number of unique positions cleaned by the robot.
 *
 * @param startingPoint - Initial x,y coordinates of robot
 * @param commands - Array commands containing direction and step count
 * @returns Total number of unique positions cleaned including start position
 *
 * @example
 * getUniquePlacesCleaned({ x: 0, y: 0 }, [{ direction: 'north', steps: 2 }]) // Returns 3
 */
export function getUniquePlacesCleaned(startingPoint: Point, commands: Command[]): number {
  const uniqueCleanedVertices = new Set<number>();

  let startX = startingPoint.x;
  let startY = startingPoint.y;

  uniqueCleanedVertices.add(createHash(startX, startY));

  for (let commandIndex = 0; commandIndex < commands.length; commandIndex++) {
    const command = commands[commandIndex];
    const delta = directionDelta[command.direction];

    for (let step = 1; step <= command.steps; step++) {
      startX = delta[0] + startX;
      startY = delta[1] + startY;
      uniqueCleanedVertices.add(createHash(startX, startY));
    }
  }

  return uniqueCleanedVertices.size;
}
