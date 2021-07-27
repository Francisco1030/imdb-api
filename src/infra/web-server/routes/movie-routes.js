const CreateMovieRouterComposer = require("../../composers/movie/create-movie-router-composer");
const { adapt } = require("../../adapters/express-router-adapter");
// const ValidationMiddleware = require('../middlewares/validation');
// const UserValidation = require('../validators/user-validator');
// ValidationMiddleware(UserValidation.create),

const prefix = '/movies';

module.exports = (router) => {
  router.post(
    prefix,
    adapt(CreateMovieRouterComposer.compose())
  );
};
