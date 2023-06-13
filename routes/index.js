const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { loginUser } = require('../controllers/users');
const { createUser } = require('../controllers/users');
const { NotFoundError } = require('../errors/NotFoundError');
const auth = require('../middelwares/auth');

const userRoutes = require('./users');
const movieRoutes = require('./movies');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(6),
    }),
  }),
  loginUser,
);

router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(6),
      name: Joi.string().required().min(2).max(30),
    }),
  }),
  createUser,
);

router.use('/users', auth, userRoutes);
router.use('/movies', auth, movieRoutes);

router.all('*', auth, (req, res, next) => {
  next(new NotFoundError('Неверный адрес запроса'));
});

module.exports = router;
