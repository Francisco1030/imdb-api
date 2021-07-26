const ControllerErros = require('../../controller-erros');
const HttpResponse = require('../../../helpers/http-response');

module.exports = class CreateUserCommonController {
  constructor({ createUserCommonUseCase, userFactory } = {}) {
    this.createUserCommonUseCase = createUserCommonUseCase;
    this.userFactory = userFactory;
  }

  async handle(httpRequest) {
    try {
      const data = httpRequest.body;
      const userCommon = await this.userFactory.createCommon(data);
      const userCreated = await this.createUserCommonUseCase.handle(userCommon);

      return HttpResponse.created({ ...userCreated });
    } catch (error) {
      return ControllerErros.handle(error);
    }
  }
};
