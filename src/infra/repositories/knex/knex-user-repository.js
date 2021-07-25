const KnexBaseRepository = require('./knex-base-crud-repository');
const User = require('../../../domain/entities/user');

module.exports = class KnexUserRepository extends KnexBaseRepository {
  constructor() {
    super();
  }

  get entity() {
    return User;
  }

  get table() {
    return 'users';
  }
};
