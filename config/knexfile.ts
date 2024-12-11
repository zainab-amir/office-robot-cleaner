import { Knex } from 'knex';
import path from 'path';

import { loadEnv } from './app.config';

const appConfig = loadEnv();

const knexConfig: { [key: string]: Knex.Config } = {
  development: {
    client: appConfig.DB_CLIENT,
    connection: {
      host: appConfig.DB_HOST,
      port: appConfig.DB_PORT,
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
  production: {
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
  test: {
    client: appConfig.DB_CLIENT,
    connection: {
      host: appConfig.DB_HOST,
      user: appConfig.DB_USER,
      port: appConfig.DB_PORT,
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
};

export default knexConfig;
