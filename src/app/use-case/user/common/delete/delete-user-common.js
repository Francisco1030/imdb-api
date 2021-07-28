const InputBoundary = require('./input-boundary');
const OutputBoundary = require('./output-boundary');
const User = require('../../../../../domain/entities/user');
module.exports = class DeleteUserCommonUseCase {
  constructor({ userRepository, validateUserService } = {}) {
    this.userRepository = userRepository;
    this.validateUserService = validateUserService;
  }

  async handle(input) {
    const inputBoundary = new InputBoundary(input);
    const persistedUser = await this.validateUserService.validateCommon({ id: inputBoundary.id });

    const user = new User(persistedUser);
    const userCommonDeleted = await this.userRepository.delete(user);

    return new OutputBoundary(userCommonDeleted);
  }
};
