const { NotFoundError, ValidationError, ServerError } = require('../../shared/utils/errors');
const HttpResponse = require('../helpers/http-response');

module.exports = class ControllerErrors {
  static handle(error) {
    console.error('ERROR:', error);
    if (error instanceof NotFoundError) return HttpResponse.notFoundError(error);
    else if (error instanceof ValidationError) return HttpResponse.badRequest(error);

    return HttpResponse.serverError(new ServerError('Erro interno no servidor'));
  }
};
