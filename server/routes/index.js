const express = require('express')
const router = express.Router()
const todo = require('./todo')
const user = require('./user')

router.get('/', (req, res) => {
    res.send('ini home')
})
router.use('/todo', todo)
router.use('/user', user)
module.exports = router