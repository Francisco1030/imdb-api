const CreateMovieUseCase = require('../../../app/use-case/movie/create/create-movie');
const CreateMovieController = require('../../../presenters/controlles/movie/create-movie-controller');
const VerifyAccessTokenAuthUseCase = require('../../../app/use-case/auth/verify-access-token/verify-access-token-auth');
const JwtAccessTokenAdapter = require('../../adapters/jwt-access-token-adapter');
const KnexMovieRepository = require('../../../infra/repositories/knex/knex-movie-repository');
const KnexUserRepository = require('../../../infra/repositories/knex/knex-user-repository');
const MovieFactory = require('../../factories/movie-factory');

module.exports = class CreateMovieRouterComposer {
  static compose() {
    const createMovieUseCase = new CreateMovieUseCase({
      movieRepository: new KnexMovieRepository(),
      userRepository: new KnexUserRepository()
    });

    const verifyAccessTokenAuthUseCase = new VerifyAccessTokenAuthUseCase({
      accessTokenAdapter: new JwtAccessTokenAdapter()
    });

    return new CreateMovieController({
      createMovieUseCase,
      verifyAccessTokenAuthUseCase,
      movieFactory: MovieFactory
    });
  }
};
