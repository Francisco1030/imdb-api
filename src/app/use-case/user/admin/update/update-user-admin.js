const InputBoundary = require('./input-boundary');
const OutputBoundary = require('./output-boundary');
const User = require('../../../../../domain/entities/user');
const { ValidationError } = require('../../../../../shared/utils/errors');

module.exports = class UpdateUserAdminUseCase {
  constructor({ userRepository } = {}) {
    this.userRepository = userRepository;
  }

  async handle(input) {
    const inputBoundary = new InputBoundary(input);
    const persistedUser = await this.userRepository.fetchOne(inputBoundary.id);

    if (persistedUser.roleId !== 'roleId-admin') throw new ValidationError('Usuario não é admin');
    const user = new User(persistedUser);
    const userAdminUpdated = await this.userRepository.update(user);

    return new OutputBoundary(userAdminUpdated);
  }
};
