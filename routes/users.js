const routesUsers = require('express').Router();
const { validationUpdateUser } = require('../middelwares/validations');
const {
  getUser,
  updateUser,
} = require('../controllers/users');

routesUsers.get('/me', getUser);
routesUsers.patch('/me', validationUpdateUser, updateUser);

module.exports = routesUsers;
