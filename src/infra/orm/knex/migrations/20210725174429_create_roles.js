exports.up = async (knex) => {
  await knex.schema.createTable('roles', async (table) => {
    table.uuid('id').primary();
    table.string('name').notNullable();
    table.unique(['name']);
  });

  const roles = [
    {
      id: '8609e912-c66b-4a21-8a38-d2ee0f881d11',
      name: 'ADMIN'
    },
    {
      id: 'd0fd3a89-486f-4826-ba8b-71e5191867c7',
      name: 'COMMON'
    }
  ];
  await knex.batchInsert('roles', roles, 2);
};

exports.down = (knex) => knex.schema.dropTable('roles');
