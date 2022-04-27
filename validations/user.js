const { celebrate, Joi } = require('celebrate')

const validateUserUpdate = celebrate({
  body: {
    email: Joi.string().email(),
    name: Joi.string().min(2).max(30),
  },
})

const validateSignup = celebrate({
  body: {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30).required(),
  },
})

const validateSignin = celebrate({
  body: {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  },
})

module.exports = {
  validateUserUpdate,
  validateSignup,
  validateSignin,
}
