import { Direction, Point } from '../../utils/common.types';

export type Command = {
  direction: Direction;
  steps: number;
};

// Request and Response Types related to robot related routes
export type CleanOfficeRequest = {
  start: Point;
  commands: Command[];
};

export type Range = {
  min: number;
  max: number;
};

// Store ranges for each x or y coordinate
export type LineRanges = {
  ranges: Range[];
  totalPoints: number;
};
