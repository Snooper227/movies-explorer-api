const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 100,
});

const databaseUrl = 'mongodb://127.0.0.1:27017/bitfilmsdb';
const jwtKey = 'some-secret-key';

module.exports = {
  limiter,
  databaseUrl,
  jwtKey,
};
