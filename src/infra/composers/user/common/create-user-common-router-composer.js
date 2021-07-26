const CreateUserCommonUseCase = require('../../../../app/use-case/user/common/create/create-user-common');
const CreateUserCommonController = require('../../../../presenters/controlles/user/common/create-user-common-controller');
const KnexUserRepository = require('../../../../infra/repositories/knex/knex-user-repository');
const UserFactory = require('../../../factories/user-factory');

module.exports = class CreateUserCommonRouterComposer {
  static compose() {
    const createUserCommonUseCase = new CreateUserCommonUseCase({
      userRepository: new KnexUserRepository()
    });

    return new CreateUserCommonController({
      createUserCommonUseCase: createUserCommonUseCase,
      userFactory: UserFactory
    });
  }
};
