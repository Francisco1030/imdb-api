const KnexBaseRepository = require('./knex-base-crud-repository');
const Movie = require('../../../domain/entities/movie');

module.exports = class KnexMovieRepository extends KnexBaseRepository {
  constructor() {
    super();
  }

  get entity() {
    return Movie;
  }

  get table() {
    return 'movies';
  }
};
