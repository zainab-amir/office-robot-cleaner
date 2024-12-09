import knex from 'knex';

import { loadEnv } from '../config/config';
import knexConfig from '../config/knexfile';

async function runMigrations() {
  const appConfig = loadEnv();
  const environment = appConfig.NODE_ENV;
  const db = knex(knexConfig[environment]);

  try {
    console.log(`Running migrations for ${environment}`);
    await db.migrate.latest();
    console.log('Migrations completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed with error:', error);
    process.exit(1);
  } finally {
    await db.destroy();
  }
}

runMigrations();
