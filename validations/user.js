const { celebrate, Joi } = require('celebrate')

const validateUserUpdate = celebrate({
  body: {
    email: Joi.string().email(),
    name: Joi.string().min(2).max(30),
  },
})

module.exports = {
  validateUserUpdate,
}
