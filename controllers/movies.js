const { Movie } = require('../models/movie');
const { NotFoundError } = require('../errors/NotFoundError');
const { ForbiddenError } = require('../errors/ForbiddenError');
const { ValidationError } = require('../errors/ValidationError');

function createMovie(req, res, next) {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные при создании карточки'));
      } else {
        next(err);
      }
    });
}

function getMovies(_, res, next) {
  Movie.find({})
    .sort({ createdAt: -1 })
    .then((movies) => res.send(movies))
    .catch((err) => {
      next(err);
    });
}

function deleteMovie(req, res, next) {
  Movie.findById(req.params.movieId).then(
    ((movie) => {
      if (movie == null) {
        throw new NotFoundError('Карточка не найдена');
      } else if (req.user._id !== String(movie.owner)) {
        throw new ForbiddenError('Доступ ограничен');
      }
      return Movie.findByIdAndRemove(req.params.movieId).then(() => {
        res.send({ message: 'Карточка удалена!' });
      });
    }).catch(next),
  );
}

module.exports = {
  createMovie,
  deleteMovie,
  getMovies,
};
