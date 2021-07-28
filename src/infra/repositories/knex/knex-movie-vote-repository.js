const KnexBaseRepository = require('./knex-base-crud-repository');
const MovieVote = require('../../../domain/entities/movie-vote');

module.exports = class KnexMovieVoteRepository extends KnexBaseRepository {
  constructor() {
    super();
  }

  get entity() {
    return MovieVote;
  }

  get table() {
    return 'movie_votes';
  }
};
