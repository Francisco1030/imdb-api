module.exports = class CryptAdapter {
  /*
   * @param {String} password
   * @param {String} passwordHash
   * @returns {Boolean}
   */
  async decryptPassword(password, passwordHash) {
    throw new Error('Method not implement');
  }

  /*
   * @param {String} password
   * @returns {String} passwordHash
   */
  async encryptPassword(password) {
    throw new Error('Method not implement');
  }
};
