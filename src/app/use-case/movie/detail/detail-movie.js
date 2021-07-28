const InputBoundary = require('./input-boundary');
const OutputBoundary = require('./output-boundary');

module.exports = class DetailMovieUseCase {
  constructor({ movieRepository, userRepository, movieVoteRepository, validateUserService } = {}) {
    this.movieRepository = movieRepository;
    this.userRepository = userRepository;
    this.movieVoteRepository = movieVoteRepository;
    this.validateUserService = validateUserService;
  }

  async handle(input) {
    const inputBoundary = new InputBoundary(input);
    const { userId, id } = inputBoundary;
    await this.validateUserService.validateAdmin({ id: userId });

    const votes = await this.movieVoteRepository.fetchAll({ movieId: id });
    const soma = votes.reduce((total, vote) => vote.note + total, 0);
    const average = soma / votes.length;
    const movie = await this.movieRepository.fetchOne({ id });

    return new OutputBoundary({ ...movie, average });
  }
};
