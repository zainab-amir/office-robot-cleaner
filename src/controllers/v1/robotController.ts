import { FastifyReply, FastifyRequest } from 'fastify';

import { getUniquePlacesCleaned } from '../../services/robot/robotService';
import { CleanOfficeRequest } from '../../services/robot/robotService.types';
import { timedExecution } from '../../utils/helper';

/**
 * Controller for office cleaning requests.
 * Executes cleaning commands, measures execution time, and stores cleaning report
 * in the db.
 *
 * @returns Execution table record (Cleaning report ID, timestamp, number of commands,
 * unique places cleaned, and duration)
 */
export const cleanOfficeHandler = async (req: FastifyRequest<{ Body: CleanOfficeRequest }>, res: FastifyReply) => {
  const { duration, result: uniquePlacesCleaned } = timedExecution(getUniquePlacesCleaned)(
    req.body.start,
    req.body.commands,
  );

  const report = await req.server.robotDB.createCleaningReport({
    commands: req.body.commands.length,
    result: uniquePlacesCleaned,
    duration,
  });

  res.send({ ...report });
};
