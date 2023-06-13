const routesUsers = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUser,
  updateUser,
} = require('../controllers/users');

routesUsers.get('/me', getUser);
routesUsers.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUser);

module.exports = routesUsers;
