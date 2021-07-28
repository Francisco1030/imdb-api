const InputBoundary = require('./input-boundary');
const OutputBoundary = require('./output-boundary');
const Movie = require('../../../../domain/entities/movie');

module.exports = class CreateMovieUseCase {
  constructor({ movieRepository, userRepository, validateUserService } = {}) {
    this.movieRepository = movieRepository;
    this.userRepository = userRepository;
    this.validateUserService = validateUserService;
  }

  async handle(input) {
    const inputBoundary = new InputBoundary(input);
    const { userId } = inputBoundary;

    await this.validateUserService.validateAdmin({ id: userId });

    const movie = new Movie(inputBoundary);
    const movieCreated = await this.movieRepository.create(movie);

    return new OutputBoundary(movieCreated);
  }
};
