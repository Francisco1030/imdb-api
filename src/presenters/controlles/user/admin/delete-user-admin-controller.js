const ControllerErros = require('../../controller-erros');
const HttpResponse = require('../../../helpers/http-response');

module.exports = class DeleteUserAdminController {
  constructor({ deleteUserAdminUseCase } = {}) {
    this.deleteUserAdminUseCase = deleteUserAdminUseCase;
  }

  async handle(httpRequest) {
    try {
      const data = httpRequest.params;
      const userDeleted = await this.deleteUserAdminUseCase.handle(data);

      return HttpResponse.ok({ ...userDeleted });
    } catch (error) {
      return ControllerErros.handle(error);
    }
  }
};
