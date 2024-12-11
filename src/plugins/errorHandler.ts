import { FastifyError, FastifyInstance, FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

/**
 * Centralized error handling for the application
 *
 * @param fastify - Fastify instance
 */
const errorHandler: FastifyPluginAsync = async (fastify: FastifyInstance): Promise<void> => {
  fastify.setErrorHandler((error: FastifyError, request, reply) => {
    if (error.code === 'FST_ERR_VALIDATION') {
      return error;
    }

    fastify.log.error(error);
    return reply.status(500).send({
      error: 'Internal Server Error',
      message: 'Something went wrong. Please try again later.',
    });
  });
};

export default fp(errorHandler, { name: 'errorHandler' });
