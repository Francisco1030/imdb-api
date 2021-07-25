const InputBoundary = require('./input-boundary');
const OutputBoundary = require('./output-boundary');

module.exports = class CreateUserAdminUseCase {
  constructor({ userRepository } = {}) {
    this.userRepository = userRepository;
  }

  async handle(input) {
    const inputBoundary = new InputBoundary(input);
    const userAdminCreated = await this.userRepository.create(inputBoundary);

    return new OutputBoundary(userAdminCreated);
  }
};
