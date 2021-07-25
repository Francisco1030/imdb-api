exports.up = (knex) =>
  knex.schema.createTable('users', (table) => {
    table.uuid('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.uuid('roleId').notNullable();
    table.datetime('createdAt').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table.datetime('updatedAt').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table.datetime('deletedAt').nullable();
    table.unique(['email']);
  });

exports.down = (knex) => knex.schema.dropTable('users');
