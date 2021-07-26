const DeleteUserCommonUseCase = require('../../../../app/use-case/user/common/delete/delete-user-common');
const DeleteUserCommonController = require('../../../../presenters/controlles/user/common/delete-user-common-controller');
const KnexUserRepository = require('../../../../infra/repositories/knex/knex-user-repository');


module.exports = class DeleteUserCommonRouterComposer {
  static compose() {
    const deleteUserCommonUseCase = new DeleteUserCommonUseCase({
      userRepository: new KnexUserRepository()
    });

    return new DeleteUserCommonController({
      deleteUserCommonUseCase: deleteUserCommonUseCase,
    });
  }
};
