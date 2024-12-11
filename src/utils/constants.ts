import { Direction } from './common.types';

export const directionDelta: { [key in Direction]: [number, number] } = {
  north: [0, 1],
  south: [0, -1],
  west: [-1, 0],
  east: [1, 0],
};

export const X_MAX = 100000;
export const Y_MAX = 100000;
export const X_MIN = -100000;
export const Y_MIN = -100000;

export const COMMAND_LIMIT = 10000;
export const STEPS_LIMIT = 100000;

// Minimum multiplier needed to avoid collision
export const HASH_MULTIPLIER = Y_MAX + Math.abs(Y_MIN) + 1;
