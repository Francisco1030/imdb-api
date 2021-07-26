const uuid = require('uuid').v4;
const User = require('../../domain/entities/user');
const BcryptAdpter = require('../adapters/bcrypt-adpter');
const bcryptAdpter = new BcryptAdpter();

module.exports = class UserFactory {
  static async createAdmin(data) {
    const userAdmin = new User({
      ...data,
      id: uuid(),
      password: await bcryptAdpter.encryptPassword(data.password),
      roleId: '8609e912-c66b-4a21-8a38-d2ee0f881d11',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    });

    return userAdmin;
  }

  static async createCommon(data) {
    const userCommon = new User({
      ...data,
      id: uuid(),
      password: await bcryptAdpter.encryptPassword(data.password),
      roleId: 'd0fd3a89-486f-4826-ba8b-71e5191867c7',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    });

    return userCommon;
  }
};
