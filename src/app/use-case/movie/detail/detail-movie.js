const InputBoundary = require('./input-boundary');
const OutputBoundary = require('./output-boundary');
const { ValidationError } = require('../../../../shared/utils/errors');

module.exports = class DetailMovieUseCase {
  constructor({ movieRepository, userRepository, movieVoteRepository } = {}) {
    this.movieRepository = movieRepository;
    this.userRepository = userRepository;
    this.movieVoteRepository = movieVoteRepository;
  }

  async handle(input) {
    const inputBoundary = new InputBoundary(input);
    const { userId, id } = inputBoundary;
    const persistedUser = await this.userRepository.fetchOne({ id: userId });
    const roleIdAdmin = '8609e912-c66b-4a21-8a38-d2ee0f881d11';

    if (persistedUser.roleId !== roleIdAdmin) throw new ValidationError('Usuario não é admin');

    const votes = await this.movieVoteRepository.fetchAll({ movieId: id });
    const soma = votes.reduce((total, vote) => vote.note + total, 0);
    const average = soma / votes.length;
    const movie = await this.movieRepository.fetchOne({ id });

    return new OutputBoundary({ ...movie, average });
  }
};
