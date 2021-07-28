const ControllerErros = require('../controller-erros');
const HttpResponse = require('../../helpers/http-response');

module.exports = class VoteMovieController {
  constructor({ voteMovieUseCase, verifyAccessTokenAuthUseCase, movieVoteFactory } = {}) {
    this.voteMovieUseCase = voteMovieUseCase;
    this.verifyAccessTokenAuthUseCase = verifyAccessTokenAuthUseCase;
    this.movieVoteFactory = movieVoteFactory;
  }

  async handle(httpRequest) {
    try {
      const data = httpRequest.body;
      const { movieId } = httpRequest.params;
      const accessToken = httpRequest.headers.authorization;
      const user = await this.verifyAccessTokenAuthUseCase.handle({ accessToken });

      const movieVoteFactory = await this.movieVoteFactory.create({
        ...data,
        movieId,
        userId: user.id
      });

      const movieVoteCreated = await this.voteMovieUseCase.handle(movieVoteFactory);

      return HttpResponse.created({ ...movieVoteCreated });
    } catch (error) {
      return ControllerErros.handle(error);
    }
  }
};
