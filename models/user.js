const mongoose = require('mongoose');
const validator = require('validator');

const bcrypt = require('bcryptjs');
const { UnauthorizathionError } = require('../errors/UnauthorizathionError');
const {
  credentialsErrorMassege,
} = require('../utils/constants');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: validator.isEmail,
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    name: {
      type: String,
      minLength: 2,
      maxLength: 30,
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizathionError(credentialsErrorMassege));
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new UnauthorizathionError(credentialsErrorMassege));
        }
        return user;
      });
    });
};

const User = mongoose.model('user', userSchema);
module.exports = { User };
