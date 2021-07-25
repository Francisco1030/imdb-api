module.exports = class UserRepositorySpy {
  create = jest.fn();
  delete = jest.fn();
  fetchAll = jest.fn();
  fetchOne = jest.fn();
  update = jest.fn();
}
