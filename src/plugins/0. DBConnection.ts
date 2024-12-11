import fp from 'fastify-plugin';
import knex, { Knex } from 'knex';
import { FastifyInstance } from 'fastify';
import knexConfig from '../../config/knexfile';

declare module 'fastify' {
  interface FastifyInstance {
    knex: Knex;
  }
}

/**
 * Plugin to provide knex connection specific to the environment
 *
 * @param fastify - Fastify instance
 */
async function knexPlugin(fastify: FastifyInstance) {
  const environment = fastify.config.NODE_ENV;
  const config = knexConfig[environment];

  if (!config) {
    throw new Error(`Knex configuration not found for environment: ${environment}`);
  }

  const db = knex(config);

  fastify.decorate('knex', db);

  // Close connection
  fastify.addHook('onClose', async () => {
    await db.destroy();
  });
}

export default fp(knexPlugin, {
  name: 'knex',
});
