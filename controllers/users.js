// | JWT |
const jwt = require('jsonwebtoken')

// | MONGOOSE - MODEL |
const Users = require('../models/user')

// | BCRYPT |
const bcrypt = require('bcryptjs')

// | SIGN UP |
const createUser = (req, res, next) => {
  Users.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        const { email, password, name } = req.body

        bcrypt
          .hash(password, 10)
          .then((hash) => Users.create({ email, password: hash, name }))
          .then((user) => {
            res.status(200).send({
              data: {
                _id: user._id,
                email: user.email,
                name: user.name,
              },
            })
          })
          .catch((err) => {
            res.status(400).send({ message: err.message })
          })
      } else {
        throw new Error(`Пользователь с адресом электронной почты ${req.body.email} уже существует!`)
      }
    })
    .catch((err) => {
      res.status(400).send({ message: err.message })
    })
}

// | SIGN IN |
const login = (req, res) => {
  const { email, password } = req.body

  return Users.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'i9x8s70-s9s8ci-29xo', { expiresIn: '7d' })

      res.send({ token })
    })
    .catch((err) => {
      return res.status(400).send({ message: err.message })
    })
}

const getUser = (req, res) => {
  Users.findOne({ email: req.body.email })
    .select('-password -__v')
    .then((user) => {
      if (!user) {
        throw new Error(`Пользователь с почтой: ${req.body.email} не существует!`)
      }

      return res.status(200).send({ data: user })
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

const getUsers = (req, res) => {
  Users.find({})
    .select('-password -__v')
    .then((users) => {
      res.status(200).send({ data: users })
    })
    .catch((err) => {
      res.status(400).send({ message: err.message })
    })
}

module.exports = { getUser, updateUser, createUser, login, getUsers }
