const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const { User } = require('../models/user');
const { NotFoundError } = require('../errors/NotFoundError');
const { ConflictError } = require('../errors/ConflictError');
const { ValidationError } = require('../errors/ValidationError');
const { jwtKey } = require('../utils/config');
const {
  MONGOERROR,
  STATUS_OK,
  userNotFoundMassege,
  duplicateEmaileErrorMassege,
  invalidDataErrorMassege,
  invalidIdErrorMassege,
} = require('../utils/constants');

function createUser(req, res, next) {
  const {
    email,
    password,
    name,
  } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .then((user) => {
      const { _id } = user;

      return res.status(STATUS_OK).send({
        email,
        name,
        _id,
      });
    })
    .catch((err) => {
      if (err.code === MONGOERROR) {
        next(new ConflictError(duplicateEmaileErrorMassege));
      } else if (err.name === 'ValidationError') {
        next(new ValidationError(invalidDataErrorMassege));
      } else {
        next(err);
      }
    });
}

function loginUser(req, res, next) {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : jwtKey,
        { expiresIn: '7d' },
      );
      res.status(STATUS_OK).send({ token });
    })
    .catch((err) => {
      next(err);
    });
}

function getUser(req, res, next) {
  User.findById(req.user._id)
    .then((user) => {
      if (user) {
        return res.status(201).send(user);
      }
      return next(new NotFoundError(userNotFoundMassege));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new ValidationError(invalidIdErrorMassege));
      }
      return next(err);
    });
}

function updateUser(req, res, next) {
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(new NotFoundError(userNotFoundMassege))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        return next(new ValidationError(invalidDataErrorMassege));
      }
      if (err.code === MONGOERROR) {
        return next(new ConflictError(duplicateEmaileErrorMassege));
      }
      return next(err);
    })
    .catch(next);
}

module.exports = {
  createUser,
  getUser,
  updateUser,
  loginUser,
};
