const InputBoundary = require('./input-boundary');
const OutputBoundary = require('./output-boundary');
const User = require('../../../../../domain/entities/user');
const { ValidationError } = require('../../../../../shared/utils/errors');

module.exports = class UpdateUserCommonUseCase {
  constructor({ userRepository } = {}) {
    this.userRepository = userRepository;
  }

  async handle(input) {
    const inputBoundary = new InputBoundary(input);
    const persistedUser = await this.userRepository.fetchOne(inputBoundary.id);

    if (persistedUser.roleId !== 'roleId-common') throw new ValidationError('Usuario é admin');
    const user = new User(persistedUser);
    const userCommunUpdated = await this.userRepository.update(user);

    return new OutputBoundary(userCommunUpdated);
  }
};
