// | MONGOOSE - MODEL |
const Movies = require('../models/movie')

// | GET MOVIES |

const getMovies = (req, res, next) => {
  Movies.find({})
    .then((movies) => {
      res.send({ data: movies })
    })
    .catch((err) => {
      return res.status(401).send({ message: err.message })
    })
}

// | CREATE MOVIES |

const createMovies = (req, res, next) => {
  const { country, duration, director, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId } = req.body

  Movies.create({ country, duration, director, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId, owner: req.user._id })
    .then((movie) => res.status(200).send({ data: movie }))
    .catch((err) => {
      return res.status(401).send({ message: err.message })
    })
}

// | DELETE MOVIES |

const deleteMoviesId = (req, res, next) => {
  const { id } = req.params

  Movies.findById(id)
    .orFail(new Error('Нет фильма по заданному id'))
    .then((movie) => {
      return movie.remove().then(() => res.send({ message: 'Фильм удален' }))
    })
    .catch((err) => {
      return res.status(500).send({ message: err.message })
    })
}

module.exports = {
  getMovies,
  createMovies,
  deleteMoviesId,
}
