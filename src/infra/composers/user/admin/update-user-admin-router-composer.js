const UpdateUserAdminUseCase = require('../../../../app/use-case/user/admin/update/update-user-admin');
const UpdateUserAdminController = require('../../../../presenters/controlles/user/admin/update-user-admin-controller');
const KnexUserRepository = require('../../../../infra/repositories/knex/knex-user-repository');

module.exports = class UpdateUserAdminRouterComposer {
  static compose() {
    const updateUserAdminUseCase = new UpdateUserAdminUseCase({
      userRepository: new KnexUserRepository()
    });

    return new UpdateUserAdminController({
      updateUserAdminUseCase: updateUserAdminUseCase,
    });
  }
};
