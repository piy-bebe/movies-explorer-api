// | MONGOOSE - MODEL |
const Users = require('../models/user')

// | BCRYPT |
const bcrypt = require('bcryptjs')

const createUser = (req, res, next) => {
  Users.findOne({ email: req.body.email }).then((user) => {
    if (!user) {
      const { email, password, name } = req.body

      bcrypt.hash(password, 10)
    }
  })
}

const getUser = (req, res) => {
  Users.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        throw new Error(`Пользователь с почтой: ${req.body.email} не существует!`)
      }
    })
    .catch((err) => {
      res.status(400).send({ message: err.message })
    })
}

const updateUser = (req, res) => {
  const { email, name } = req.body

  Users.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .orFail(new Error('Пользователя не существует!'))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      res.status(400).send({ message: err.message })
    })
}

module.exports = { getUser, updateUser }
