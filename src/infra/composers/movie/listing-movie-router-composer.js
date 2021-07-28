const ListingMovieUseCase = require('../../../app/use-case/movie/listing/listing-movie');
const ListingMovieController = require('../../../presenters/controlles/movie/listing-movie-controller');
const VerifyAccessTokenAuthUseCase = require('../../../app/use-case/auth/verify-access-token/verify-access-token-auth');
const JwtAccessTokenAdapter = require('../../adapters/jwt-access-token-adapter');
const KnexMovieRepository = require('../../../infra/repositories/knex/knex-movie-repository');
const KnexUserRepository = require('../../../infra/repositories/knex/knex-user-repository');
const ValidateUserService = require('../../../infra/services/validate-user-service');

module.exports = class ListingMovieRouterComposer {
  static compose() {
    const userRepository = new KnexUserRepository();
    const validateUserService = new ValidateUserService({
      userRepository
    });

    const listingMovieUseCase = new ListingMovieUseCase({
      userRepository,
      validateUserService,
      movieRepository: new KnexMovieRepository()
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
