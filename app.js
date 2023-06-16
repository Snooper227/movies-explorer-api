const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const cors = require('cors');
const { errors } = require('celebrate');
const { handleErrors } = require('./middelwares/handleError');
const { limiter, databaseUrl } = require('./utils/config');
const routes = require('./routes/index');
const { requestLogger, errorLogger } = require('./middelwares/logger');

const app = express();
const { PORT = 3000, NODE_ENV, DATABASE } = process.env;

mongoose.connect(NODE_ENV === 'production' ? DATABASE : databaseUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(limiter);
app.use(express.json());
app.use(cookieParser());

app.use(requestLogger);
app.use('/', routes);

app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => { handleErrors(err, res, next); });
app.use(limiter);

app.listen(PORT, () => {
  console.log(`App open on port ${PORT}`);
});
