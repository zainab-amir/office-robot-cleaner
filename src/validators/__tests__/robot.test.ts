import { cleanOfficeValidationSchema } from '../robot';

describe('Clean Office Validation Schema', () => {
  describe('start coordinates validation', () => {
    test('validate valid start coordinates', () => {
      const payload = {
        start: { x: 0, y: 0 },
        commands: [{ direction: 'north', steps: 1 }],
      };

      const result = cleanOfficeValidationSchema.validate(payload);
      expect(result.error).toBeUndefined();
    });

    test('validate missing start object', () => {
      const payload = {
        commands: [{ direction: 'north', steps: 1 }],
      };

      const result = cleanOfficeValidationSchema.validate(payload);
      expect(result.error?.details[0].message).toContain('"start" is required');
    });

    test('validate missing x coordinate', () => {
      const payload = {
        start: { y: 0 },
        commands: [{ direction: 'north', steps: 1 }],
      };

      const result = cleanOfficeValidationSchema.validate(payload);
      expect(result.error?.details[0].message).toContain('"start.x" is required');
    });

    test('validate missing y coordinate', () => {
      const payload = {
        start: { x: 0 },
        commands: [{ direction: 'north', steps: 1 }],
      };

      const result = cleanOfficeValidationSchema.validate(payload);
      expect(result.error?.details[0].message).toContain('"start.y" is required');
    });

    test('reject x coordinate above maximum', () => {
      const payload = {
        start: { x: 100001, y: 0 },
        commands: [{ direction: 'north', steps: 1 }],
      };

      const result = cleanOfficeValidationSchema.validate(payload);
      expect(result.error?.details[0].message).toContain('"start.x" must be less than or equal to 100000');
    });

    test('reject x coordinate below minimum', () => {
      const payload = {
        start: { x: -100001, y: 0 },
        commands: [{ direction: 'north', steps: 1 }],
      };

      const result = cleanOfficeValidationSchema.validate(payload);
      expect(result.error?.details[0].message).toContain('"start.x" must be greater than or equal to -100000');
    });

    test('reject non-integer x coordinate', () => {
      const payload = {
        start: { x: 1.5, y: 0 },
        commands: [{ direction: 'north', steps: 1 }],
      };

      const result = cleanOfficeValidationSchema.validate(payload);
      expect(result.error?.details[0].message).toContain('"start.x" must be an integer');
    });
  });

  describe('commands validation', () => {
    test('validate valid commands array', () => {
      const payload = {
        start: { x: 0, y: 0 },
        commands: [
          { direction: 'north', steps: 1 },
          { direction: 'east', steps: 2 },
          { direction: 'south', steps: 3 },
          { direction: 'west', steps: 4 },
        ],
      };

      const result = cleanOfficeValidationSchema.validate(payload);
      expect(result.error).toBeUndefined();
    });

    test('validate missing commands array', () => {
      const payload = {
        start: { x: 0, y: 0 },
      };

      const result = cleanOfficeValidationSchema.validate(payload);
      expect(result.error?.details[0].message).toContain('"commands" is required');
    });

    test('should reject array exceeding maximum length', () => {
      const commands = Array(10001).fill({ direction: 'north', steps: 1 });
      const payload = {
        start: { x: 0, y: 0 },
        commands,
      };

      const result = cleanOfficeValidationSchema.validate(payload);
      expect(result.error?.details[0].message).toContain('"commands" must contain less than or equal to 10000 items');
    });

    test('validate invalid direction', () => {
      const payload = {
        start: { x: 0, y: 0 },
        commands: [{ direction: 'northeast', steps: 1 }],
      };

      const result = cleanOfficeValidationSchema.validate(payload);
      expect(result.error?.details[0].message).toContain(
        '"commands[0].direction" must be one of [north, south, west, east]',
      );
    });

    test('validate missing direction', () => {
      const payload = {
        start: { x: 0, y: 0 },
        commands: [{ steps: 1 }],
      };

      const result = cleanOfficeValidationSchema.validate(payload);
      expect(result.error?.details[0].message).toContain('"commands[0].direction" is required');
    });

    test('reject zero steps', () => {
      const payload = {
        start: { x: 0, y: 0 },
        commands: [{ direction: 'north', steps: 0 }],
      };

      const result = cleanOfficeValidationSchema.validate(payload);
      expect(result.error?.details[0].message).toContain('"commands[0].steps" must be a positive number');
    });

    test('reject steps exceeding maximum', () => {
      const payload = {
        start: { x: 0, y: 0 },
        commands: [{ direction: 'north', steps: 100001 }],
      };

      const result = cleanOfficeValidationSchema.validate(payload);
      expect(result.error?.details[0].message).toContain('"commands[0].steps" must be less than or equal to 100000');
    });

    test('reject non-number steps', () => {
      const payload = {
        start: { x: 0, y: 0 },
        commands: [{ direction: 'north', steps: 'ten' }],
      };

      const result = cleanOfficeValidationSchema.validate(payload);
      expect(result.error?.details[0].message).toContain('"commands[0].steps" must be a number');
    });
  });
});
