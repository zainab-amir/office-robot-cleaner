import { Direction } from './common.types';

export const directionDelta: { [key in Direction]: [number, number] } = {
  north: [0, 1],
  south: [0, -1],
  west: [-1, 0],
  east: [1, 0],
};
