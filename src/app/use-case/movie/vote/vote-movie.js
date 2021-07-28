const InputBoundary = require('./input-boundary');
const OutputBoundary = require('./output-boundary');
const MovieVote = require('../../../../domain/entities/movie-vote');
const { ValidationError } = require('../../../../shared/utils/errors');


module.exports = class VoteMovieUseCase {
  constructor({ movieVoteRepository, movieRepository, userRepository, validateUserService } = {}) {
    this.movieVoteRepository = movieVoteRepository;
    this.movieRepository = movieRepository;
    this.userRepository = userRepository;
    this.validateUserService = validateUserService;
  }

  async handle(input) {
    const inputBoundary = new InputBoundary(input);
    const { userId, movieId, note } = inputBoundary;

    await this.validateUserService.validateAdmin({ id: userId });
    await this.movieRepository.fetchOne({ id: movieId });

    if (note > 4 || note < 0) throw new ValidationError('Nota invalida');
    const movie = new MovieVote(inputBoundary);
    const movieVoteCreated = await this.movieVoteRepository.create(movie);

    return new OutputBoundary(movieVoteCreated);
  }
};
