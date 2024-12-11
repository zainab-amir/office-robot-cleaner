import knex from 'knex';
import knexConfig from '../../../config/knexfile';

beforeAll(async () => {
  const db = knex(knexConfig.test);
  await db.migrate.latest();
  await db.destroy();
});

afterAll(async () => {
  const db = knex(knexConfig.test);
  await db.migrate.rollback();
  await db.destroy();
});
