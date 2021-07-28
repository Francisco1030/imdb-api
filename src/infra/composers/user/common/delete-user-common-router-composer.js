const DeleteUserCommonUseCase = require('../../../../app/use-case/user/common/delete/delete-user-common');
const DeleteUserCommonController = require('../../../../presenters/controlles/user/common/delete-user-common-controller');
const KnexUserRepository = require('../../../../infra/repositories/knex/knex-user-repository');
const ValidateUserService = require('../../../../infra/services/validate-user-service');
module.exports = class DeleteUserCommonRouterComposer {
  static compose() {
    const userRepository = new KnexUserRepository();
    const validateUserService = new ValidateUserService({
      userRepository
    });

    const deleteUserCommonUseCase = new DeleteUserCommonUseCase({
      userRepository,
      validateUserService
    });

    return new DeleteUserCommonController({
      deleteUserCommonUseCase: deleteUserCommonUseCase,
    });
  }
};
