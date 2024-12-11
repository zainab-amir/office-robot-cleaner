import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

import { RobotManager } from '../repositories/robot';
import { IRobotManager } from '../repositories/robot.types';

declare module 'fastify' {
  interface FastifyInstance {
    robotDB: IRobotManager;
  }
}

/**
 * Plugin to provide access to RobotManager (access to the robot related database operations)
 *
 * @param fastify - Fastify instance
 */
async function robotDBPlugin(fastify: FastifyInstance) {
  fastify.decorate('robotDB', new RobotManager(fastify.knex));
}

export default fp(robotDBPlugin, {
  name: 'robotDB',
});
