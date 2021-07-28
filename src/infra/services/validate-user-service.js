const { ValidationError } = require('../../shared/utils/errors');

module.exports = class ValidateUserService {
  constructor({ userRepository } = {}) {
    this.userRepository = userRepository;
  }

  async validateAdmin(id) {
    const persistedUser = await this.fetchUser(id);
    const roleIdAdmin = '8609e912-c66b-4a21-8a38-d2ee0f881d11';

    this.compareRole(persistedUser, roleIdAdmin, 'Usuario não é admin');

    return persistedUser;

  }
  async validateCommon(id) {
    const persistedUser = await this.fetchUser(id);
    const roleIdCommon = 'd0fd3a89-486f-4826-ba8b-71e5191867c7';

    this.compareRole(persistedUser, roleIdCommon, 'Usuario é admin');

    return persistedUser;
  }

  async fetchUser(id) {
    const user = await this.userRepository.fetchOne(id);

    return user;
  }

  compareRole(user, roleId, message) {
    if (user.roleId !== roleId) throw new ValidationError(message);
  }
};
