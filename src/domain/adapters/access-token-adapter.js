module.exports = class AccessTokenAdapter {
  /*
   * @param {Object} payload
   * @returns {String}
   */
  generate(payload) {
    throw new Error("Not implementd");
  }
  /*
   * @param {Object} accessToken
   * @returns {Object}
   */
  decode(accessToken) {
    throw new Error("Not implementd");
  }
};
