const DeleteUserAdminUseCase = require('../../../../app/use-case/user/admin/delete/delete-user-admin');
const DeleteUserAdminController = require('../../../../presenters/controlles/user/admin/delete-user-admin-controller');
const KnexUserRepository = require('../../../../infra/repositories/knex/knex-user-repository');
const ValidateUserService = require('../../../../infra/services/validate-user-service');
module.exports = class DeleteUserAdminRouterComposer {
  static compose() {
    const userRepository = new KnexUserRepository();
    const validateUserService = new ValidateUserService({
      userRepository
    });

    const deleteUserAdminUseCase = new DeleteUserAdminUseCase({
      userRepository,
      validateUserService
    });

    return new DeleteUserAdminController({
      deleteUserAdminUseCase: deleteUserAdminUseCase,
    });
  }
};
