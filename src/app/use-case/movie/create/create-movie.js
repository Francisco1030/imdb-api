const InputBoundary = require('./input-boundary');
const OutputBoundary = require('./output-boundary');
const { ValidationError } = require('../../../../shared/utils/errors');
const Movie = require('../../../../domain/entities/movie');


module.exports = class CreateMovieUseCase {
  constructor({ movieRepository, userRepository } = {}) {
    this.movieRepository = movieRepository;
    this.userRepository = userRepository;
  }

  async handle(input) {
    const inputBoundary = new InputBoundary(input);
    const { userId } = inputBoundary;
    const persistedUser = await this.userRepository.fetchOne({ id: userId });
    const roleIdAdmin = '8609e912-c66b-4a21-8a38-d2ee0f881d11';

    if (persistedUser.roleId !== roleIdAdmin) throw new ValidationError('Usuario não é admin');
    const movie = new Movie(inputBoundary);
    const movieCreated = await this.movieRepository.create(movie);

    return new OutputBoundary(movieCreated);
  }
};
