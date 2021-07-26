const ControllerErros = require('../../controller-erros');
const HttpResponse = require('../../../helpers/http-response');

module.exports = class UpdateUserCommonController {
  constructor({ updateUserCommonUseCase } = {}) {
    this.updateUserCommonUseCase = updateUserCommonUseCase;
  }

  async handle(httpRequest) {
    try {
      const data = httpRequest.body;
      const userUpdated = await this.updateUserCommonUseCase.handle(data);

      return HttpResponse.ok({ ...userUpdated });
    } catch (error) {
      return ControllerErros.handle(error);
    }
  }
};
