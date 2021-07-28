const InputBoundary = require('./input-boundary');
const OutputBoundary = require('./output-boundary');
const { ValidationError } = require('../../../../shared/utils/errors');
const MovieVote = require('../../../../domain/entities/movie-vote');


module.exports = class VoteMovieUseCase {
  constructor({ movieVoteRepository, movieRepository, userRepository } = {}) {
    this.movieVoteRepository = movieVoteRepository;
    this.movieRepository = movieRepository;
    this.userRepository = userRepository;
  }

  async handle(input) {
    const inputBoundary = new InputBoundary(input);
    const { userId, movieId, note } = inputBoundary;
    const persistedUser = await this.userRepository.fetchOne({ id: userId });
    const roleIdAdmin = '8609e912-c66b-4a21-8a38-d2ee0f881d11';
    if (persistedUser.roleId !== roleIdAdmin) throw new ValidationError('Usuario não é admin');
    await this.movieRepository.fetchOne({ id: movieId });

    if (note > 4 || note < 0) throw new ValidationError('Nota invalida');
    const movie = new MovieVote(inputBoundary);
    const movieVoteCreated = await this.movieVoteRepository.create(movie);

    return new OutputBoundary(movieVoteCreated);
  }
};
