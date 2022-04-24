const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const { PORT = 3000 } = process.env

// | EXPRESS APP |
const app = express()

// | CONNECT DB |
mongoose.connect('mongodb://localhost:27017/filmsdb')

// | PARSER |
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// | ROUTES |
app.use('/users', require('./routes/users'))

app.listen(PORT, () => {
  console.log(
    `\n\n============================\n[\x1b[92m✔\x1b[0m] Сервер запущен!\n----------------------------\n[\x1b[92m+\x1b[0m] PORT: \x1b[94m${PORT}\x1b[0m\n============================`
  )
})
