const router = require('express').Router()

// | CONTROLLERS |
const { getUser, updateUser, getUsers } = require('../controllers/users')

// | ROUTES |
router.get('/me', getUser)
router.get('/all', getUsers)
router.patch('/me', updateUser)

module.exports = router
