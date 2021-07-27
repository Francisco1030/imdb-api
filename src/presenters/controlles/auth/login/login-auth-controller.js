const ControllerErros = require('../../controller-erros');
const HttpResponse = require('../../../helpers/http-response');

module.exports = class LoginAuthController {
  constructor({ loginAuthUseCase } = {}) {
    this.loginAuthUseCase = loginAuthUseCase;
  }

  async handle(httpRequest) {
    try {
      const data = httpRequest.body;
      const acessToken = await this.loginAuthUseCase.handle(data);

      return HttpResponse.ok({ ...acessToken });
    } catch (error) {
      return ControllerErros.handle(error);
    }
  }
};
