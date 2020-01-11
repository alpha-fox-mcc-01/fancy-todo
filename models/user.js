const mongoose = require('mongoose')
const Schema = mongoose.Schema
const hash = require('../helpers/hash')

const userSchema = new Schema({
  email: String,
  password: String,
  googleLogin: Boolean
})

userSchema.pre('save', function () {
  this.password = hash(this.password)
  next()
})

const User = mongoose.model('User', userSchema)

module.exports = {
  add(user) {
    const { email, password } = user
    return User.create({ email, password })
  },

  findOne(email) {
    return User.findOne({ email })
  }
}