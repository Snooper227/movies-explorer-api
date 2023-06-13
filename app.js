const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const cors = require('cors');
const { errors } = require('celebrate');
const { handleErrors } = require('./middelwares/handleError');
const limiter = require('./utils/rateLimiter');
const routes = require('./routes/index');
const { requestLogger, errorLogger } = require('./middelwares/logger');

const app = express();
const { PORT = 3000 } = process.env;
const BASE_PATH = 'mongodb://127.0.0.1:27017/bitfilmsdb';

mongoose.connect(BASE_PATH, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());

app.use(express.json());
app.use(limiter);
app.use(cookieParser());

app.use(requestLogger);
app.use('/', routes);

app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => { handleErrors(err, res, next); });

app.listen(PORT, () => {
  console.log(`App open on port ${PORT}`);
});
