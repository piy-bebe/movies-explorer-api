const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const { errors } = require('celebrate')

const { PORT = 3000 } = process.env

// | MIDDLEWARES |
const auth = require('./middlewares/auth')
const { requestLogger, errorLogger } = require('./middlewares/logger')

// | CONTROLLERS |
const { createUser, login } = require('./controllers/users')

// | VALIDATORS |
const { validateSignup, validateSignin } = require('./validations/user')

// | EXPRESS APP |
const app = express()

// | CONNECT DB |
mongoose.connect('mongodb://localhost:27017/bitfilmsdb')

// | PARSER |
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// | REQUEST LOGGER |
app.use(requestLogger)

// | SIGN UP |
app.post('/signup', validateSignup, createUser)

// | SIGN IN |
app.post('/signin', validateSignin, login)

// | ROUTE PROTECTION |
app.use(auth)

// | ROUTES |
app.use('/users', require('./routes/users'))
app.use('/movies', require('./routes/movies'))

// | ERROR LOGGER |
app.use(errorLogger)

// | CELEBRATE ERRORS |
app.use(errors())

// | CENTRALIZED PROCESSOR |
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err
  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message })
})

// | START SERVER |
app.listen(PORT, () => {
  console.log(
    `\n\n============================\n[\x1b[92m✔\x1b[0m] Сервер запущен!\n----------------------------\n[\x1b[92m+\x1b[0m] PORT: \x1b[94m${PORT}\x1b[0m\n============================`
  )
})
