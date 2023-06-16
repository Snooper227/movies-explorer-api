const { serverErrorMassege } = require('../utils/constants');

function handleErrors(err, res, next) {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({ message: statusCode === 500 ? serverErrorMassege : message });
  next();
}

module.exports = { handleErrors };
