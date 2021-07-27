const LoginAuthRouterComposer = require("../../composers/auth/login-auth-router-composer");
const { adapt } = require("../../adapters/express-router-adapter");

const prefix = '/auth';

module.exports = (router) => {
  router.post(
    `${prefix}/login`,
    adapt(LoginAuthRouterComposer.compose())
  );
};
