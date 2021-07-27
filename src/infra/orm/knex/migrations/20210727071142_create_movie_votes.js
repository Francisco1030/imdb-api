exports.up = (knex) =>
  knex.schema.createTable('movie_votes', (table) => {
    table.uuid('id').primary();
    table.specificType('note', 'double precision').notNullable();
    table.uuid('movieId').notNullable();
    table.uuid('userId').notNullable();
    table.datetime('createdAt').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table.datetime('updatedAt').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table.datetime('deletedAt').nullable();
  });

exports.down = (knex) => knex.schema.dropTable('movie_votes');
