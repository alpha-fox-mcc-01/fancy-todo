const express = require('express')
const userRouter = express.Router()

userRouter.use('/', (req, res) => res.send('localhost/user'))

module.exports = userRouter