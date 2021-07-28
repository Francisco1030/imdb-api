const InputBoundary = require('./input-boundary');
const OutputBoundary = require('./output-boundary');
const User = require('../../../../../domain/entities/user');
module.exports = class DeleteUserAdminUseCase {
  constructor({ userRepository, validateUserService } = {}) {
    this.userRepository = userRepository;
    this.validateUserService = validateUserService;
  }

  async handle(input) {
    const inputBoundary = new InputBoundary(input);

    const persistedUser = await this.validateUserService.validateAdmin({ id: inputBoundary.id });

    const data = { ...persistedUser, ...inputBoundary };
    const user = new User(data);
    const userAdminDeleted = await this.userRepository.delete(user);

    return new OutputBoundary(userAdminDeleted);
  }
};
