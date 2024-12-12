import { createHash, timedExecution } from '../helper';
import { X_MAX, X_MIN, Y_MAX, Y_MIN } from '../constants';

describe('Helper Tests', () => {
  describe('createHash', () => {
    it('should handle edge cases within valid range', () => {
      const yMaxHash = createHash(1, Y_MAX);
      const nearYMaxHash = createHash(0, Y_MAX);
      expect(yMaxHash).not.toBe(nearYMaxHash);

      const xMaxHash = createHash(X_MAX, Y_MIN);
      const nearXMaxHash = createHash(X_MAX, Y_MIN + 1);
      expect(xMaxHash).not.toBe(nearXMaxHash);

      const mixedHash1 = createHash(X_MAX, Y_MIN);
      const mixedHash2 = createHash(X_MIN, Y_MAX);
      expect(mixedHash1).not.toBe(mixedHash2);
    });

    it('should return same hash for same inputs', () => {
      const point = { x: 42, y: -73 };
      const hash1 = createHash(point.x, point.y);
      const hash2 = createHash(point.x, point.y);

      expect(hash1).toBe(hash2);
    });
  });

  describe('timedExecution', () => {
    it('should measure correct duration with mocked time', () => {
      const startTime = 1000;
      const endTime = 1500;
      const originalNow = performance;
      performance = {
        ...originalNow,
        now: jest.fn().mockReturnValueOnce(startTime).mockReturnValueOnce(endTime),
      };

      type TestFn = (x: number) => number;
      const testFn: TestFn = (x) => x * 2;
      const timedFn = timedExecution(testFn);

      const { result, duration } = timedFn(21);

      expect(result).toBe(42);
      expect(duration).toBe((endTime - startTime) / 1000);
      expect(performance.now).toHaveBeenCalledTimes(2);

      performance = originalNow;
    });
  });
});
