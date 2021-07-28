const UpdateUserAdminUseCase = require('../../../../app/use-case/user/admin/update/update-user-admin');
const UpdateUserAdminController = require('../../../../presenters/controlles/user/admin/update-user-admin-controller');
const KnexUserRepository = require('../../../../infra/repositories/knex/knex-user-repository');
const ValidateUserService = require('../../../../infra/services/validate-user-service');
module.exports = class UpdateUserAdminRouterComposer {
  static compose() {
    const userRepository = new KnexUserRepository();
    const validateUserService = new ValidateUserService({
      userRepository
    });

    const updateUserAdminUseCase = new UpdateUserAdminUseCase({
      userRepository,
      validateUserService
    });

    return new UpdateUserAdminController({
      updateUserAdminUseCase: updateUserAdminUseCase,
    });
  }
};
