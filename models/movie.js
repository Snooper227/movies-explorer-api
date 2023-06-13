const mongoose = require('mongoose');

const URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      validate: {
        validator: (url) => URL_REGEX.test(url),
        message: 'Требуется ввести URL',
      },
    },
    trailerLink: {
      type: String,
      required: true,
      validate: {
        validator: (url) => URL_REGEX.test(url),
        message: 'Требуется ввести URL',
      },
    },
    thumbnail: {
      type: String,
      required: true,
      validate: {
        validator: (url) => URL_REGEX.test(url),
        message: 'Требуется ввести URL',
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    mivieId: {
      type: Number,
      required: true,
    },
    nameRU: {
      type: String,
      required: true,
    },
    nameEN: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false },
);

const Movie = mongoose.model('movie', movieSchema);

module.exports = { Movie };
