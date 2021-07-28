const DetailMovieUseCase = require('../../../app/use-case/movie/detail/detail-movie');
const DetailMovieController = require('../../../presenters/controlles/movie/detail-movie-controller');
const VerifyAccessTokenAuthUseCase = require('../../../app/use-case/auth/verify-access-token/verify-access-token-auth');
const JwtAccessTokenAdapter = require('../../adapters/jwt-access-token-adapter');
const KnexMovieRepository = require('../../../infra/repositories/knex/knex-movie-repository');
const KnexMovieVoteRepository = require('../../../infra/repositories/knex/knex-movie-vote-repository');
const KnexUserRepository = require('../../../infra/repositories/knex/knex-user-repository');
const ValidateUserService = require('../../../infra/services/validate-user-service');

module.exports = class DetailMovieRouterComposer {
  static compose() {
    const userRepository = new KnexUserRepository();
    const validateUserService = new ValidateUserService({
      userRepository
    });

    const detailMovieUseCase = new DetailMovieUseCase({
      userRepository,
      validateUserService,
      movieRepository: new KnexMovieRepository(),
      movieVoteRepository: new KnexMovieVoteRepository()
    });

    const verifyAccessTokenAuthUseCase = new VerifyAccessTokenAuthUseCase({
      accessTokenAdapter: new JwtAccessTokenAdapter()
    });

    return new DetailMovieController({
      detailMovieUseCase,
      verifyAccessTokenAuthUseCase
    });
  }
};
