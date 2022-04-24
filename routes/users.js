const router = require('express').Router()

// | CONTROLLERS |
const { getUser, updateUser } = require('../controllers/users')

// | ROUTES |
router.get('/me', getUser)
router.patch('/me', updateUser)

module.exports = router
