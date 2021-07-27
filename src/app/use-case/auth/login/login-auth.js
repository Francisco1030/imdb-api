const InputBoundary = require('./input-boundary');
const OutputBoundary = require('./output-boundary');
const { ValidationError, NotFoundError } = require('../../../../shared/utils/errors');

module.exports = class LoginAuthUseCase {
  constructor({ accessTokenAdapter, userRepository, cryptAdapter } = {}) {
    this.accessTokenAdapter = accessTokenAdapter;
    this.userRepository = userRepository;
    this.cryptAdapter = cryptAdapter;
  }

  async handle(input) {
    const inputBoundary = new InputBoundary(input);
    const user = await this.userRepository.fetchOne({ email: inputBoundary.email });
    if (!user) throw new NotFoundError('Usuario não encontrado');

    const samePasswords = await this.cryptAdapter.decryptPassword(input.password, user.password);
    if (!samePasswords) throw new ValidationError('Usuário ou senha invalido');

    const accessToken = this.accessTokenAdapter.generate({
      id: user.id,
      name: user.name
    });

    return new OutputBoundary({ accessToken });
  }
};
