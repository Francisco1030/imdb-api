const ListingMovieUseCase = require('../../../app/use-case/movie/listing/listing-movie');
const ListingMovieController = require('../../../presenters/controlles/movie/listing-movie-controller');
const VerifyAccessTokenAuthUseCase = require('../../../app/use-case/auth/verify-access-token/verify-access-token-auth');
const JwtAccessTokenAdapter = require('../../adapters/jwt-access-token-adapter');
const KnexMovieRepository = require('../../../infra/repositories/knex/knex-movie-repository');
const KnexUserRepository = require('../../../infra/repositories/knex/knex-user-repository');

module.exports = class ListingMovieRouterComposer {
  static compose() {
    const listingMovieUseCase = new ListingMovieUseCase({
      movieRepository: new KnexMovieRepository(),
      userRepository: new KnexUserRepository()
    });

    const verifyAccessTokenAuthUseCase = new VerifyAccessTokenAuthUseCase({
      accessTokenAdapter: new JwtAccessTokenAdapter()
    });

    return new ListingMovieController({
      listingMovieUseCase,
      verifyAccessTokenAuthUseCase
    });
  }
};
