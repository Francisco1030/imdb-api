require('./bootstrap');
const { DB_CLIENT, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } = process.env;

module.exports = {
  development: {
    client: DB_CLIENT || 'mysql',
    connection: {
      host: DB_HOST || 'localhost',
      user: DB_USER || 'root',
      password: DB_PASSWORD || 'root',
      database: DB_NAME || 'imdb_api',
      charset: 'utf8',
      port: DB_PORT || '3306',
    },
    migrations: {
      directory: '../orm/knex/migrations',
    },
    pool: {
      min: 2,
      max: 10,
    },
  }
};
