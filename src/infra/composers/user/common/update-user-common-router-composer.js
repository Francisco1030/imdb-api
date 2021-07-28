const UpdateUserCommonUseCase = require('../../../../app/use-case/user/common/update/update-user-common');
const UpdateUserCommonController = require('../../../../presenters/controlles/user/common/update-user-common-controller');
const KnexUserRepository = require('../../../../infra/repositories/knex/knex-user-repository');
const ValidateUserService = require('../../../../infra/services/validate-user-service');
module.exports = class UpdateUserCommonRouterComposer {
  static compose() {
    const userRepository = new KnexUserRepository();
    const validateUserService = new ValidateUserService({
      userRepository
    });

    const updateUserCommonUseCase = new UpdateUserCommonUseCase({
      userRepository,
      validateUserService
    });

    return new UpdateUserCommonController({
      updateUserCommonUseCase: updateUserCommonUseCase,
    });
  }
};
