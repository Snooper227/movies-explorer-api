require('dotenv').config();
const jwt = require('jsonwebtoken');
const { UnauthorizathionError } = require('../errors/UnauthorizathionError');
const {
  unauthorizationErrorMassege,
} = require('../utils/constants');
const { jwtKey } = require('../utils/config');

const { NODE_ENV, JWT_SECRET } = process.env;

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const bearer = 'Bearer ';

  if (!authorization || !authorization.startsWith(bearer)) {
    throw new UnauthorizathionError(unauthorizationErrorMassege);
  }

  const token = authorization.split(bearer)[1];
  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : jwtKey,
    );
  } catch (err) {
    throw new UnauthorizathionError(unauthorizationErrorMassege);
  }

  req.user = payload;
  next();
};
