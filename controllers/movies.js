const { Movie } = require('../models/movie');
const { NotFoundError } = require('../errors/NotFoundError');
const { ForbiddenError } = require('../errors/ForbiddenError');
const { ValidationError } = require('../errors/ValidationError');

function createMovie(req, res, next) {
  Movie.create({
    ...req.body,
    owner: req.user._id,
  })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные при создании фильма'));
      } else {
        next(err);
      }
    });
}

function getMovies(_, res, next) {
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch((err) => {
      next(err);
    });
}

function deleteMovie(req, res, next) {
  const { movieId } = req.params;

  Movie.findById(movieId)
    .orFail(new NotFoundError('Фильм не найден'))
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id.toString()) {
        return next(new ForbiddenError('Доступ ограничен'));
      }
      return Movie.findByIdAndRemove(movieId)
        .then(() => res.send({ message: 'Фильм удален!' }))
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
}

module.exports = {
  createMovie,
  deleteMovie,
  getMovies,
};
