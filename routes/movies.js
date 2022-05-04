const router = require('express').Router()

// | CONTROLLERS |
const { getMovies, createMovies, deleteMoviesId } = require('../controllers/movies')

// | ROUTES |
router.get('/', getMovies)
router.post('/', createMovies)
router.delete('/:id', deleteMoviesId)

module.exports = router
