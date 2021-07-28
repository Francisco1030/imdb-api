const uuid = require('uuid').v4;
const MovieVote = require('../../domain/entities/movie-vote');

module.exports = class MovieVoteFactory {
  static async create(data) {
    const movieVote = new MovieVote({
      ...data,
      id: uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    });

    return movieVote;
  }
};
