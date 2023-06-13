require('dotenv').config();
const jwt = require('jsonwebtoken');
const { UnauthorizathionError } = require('../errors/UnauthorizathionError');

const { NODE_ENV, JWT_SECRET } = process.env;

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const bearer = 'Bearer ';

  if (!authorization || !authorization.startsWith(bearer)) {
    throw new UnauthorizathionError('Требуется авторизация');
  }

  const token = authorization.split(bearer)[1];
  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key',
    );
  } catch (err) {
    throw new UnauthorizathionError('Требуется авторизация');
  }

  req.user = payload;
  next();
};
