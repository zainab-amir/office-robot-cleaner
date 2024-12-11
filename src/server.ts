import dotenv from 'dotenv';
import Fastify from 'fastify';

import App from './app';

// Load environment variables from .env
dotenv.config();

// override the environment variables using the .env.local file
if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: '.env.local', override: true });
}

const IS_DEVELOPMENT_ENV = process.env.NODE_ENV !== 'production';

const prodLoggerOptions = {
  level: 'error',
};

const devLoggerOptions = {
  level: 'info',
};

async function start() {
  const fastify = Fastify({
    logger: IS_DEVELOPMENT_ENV ? devLoggerOptions : prodLoggerOptions,
  });
  await fastify.register(App);

  const port = Number(process.env.PORT) || 5000;
  const host = process.env.HOST || '0.0.0.0';

  await fastify.listen({ port, host: host });
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
