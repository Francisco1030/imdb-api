const bcryptjs = require('bcryptjs');
const CryptAdpter = require('../../domain/adapters/crypt-adpter');

module.exports = class BcryptAdpter extends CryptAdpter {
  constructor() {
    super();
    this.bcryptjs = bcryptjs;
  }

  decryptPassword(password, passwordHash) {
    return this.bcryptjs.compare(password, passwordHash);
  }

  async encryptPassword(password) {
    return await this.bcryptjs.hash(password, 8);
  }
};
