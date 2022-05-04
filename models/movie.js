const mongoose = require('mongoose')

const { isURL } = require('validator')

const moviesSchema = mongoose.Schema({
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
    validator: [isURL, 'Некорректный URL'],
    required: true,
  },
  trailerLink: {
    type: String,
    validator: [isURL, 'Некорректный URL'],
    required: true,
  },
  thumbnail: {
    type: String,
    validator: [isURL, 'Некорректный URL'],
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: String,
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
})

module.exports = mongoose.model('movies', moviesSchema)
