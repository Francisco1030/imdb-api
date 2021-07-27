const InputBoundary = require('./input-boundary');
const OutputBoundary = require('./output-boundary');
const { UnauthorizedError } = require('../../../../shared/utils/errors');

module.exports = class VerifyAccessTokenAuthUseCase {
  constructor({ accessTokenAdapter } = {}) {
    this.accessTokenAdapter = accessTokenAdapter;
  }

  async handle(input) {
    const inputBoundary = new InputBoundary(input);

    const [, token] = inputBoundary.accessToken.split(' ');
    const decoded = this.accessTokenAdapter.decode(token);

    if (!decoded) throw new UnauthorizedError('Token inválido');

    return decoded;

    // return new OutputBoundary(userAdminCreated);
  }
};
