const VoteMovieUseCase = require('../../../app/use-case/movie/vote/vote-movie');
const VoteMovieController = require('../../../presenters/controlles/movie/vote-movie-controller');
const VerifyAccessTokenAuthUseCase = require('../../../app/use-case/auth/verify-access-token/verify-access-token-auth');
const JwtAccessTokenAdapter = require('../../adapters/jwt-access-token-adapter');
const KnexMovieVoteRepository = require('../../../infra/repositories/knex/knex-movie-vote-repository');
const KnexMovieRepository = require('../../../infra/repositories/knex/knex-movie-repository');
const KnexUserRepository = require('../../../infra/repositories/knex/knex-user-repository');
const MovieVoteFactory = require('../../factories/movie-vote-factory');
const ValidateUserService = require('../../../infra/services/validate-user-service');

module.exports = class VoteMovieRouterComposer {
  static compose() {
    const userRepository = new KnexUserRepository();
    const validateUserService = new ValidateUserService({
      userRepository
    });

    const voteMovieUseCase = new VoteMovieUseCase({
      userRepository,
      validateUserService,
      movieRepository: new KnexMovieRepository(),
      movieVoteRepository: new KnexMovieVoteRepository()
    });

    const verifyAccessTokenAuthUseCase = new VerifyAccessTokenAuthUseCase({
      accessTokenAdapter: new JwtAccessTokenAdapter()
    });

    return new VoteMovieController({
      voteMovieUseCase,
      verifyAccessTokenAuthUseCase,
      movieVoteFactory: MovieVoteFactory
    });
  }
};
