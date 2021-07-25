const ControllerErros = require('../../controller-erros');
const HttpResponse = require('../../../helpers/http-response');

module.exports = class CreateUserAdminController {
  constructor({ createUserAdminUseCase, userFactory } = {}) {
    this.createUserAdminUseCase = createUserAdminUseCase;
    this.userFactory = userFactory;
  }

  async handle(httpRequest) {
    try {
      const data = httpRequest.body;
      const userAdmin = this.userFactory.createAdmin(data);
      const userCreated = await this.createUserAdminUseCase.handle(userAdmin);

      return HttpResponse.created({ ...userCreated });
    } catch (error) {
      return ControllerErros.handle(error);
    }
  }
};
