const CreateUserAdminUseCase = require('../../../../app/use-case/user/admin/create/create-user-admin');
const CreateUserAdminController = require('../../../../presenters/controlles/user/admin/create-user-admin-controller');
const KnexUserRepository = require('../../../../infra/repositories/knex/knex-user-repository');
const UserFactory = require('../../../factories/user-factory');

module.exports = class CreateUserAdminRouterComposer {
  static compose() {
    const createUserAdminUseCase = new CreateUserAdminUseCase({
      userRepository: new KnexUserRepository()
    });

    return new CreateUserAdminController({
      createUserAdminUseCase: createUserAdminUseCase,
      userFactory: UserFactory
    });
  }
};
