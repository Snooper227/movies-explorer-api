const { Movie } = require('../models/movie');
const { NotFoundError } = require('../errors/NotFoundError');
const { ForbiddenError } = require('../errors/ForbiddenError');
const { ValidationError } = require('../errors/ValidationError');

const {
  forbiddenErrorMassege,
  invalidDataErrorMassege,
  notFoundMovieMassege,
  deleteMovieDoneMassege,
} = require('../utils/constants');

function createMovie(req, res, next) {
  Movie.create({
    ...req.body,
    owner: req.user._id,
  })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(invalidDataErrorMassege));
      } else {
        next(err);
      }
    });
}

function getMovies(req, res, next) {
  const owner = req.user._id;

  Movie.find({ owner }).populate('owner')
    .then((movies) => res.status(201).send(movies))
    .catch((err) => {
      next(err);
    });
}

function deleteMovie(req, res, next) {
  const { movieId } = req.params;

  Movie.findById(movieId)
    .orFail(new NotFoundError(notFoundMovieMassege))
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id.toString()) {
        return next(new ForbiddenError(forbiddenErrorMassege));
      }
      return Movie.findByIdAndRemove(movieId)
        .then(() => res.send({ message: deleteMovieDoneMassege }))
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
}

module.exports = {
  createMovie,
  deleteMovie,
  getMovies,
};
