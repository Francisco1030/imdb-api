const InputBoundary = require('./input-boundary');
const OutputBoundary = require('./output-boundary');
const User = require('../../../../../domain/entities/user');
const { ValidationError } = require('../../../../../shared/utils/errors');

module.exports = class DeleteUserAdminUseCase {
  constructor({ userRepository } = {}) {
    this.userRepository = userRepository;
  }

  async handle(input) {
    const inputBoundary = new InputBoundary(input);
    const persistedUser = await this.userRepository.fetchOne({ id: inputBoundary.id });
    const roleIdAdmin = '8609e912-c66b-4a21-8a38-d2ee0f881d11';

    if (persistedUser.roleId !== roleIdAdmin) throw new ValidationError('Usuario não é admin');
    const data = { ...persistedUser, ...inputBoundary };
    const user = new User(data);
    const userAdminDeleted = await this.userRepository.delete(user);

    return new OutputBoundary(userAdminDeleted);
  }
};
