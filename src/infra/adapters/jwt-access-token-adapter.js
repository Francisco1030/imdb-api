const jwt = require("jsonwebtoken");
const AccessTokenManager = require("../../domain/adapters/access-token-adapter");

const JWT_SECRET_KEY = "99934u4jfhheKL24";
module.exports = class JwtAccessTokenAdapter extends AccessTokenManager {
  generate(payload) {
    return jwt.sign(payload, JWT_SECRET_KEY);
  }

  decode(accessToken) {
    return jwt.verify(accessToken, JWT_SECRET_KEY);
  }
};
