const InputBoundary = require('./input-boundary');
const OutputBoundary = require('./output-boundary');
const User = require('../../../../../domain/entities/user');
const { ValidationError } = require('../../../../../shared/utils/errors');

module.exports = class UpdateUserCommonUseCase {
  constructor({ userRepository, validateUserService } = {}) {
    this.userRepository = userRepository;
    this.validateUserService = validateUserService;
  }

  async handle(input) {
    const inputBoundary = new InputBoundary(input);
    const persistedUser = await this.validateUserService.validateCommon({ id: inputBoundary.id });

    const data = { ...persistedUser, ...inputBoundary };
    const user = new User(data);
    const userCommunUpdated = await this.userRepository.update(user);

    return new OutputBoundary(userCommunUpdated);
  }
};
