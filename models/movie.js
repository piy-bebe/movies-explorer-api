const mongoose = require('mongoose')

const movie = mongoose.Schema({
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
    // * link validator
  },
  trailerLink: {
    type: String,
    required: true,
    // * link validator
  },
  thumbnail: {
    type: String,
    required: true,
    // * link validator
  },
  owner: {
    // * ref user
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
