import { Command, LineRanges, Range } from './robotService.types';
import { Point } from '../../utils/common.types';
import { directionDelta } from '../../utils/constants';

/**
 * Creates a new range or merges it with existing ranges in a line map, calculating the total
 * number of new points added.
 *
 * @param map - Map storing line ranges, keyed by coordinate (x for vertical lines, y for horizontal lines)
 * @param coordinate - The fixed coordinate of the line (x for vertical lines, y for horizontal lines)
 * @param start - Starting position on the variable coordinate
 * @param end - Ending position on the variable coordinate
 *
 * @returns The number of new points added after merging (can be 0 if completely overlapping with existing ranges)
 *
 * Details:
 * 1. If no ranges exist for the coordinate, creates a new entry
 * 2. If ranges exist, merges the new range with existing ones, handling overlaps
 * 3. Maintains sorted, non-overlapping ranges and updates total points covered
 *
 * Example:
 * If map has range {min: 0, max: 5} and we add {min: 3, max: 8},
 * result will be single merged range {min: 0, max: 8}
 */
function createOrMergeRanges(map: Map<number, LineRanges>, coordinate: number, start: number, end: number): number {
  const min = Math.min(start, end);
  const max = Math.max(start, end);
  const newRange = { min, max };

  if (!map.has(coordinate)) {
    map.set(coordinate, { ranges: [newRange], totalPoints: max - min + 1 });
    return max - min + 1;
  }

  const lineRanges = map.get(coordinate)!;
  const oldPoints = lineRanges.totalPoints;

  // Merge overlapping ranges
  const ranges = [...lineRanges.ranges, newRange].sort((a, b) => a.min - b.min);

  const mergedRanges: Range[] = [];
  let currentRange = ranges[0];

  for (let i = 1; i < ranges.length; i++) {
    if (ranges[i].min <= currentRange.max + 1) {
      currentRange.max = Math.max(currentRange.max, ranges[i].max);
    } else {
      mergedRanges.push(currentRange);
      currentRange = ranges[i];
    }
  }
  mergedRanges.push(currentRange);

  const newTotalPoints = mergedRanges.reduce((sum, range) => sum + (range.max - range.min + 1), 0);

  lineRanges.ranges = mergedRanges;
  lineRanges.totalPoints = newTotalPoints;

  return newTotalPoints - oldPoints;
}

/**
 * Calculates number of unique positions cleaned by the robot.
 *
 * @param startingPoint - Initial x,y coordinates of robot
 * @param commands - Array commands containing direction and step count
 * @returns Total number of unique positions cleaned including start position
 *
 * @example
 * getUniquePlacesCleaned({ x: 0, y: 0 }, [{ direction: 'north', steps: 2 }]) // Returns 3
 *
 * Algorithm:
 * - Maintains separate maps for vertical and horizontal lines
 * - Merges overlapping line segments to avoid over counting
 * - Calculates intersection points between vertical and horizontal lines
 * - Subtracts intersection points from total cleaned points to get unique points
 */
export function getUniquePlacesCleaned(startingPoint: Point, commands: Command[]): number {
  if (commands.length === 0) {
    return 1;
  }

  // Store every vertical lines by x coordinate and horizontal lines by y coordinate
  const verticalLines = new Map<number, LineRanges>();
  const horizontalLines = new Map<number, LineRanges>();

  let currentX = startingPoint.x;
  let currentY = startingPoint.y;
  let totalCleanedPlaces = 0;

  for (const command of commands) {
    const delta = directionDelta[command.direction];
    const newX = currentX + delta[0] * command.steps;
    const newY = currentY + delta[1] * command.steps;

    if (delta[0] === 0) {
      // Vertical line
      totalCleanedPlaces += createOrMergeRanges(verticalLines, currentX, currentY, newY);
    } else {
      // Horizontal line
      totalCleanedPlaces += createOrMergeRanges(horizontalLines, currentY, currentX, newX);
    }

    currentX = newX;
    currentY = newY;
  }

  // Count duplicate cleaned places
  let overlaps = 0;
  verticalLines.forEach((verticalPath, x) => {
    horizontalLines.forEach((horizontalPath, y) => {
      if (
        verticalPath.ranges.some((vRange) => y >= vRange.min && y <= vRange.max) &&
        horizontalPath.ranges.some((hRange) => x >= hRange.min && x <= hRange.max)
      ) {
        overlaps++;
      }
    });
  });

  // Get unique cleaned places
  return totalCleanedPlaces - overlaps;
}
