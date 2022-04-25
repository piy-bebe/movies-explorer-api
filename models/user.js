const mongoose = require('mongoose')

const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
})

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        Promise.reject(new Error('Неправильные почта или пароль'))
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          Promise.reject(new Error('Неправильные почта или пароль'))
        }

        return user
      })
    })
}

module.exports = mongoose.model('user', userSchema)
