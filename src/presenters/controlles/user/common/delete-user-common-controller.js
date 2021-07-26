const ControllerErros = require('../../controller-erros');
const HttpResponse = require('../../../helpers/http-response');

module.exports = class DeleteUserCommonController {
  constructor({ deleteUserCommonUseCase } = {}) {
    this.deleteUserCommonUseCase = deleteUserCommonUseCase;
  }

  async handle(httpRequest) {
    try {
      const data = httpRequest.params;
      const userDeleted = await this.deleteUserCommonUseCase.handle(data);

      return HttpResponse.ok({ ...userDeleted });
    } catch (error) {
      return ControllerErros.handle(error);
    }
  }
};
