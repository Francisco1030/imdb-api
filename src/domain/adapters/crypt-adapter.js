module.exports = class CryptAdapter {
  decryptPassword(password, passwordHash) {
    throw new Error('Method not implement');
  }

  async encryptPassword(password) {
    throw new Error('Method not implement');
  }
};
