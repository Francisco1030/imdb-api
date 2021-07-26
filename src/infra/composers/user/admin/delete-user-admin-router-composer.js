const DeleteUserAdminUseCase = require('../../../../app/use-case/user/admin/delete/delete-user-admin');
const DeleteUserAdminController = require('../../../../presenters/controlles/user/admin/delete-user-admin-controller');
const KnexUserRepository = require('../../../../infra/repositories/knex/knex-user-repository');


module.exports = class DeleteUserAdminRouterComposer {
  static compose() {
    const deleteUserAdminUseCase = new DeleteUserAdminUseCase({
      userRepository: new KnexUserRepository()
    });

    return new DeleteUserAdminController({
      deleteUserAdminUseCase: deleteUserAdminUseCase,
    });
  }
};
