const LoginAuthUseCase = require('../../../app/use-case/auth/login/login-auth');
const LoginAuthController = require('../../../presenters/controlles/auth/login/login-auth-controller');
const KnexUserRepository = require('../../../infra/repositories/knex/knex-user-repository');
const BcryptAdpter = require('../../adapters/bcrypt-adpter');
const JwtAccessTokenAdapter = require('../../adapters/jwt-access-token-adapter');

module.exports = class LoginAuthRouterComposer {
  static compose() {
    const loginAuthUseCase = new LoginAuthUseCase({
      accessTokenAdapter: new JwtAccessTokenAdapter(),
      cryptAdapter: new BcryptAdpter(),
      userRepository: new KnexUserRepository()
    });

    return new LoginAuthController({
      loginAuthUseCase
    });
  }
};
