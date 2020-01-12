const express = require('express')
const router = express.Router()
const userRouter = require('./userRouter')
const todoRouter = require('./todoRouter')

router
    .use('/todo', todoRouter)
    .use('/user', userRouter)

module.exports = router