import { Knex } from 'knex';

import { Execution, ExecutionData, IRobotManager } from './robot.types';

/**
 * Manages robot cleaning database operations.
 */
export class RobotManager implements IRobotManager {
  private readonly db;

  /**
   * @param connection - Knex database connection instance
   */
  constructor(connection: Knex) {
    this.db = connection;
  }

  /**
   * Creates a cleaning execution report in the database
   *
   * @param data - Execution data including command count, result, and duration
   * @returns Created execution record with db id, timestamp, command count, result and duration.
   */
  async createCleaningReport(data: ExecutionData): Promise<Execution> {
    return this.db('executions')
      .insert(data)
      .returning('*')
      .then((result) => result[0]);
  }
}
