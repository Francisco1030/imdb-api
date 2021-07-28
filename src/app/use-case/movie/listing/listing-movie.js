const InputBoundary = require('./input-boundary');
const OutputBoundary = require('./output-boundary');
module.exports = class ListingMovieUseCase {
  constructor({ movieRepository, userRepository, validateUserService } = {}) {
    this.movieRepository = movieRepository;
    this.userRepository = userRepository;
    this.validateUserService = validateUserService;
  }

  async handle(input) {
    const inputBoundary = new InputBoundary(input);
    const { userId, filters } = inputBoundary;

    await this.validateUserService.validateAdmin({ id: userId });

    const movies = await this.movieRepository.fetchAll(filters);

    return movies.map(movie => new OutputBoundary(movie))
  }
};
