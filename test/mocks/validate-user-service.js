module.exports = class ValidateUserServiceSpy {
  constructor({ userRepository } = {}) {
    this.userRepository = userRepository;
  }
  validateAdmin = jest.fn();
  validateCommon = jest.fn();
  fetchUser = jest.fn();
  fetchOne = jest.fn();
  compareRole = jest.fn();
}
