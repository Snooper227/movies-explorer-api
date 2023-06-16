const BAD_REQUEST = 400;
const UNAUTHORIZATION_ERROR = 401;
const FORBIDDEN_ERROR = 403;
const NOTFOUND_ERROR = 404;
const CONFLICT_ERROR = 409;
const SERVER_ERROR = 500;
const STATUS_OK = 201;

const MONGOERROR = 11000;

const userNotFoundMassege = 'Пользователь не найден';
const invalidIdErrorMassege = 'Передан невалидный id';
const duplicateEmaileErrorMassege = 'Пользователь с таким электронным адресом уже зарегистрирован';
const invalidDataErrorMassege = 'Переданы некорректные данные';
const notFoundMovieMassege = 'Фильм не найден';
const forbiddenErrorMassege = 'Доступ ограничен';
const deleteMovieDoneMassege = 'Фильм удален!';
const credentialsErrorMassege = 'Неправильная почта или пороль';
const serverErrorMassege = 'На сервере произошла ошибка!';
const unauthorizationErrorMassege = 'Требуется авторизация';
const invalidAddresRequiste = 'Неверный адрес запроса';

module.exports = {
  BAD_REQUEST,
  UNAUTHORIZATION_ERROR,
  FORBIDDEN_ERROR,
  NOTFOUND_ERROR,
  CONFLICT_ERROR,
  SERVER_ERROR,
  MONGOERROR,
  invalidDataErrorMassege,
  serverErrorMassege,
  credentialsErrorMassege,
  deleteMovieDoneMassege,
  notFoundMovieMassege,
  invalidIdErrorMassege,
  duplicateEmaileErrorMassege,
  userNotFoundMassege,
  forbiddenErrorMassege,
  unauthorizationErrorMassege,
  invalidAddresRequiste,
  STATUS_OK,
};
