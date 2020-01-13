const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

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
    const { email } = req.body
    const password = req.body.password || 'null'
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
            req.activeUserId = user._id
            console.log(req.activeUserId)
            console.log(user._id)
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
  },

  googleSignIn(req, res) {
    let email

    client.verifyIdToken({
      idToken: req.body.google_token,
      audience: process.env.CLIENT_ID
    })
      .then(ticket => {
        email = ticket.getPayload().email
        console.log(email)
        return User.findOne(email)
      })
      .then(userData => {
        console.log(userData)
        if (!userData) {
          return User.add({
            email,
            password: 'null',
            googleLogin: true
          })
        }
        else {
          return userData
        }
      })
      .then(user => {
        const token = jwt.sign({ _id: user._id }, process.env.SECRET)
        res.status(200).json({ token })
      })
      .catch(err => {
        console.log(err)
        res.status(500).json(err.message)
      })
  }
}