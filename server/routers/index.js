const express = require('express')
const router = express.Router()
const userRouter = require('../routers/users')
// const todoRouter = require('../routers/todos')

router.use('/users', userRouter)

module.exports = router