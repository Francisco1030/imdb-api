const InputBoundary = require('./input-boundary');
const OutputBoundary = require('./output-boundary');
const User = require('../../../../../domain/entities/user');
module.exports = class UpdateUserAdminUseCase {
  constructor({ userRepository, validateUserService } = {}) {
    this.userRepository = userRepository;
    this.validateUserService = validateUserService;
  }

  async handle(input) {
    const inputBoundary = new InputBoundary(input);
    const persistedUser = await this.validateUserService.validateAdmin({ id: inputBoundary.id });

    const data = { ...persistedUser, ...inputBoundary };
    const user = new User(data);
    const userAdminUpdated = await this.userRepository.update(user);

    return new OutputBoundary(userAdminUpdated);
  }
};
