const router = require('express').Router();
const { validationLogin, validationRegister } = require('../middelwares/validations');

const { loginUser } = require('../controllers/users');
const { createUser } = require('../controllers/users');
const { NotFoundError } = require('../errors/NotFoundError');
const { invalidAddresRequiste } = require('../utils/constants');
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
  validationLogin,
  loginUser,
);

router.post(
  '/signup',
  validationRegister,
  createUser,
);

router.use('/users', auth, userRoutes);
router.use('/movies', auth, movieRoutes);

router.all('*', auth, (req, res, next) => {
  next(new NotFoundError(invalidAddresRequiste));
});

module.exports = router;
