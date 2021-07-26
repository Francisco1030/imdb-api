const CreateUserCommonRouterComposer = require("../../composers/user/common/create-user-common-router-composer");
const UpdateUserCommonRouterComposer = require("../../composers/user/common/update-user-common-router-composer");
const DeleteUserCommonRouterComposer = require("../../composers/user/common/delete-user-common-router-composer");
const { adapt } = require("../../adapters/express-router-adapter");
const ValidationMiddleware = require('../middlewares/validation');
const UserValidation = require('../validators/user-validator');

const prefix = '/users/common';

module.exports = (router) => {
  router.post(
    prefix,
    ValidationMiddleware(UserValidation.create),
    adapt(CreateUserCommonRouterComposer.compose())
  );

  router.put(
    `${prefix}/:id`,
    ValidationMiddleware(UserValidation.update),
    adapt(UpdateUserCommonRouterComposer.compose())
  );

  router.delete(
    `${prefix}/:id`,
    adapt(DeleteUserCommonRouterComposer.compose())
  );
};
