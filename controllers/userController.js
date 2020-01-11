const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')

module.exports = {
  register(req, res) {
    const { email, password } = req.body
    User.findOne(email)
      .then(found => {
        if (!found) {
          return User.add({ email, password })
        }
        else {
          res
            .status(409)
            .json({ msg: 'Email address is already used, please use another' })
        }
      })
      .then(user => {
        const token = jwt.sign({ _id: user._id }, process.env.SECRET)
        console.log(token)
        res
          .status(200)
          .json({ token })
      })
      .catch(err => {
        console.log(err)
        res
          .status(500)
          .json({ msg: err.message })
      })
  },

  login(req, res) {
    const { email, password } = req.body
    User.findOne(email)
      .then(user => {
        if (!user) {
          res
            .status(409)
            .json({ msg: 'Email isn\'t registered' })
        }
        else {
          const valid = bcryptjs.compareSync(password, user.password)
          if (valid) {
            const token = jwt.sign({ _id: user._id }, process.env.SECRET)
            console.log(token)
            req.headers.user_token = token
            res
              .status(200)
              .json({ token })
          } else {
            res
              .status(403)
              .json({ msg: 'Password invalid' })
          }
        }
      })
      .catch(err => {
        console.log(err)
        res
          .status(500)
          .json({ msg: err.message })
      })
  }
}