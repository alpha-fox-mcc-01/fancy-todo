const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const token = req.headers.user_token
  if (token) {
    try {
      const authenticated = jwt.verify(token, process.env.SECRET)
      if (authenticated) {
        req.activeUserId = authenticated._id
        next()
      }
    } catch (err) {
      res
        .status(401)
        .json({ msg: err.message })
    }
  } else res
    .status(403)
    .json({ msg: 'This page can only be accessed by registered users' })
}