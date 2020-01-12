const express = require('express')
const router = express.Router()

router.use('/api/todo', require('./todoRouter'))
router.use('/user', require('./userRouter'))

module.exports = router