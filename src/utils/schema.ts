/**
 * Schema for robot cleaning execution response
 *
 * @property id - Database ID for the cleaning execution record
 * @property duration - Time taken to complete cleaning in seconds
 * @property timestamp - Timestamp of when cleaning was performed
 * @property commands - Number of commands executed by the robot
 * @property result - Number of unique positions cleaned
 */
export const cleaningReportSchema = {
  $id: 'ExecutionResponse',
  type: 'object',
  properties: {
    id: { type: 'number' },
    duration: { type: 'number' },
    timestamp: { type: 'string' },
    commands: { type: 'number' },
    result: { type: 'number' },
  },
};

/**
 * Standardized error response
 *
 * @property error - Error type
 * @property message - Human readable description
 */
export const errorSchema = {
  $id: 'ErrorResponse',
  type: 'object',
  properties: {
    error: { type: 'string' },
    message: { type: 'string' },
  },
};
