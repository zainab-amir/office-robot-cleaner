/**
 * Represents a point in the grid system. It is used for tracking robot
 * position in the office
 */
export type Point = {
  x: number;
  y: number;
};

/**
 * Valid movement directions for the robot
 */
export type Direction = 'north' | 'south' | 'west' | 'east';

/**
 * timedExecution helper function response type
 *
 * @template T - The type of the function response
 */
export type TimedResponse<T> = {
  result: T;
  duration: number;
};
