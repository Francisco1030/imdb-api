const ControllerErros = require('../controller-erros');
const HttpResponse = require('../../helpers/http-response');

module.exports = class CreateMovieController {
  constructor({ createMovieUseCase, verifyAccessTokenAuthUseCase, movieFactory } = {}) {
    this.createMovieUseCase = createMovieUseCase;
    this.verifyAccessTokenAuthUseCase = verifyAccessTokenAuthUseCase;
    this.movieFactory = movieFactory;
  }

  async handle(httpRequest) {
    try {
      const data = httpRequest.body;
      const accessToken = httpRequest.headers.authorization;
      const user = await this.verifyAccessTokenAuthUseCase.handle({ accessToken });

      const movieFactory = await this.movieFactory.create(data);
      const movieCreated = await this.createMovieUseCase.handle({
        ...movieFactory,
        userId: user.id
      });

      return HttpResponse.created({ ...movieCreated });
    } catch (error) {
      return ControllerErros.handle(error);
    }
  }
};
