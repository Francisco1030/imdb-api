const ControllerErros = require('../../controller-erros');
const HttpResponse = require('../../../helpers/http-response');

module.exports = class UpdateUserAdminController {
  constructor({ updateUserAdminUseCase } = {}) {
    this.updateUserAdminUseCase = updateUserAdminUseCase;
  }

  async handle(httpRequest) {
    try {
      const data = httpRequest.body;
      const userUpdated = await this.updateUserAdminUseCase.handle(data);

      return HttpResponse.ok({ ...userUpdated });
    } catch (error) {
      return ControllerErros.handle(error);
    }
  }
};
