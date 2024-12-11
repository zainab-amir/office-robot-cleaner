import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import path from 'path';
import Env from '@fastify/env';
import AutoLoad from '@fastify/autoload';
import Cors from '@fastify/cors';
import { errorSchema, cleaningReportSchema } from './utils/schema';
import { AppEnvConfig, appEnvConfig } from '../config/app.config';

declare module 'fastify' {
  interface FastifyInstance {
    config: AppEnvConfig;
  }
}

/**
 * This is the entry point of our application.
 */
async function App(fastify: FastifyInstance, opts: FastifyPluginOptions) {
  // Register common response schemas
  fastify.addSchema(cleaningReportSchema);
  fastify.addSchema(errorSchema);

  // Expose and validate app configuration
  await fastify.register(Env, { schema: appEnvConfig, dotenv: true, data: process.env });

  // Enable CORS
  await fastify.register(Cors, {
    origin: fastify.config.ALLOWED_DOMAINS ? [fastify.config.ALLOWED_DOMAINS] : false,
  });

  // Load all plugins
  await fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts),
  });

  // Load all routes
  await fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    dirNameRoutePrefix: false,
    options: Object.assign({ prefix: '/tibber-developer-test' }, opts),
  });
}

export default App;
