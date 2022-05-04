const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'Необходима авторизация' })
    // сгенерировать ошибку
  }

  const token = authorization.replace('Bearer ', '')

  let payload

  try {
    payload = jwt.verify(token, 'i9x8s70-s9s8ci-29xo')
  } catch (err) {
    return res.status(401).send({ message: 'Необходима авторизация' })
  }

  req.user = payload

  next()
}
