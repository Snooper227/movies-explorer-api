const routesMovies = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  createMovie,
  deleteMovie,
  getMovies,
} = require('../controllers/movies');

routesMovies.delete(
  '/:_id',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).hex().required(),
    }),
  }),
  deleteMovie,
);

routesMovies.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string()
        .required()
        .pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/),
    }),
  }),
  createMovie,
);

routesMovies.get('/', getMovies);

module.exports = routesMovies;
