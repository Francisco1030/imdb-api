const DetailMovieUseCase = require('../../../app/use-case/movie/detail/detail-movie');
const DetailMovieController = require('../../../presenters/controlles/movie/detail-movie-controller');
const VerifyAccessTokenAuthUseCase = require('../../../app/use-case/auth/verify-access-token/verify-access-token-auth');
const JwtAccessTokenAdapter = require('../../adapters/jwt-access-token-adapter');
const KnexMovieRepository = require('../../../infra/repositories/knex/knex-movie-repository');
const KnexMovieVoteRepository = require('../../../infra/repositories/knex/knex-movie-vote-repository');
const KnexUserRepository = require('../../../infra/repositories/knex/knex-user-repository');

module.exports = class DetailMovieRouterComposer {
  static compose() {
    const detailMovieUseCase = new DetailMovieUseCase({
      movieRepository: new KnexMovieRepository(),
      userRepository: new KnexUserRepository(),
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
