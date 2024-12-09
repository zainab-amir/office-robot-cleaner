import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  if (await knex.schema.hasTable('executions')) {
    return;
  }

  await knex.schema.createTable('executions', (table) => {
    table.increments('id').primary();
    table.timestamp('timestamp').notNullable().defaultTo(knex.fn.now());
    table.integer('commands').notNullable();
    table.integer('result').notNullable();
    table.float('duration').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('executions');
}
