const ControllerErros = require('../controller-erros');
const HttpResponse = require('../../helpers/http-response');

module.exports = class DetailMovieController {
  constructor({ detailMovieUseCase, verifyAccessTokenAuthUseCase } = {}) {
    this.detailMovieUseCase = detailMovieUseCase;
    this.verifyAccessTokenAuthUseCase = verifyAccessTokenAuthUseCase;
  }

  async handle(httpRequest) {
    try {
      const { id } = httpRequest.params;
      const accessToken = httpRequest.headers.authorization;
      const user = await this.verifyAccessTokenAuthUseCase.handle({ accessToken });

      const movie = await this.detailMovieUseCase.handle({
        userId: user.id,
        id
      });

      return HttpResponse.ok(movie);
    } catch (error) {
      return ControllerErros.handle(error);
    }
  }
};
