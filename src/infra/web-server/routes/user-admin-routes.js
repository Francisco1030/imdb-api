const CreateUserAdminRouterComposer = require("../../composers/user/admin/create-user-admin-router-composer");
const UpdateUserAdminRouterComposer = require("../../composers/user/admin/update-user-admin-router-composer");
const DeleteUserAdminRouterComposer = require("../../composers/user/admin/delete-user-admin-router-composer");
const { adapt } = require("../../adapters/express-router-adapter");
const ValidationMiddleware = require('../middlewares/validation');
const UserValidation = require('../validators/user-validator');

const prefix = '/users/admin';

module.exports = (router) => {
  router.post(
    prefix,
    ValidationMiddleware(UserValidation.create),
    adapt(CreateUserAdminRouterComposer.compose())
  );

  router.put(
    `${prefix}/:id`,
    ValidationMiddleware(UserValidation.update),
    adapt(UpdateUserAdminRouterComposer.compose())
  );

  router.delete(
    `${prefix}/:id`,
    adapt(DeleteUserAdminRouterComposer.compose())
  );
};
