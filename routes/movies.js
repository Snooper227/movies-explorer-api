const routesMovies = require('express').Router();
const { validationDeleteMovie, validationCreateMovie } = require('../middelwares/validations');

const {
  createMovie,
  deleteMovie,
  getMovies,
} = require('../controllers/movies');

routesMovies.delete(
  '/:movieId',
  validationDeleteMovie,
  deleteMovie,
);

routesMovies.post(
  '/',
  validationCreateMovie,
  createMovie,
);

routesMovies.get('/', getMovies);

module.exports = routesMovies;
