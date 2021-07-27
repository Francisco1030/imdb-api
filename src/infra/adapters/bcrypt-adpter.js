const bcryptjs = require('bcryptjs');
const CryptAdapter = require('../../domain/adapters/crypt-adapter');

module.exports = class BcryptAdpter extends CryptAdapter {
  constructor() {
    super();
    this.bcryptjs = bcryptjs;
  }

  async decryptPassword(password, passwordHash) {
    return await this.bcryptjs.compare(password, passwordHash);
  }

  async encryptPassword(password) {
    return await this.bcryptjs.hash(password, 8);
  }
};
