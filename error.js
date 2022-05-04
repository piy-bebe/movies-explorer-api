const BadRequest = require('./errors/bad-request-error')

module.exports.checkError = (err, res, next) => {
  if (err.name === 'ValidationError') {
    next(new BadRequest('Переданы некорректные данные в методы создания карточки, пользователя, обновления аватара пользователя или профиля'))
  }

  if (err.name === 'CastError') {
    next(new BadRequest('Не удалось найти запрашиваемый ресурс'))
  }

  next(new Error(err))
}
