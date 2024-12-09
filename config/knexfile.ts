import { Knex } from 'knex';
import path from 'path';

import { loadEnv } from './config';

const appConfig = loadEnv();

const knexConfig: { [key: string]: Knex.Config } = {
  development: {
    client: appConfig.DB_CLIENT,
    connection: {
      host: appConfig.DB_HOST,
      user: appConfig.DB_USER,
      password: appConfig.DB_PASSWORD,
      database: appConfig.DB_NAME,
    },
    pool: {
      min: appConfig.DB_POOL_MIN,
      max: appConfig.DB_POOL_MAX,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: path.join(__dirname, '..', '/src/db/migrations'),
    },
  },
  // TODO: Add production and add test config
};

export default knexConfig;
