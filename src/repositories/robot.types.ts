export interface IRobotManager {
  createCleaningReport(data: ExecutionData): Promise<Execution>;
}

/**
 * Data required to create a cleaning execution record
 */
export type ExecutionData = {
  commands: number;
  result: number;
  duration: number;
};

/**
 * Complete cleaning execution record from database.
 * Extends ExecutionData with fields from the database
 */
export type Execution = {
  id: number;
  timestamp: Date;
} & ExecutionData;
