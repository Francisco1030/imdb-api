const uuid = require('uuid').v4;
const Movie = require('../../domain/entities/movie');

module.exports = class MovieFactory {
  static async create(data) {
    const movie = new Movie({
      ...data,
      id: uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    });

    return movie;
  }
};
