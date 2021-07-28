const ControllerErros = require('../controller-erros');
const HttpResponse = require('../../helpers/http-response');

module.exports = class ListingMovieController {
  constructor({ listingMovieUseCase, verifyAccessTokenAuthUseCase } = {}) {
    this.listingMovieUseCase = listingMovieUseCase;
    this.verifyAccessTokenAuthUseCase = verifyAccessTokenAuthUseCase;
  }

  async handle(httpRequest) {
    try {
      const filters = httpRequest.query;
      const accessToken = httpRequest.headers.authorization;
      const user = await this.verifyAccessTokenAuthUseCase.handle({ accessToken });

      const movies = await this.listingMovieUseCase.handle({
        filters,
        userId: user.id
      });

      return HttpResponse.ok(movies);
    } catch (error) {
      return ControllerErros.handle(error);
    }
  }
};
