import { TimedResponse } from './common.types';
import { HASH_MULTIPLIER } from './constants';

/**
 * Wrapper function that measures the execution time in seconds of the provided function
 *
 * @template TParams - Array type of parameters that the input function accepts
 * @template TReturn - Return type of the input function
 *
 * @param {(...params: TParams) => TReturn} fn
 *          The function to be timed
 * @returns {(...params: TParams) => TimedResponse<TReturn>}
 *          A function that returns both the original function's
 *          result and its execution time in seconds
 *
 * @example
 * const { result, duration } = timedExecution((a: number, b: number) => a + b)(5, 3);
 * // result: 8
 * // duration: 0.0023 (seconds)
 */
export function timedExecution<TParams extends unknown[], TReturn>(
  fn: (...params: TParams) => TReturn,
): (...params: TParams) => TimedResponse<TReturn> {
  return (...params: TParams) => {
    const start = performance.now();
    const result = fn(...params);
    const end = performance.now();

    return {
      result,
      duration: (end - start) / 1000,
    };
  };
}

/**
 * Creates a unique hash for a 2D coordinate pair (x,y) where both coordinates are integers.
 *
 * @param x - x-coordinate
 * @param y - y-coordinate
 * @returns {number} A unique hash value
 *
 * @example
 * // Lets suppose HASH_MULTIPLIER = 200001;
 * createHash(1, 2)     // Returns 200_003
 * createHash(-5, 3)    // Returns -999_902
 */
export function createHash(x: number, y: number): number {
  return x * HASH_MULTIPLIER + y;
}
