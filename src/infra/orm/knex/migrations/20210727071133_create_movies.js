exports.up = (knex) =>
  knex.schema.createTable('movies', (table) => {
    table.uuid('id').primary();
    table.string('name').notNullable();
    table.string('description').notNullable();
    table.string('genre').notNullable();
    table.string('author').notNullable();
    table.string('director').notNullable();
    table.datetime('createdAt').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table.datetime('updatedAt').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table.datetime('deletedAt').nullable();
  });

exports.down = (knex) => knex.schema.dropTable('movies');
