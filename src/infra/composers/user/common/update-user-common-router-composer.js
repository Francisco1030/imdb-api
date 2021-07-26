const UpdateUserCommonUseCase = require('../../../../app/use-case/user/common/update/update-user-common');
const UpdateUserCommonController = require('../../../../presenters/controlles/user/common/update-user-common-controller');
const KnexUserRepository = require('../../../../infra/repositories/knex/knex-user-repository');

module.exports = class UpdateUserCommonRouterComposer {
  static compose() {
    const updateUserCommonUseCase = new UpdateUserCommonUseCase({
      userRepository: new KnexUserRepository()
    });

    return new UpdateUserCommonController({
      updateUserCommonUseCase: updateUserCommonUseCase,
    });
  }
};
