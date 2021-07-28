const CreateMovieRouterComposer = require("../../composers/movie/create-movie-router-composer");
const ListingMovieRouterComposer = require("../../composers/movie/listing-movie-router-composer");
const { adapt } = require("../../adapters/express-router-adapter");

const prefix = '/movies';

module.exports = (router) => {
  router.post(
    prefix,
    adapt(CreateMovieRouterComposer.compose())
  );

  router.get(
    prefix,
    adapt(ListingMovieRouterComposer.compose())
  );
};
