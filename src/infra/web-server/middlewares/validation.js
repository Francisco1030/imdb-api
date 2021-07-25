const HttpResponse = require('../../../presenters/helpers/http-response');
const { ValidationError } = require('../../../shared/utils/errors');
const badRequest = (message) => HttpResponse.badRequest(message);

module.exports = (schema) => async (request, response, next) => {
  try {
    await schema.validate(request.body);
    return next();
  } catch (err) {
    const erro = new ValidationError(err.errors[0]);
    return response.status(400).json(badRequest(erro));
  }
};
