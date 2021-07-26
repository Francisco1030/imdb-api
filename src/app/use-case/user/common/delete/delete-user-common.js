const InputBoundary = require('./input-boundary');
const OutputBoundary = require('./output-boundary');
const User = require('../../../../../domain/entities/user');
const { ValidationError } = require('../../../../../shared/utils/errors');

module.exports = class DeleteUserCommonUseCase {
  constructor({ userRepository } = {}) {
    this.userRepository = userRepository;
  }

  async handle(input) {
    const inputBoundary = new InputBoundary(input);
    const persistedUser = await this.userRepository.fetchOne({ id: inputBoundary.id });
    const roleIdCommon = 'd0fd3a89-486f-4826-ba8b-71e5191867c7';

    if (persistedUser.roleId !== roleIdCommon) throw new ValidationError('Usuario é admin');
    const user = new User(persistedUser);
    const userCommonDeleted = await this.userRepository.delete(user);

    return new OutputBoundary(userCommonDeleted);
  }
};
