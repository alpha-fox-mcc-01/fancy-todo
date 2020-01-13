const router = require('express').Router()

const usersRoute = require('./usersRoute')
const todosRoute = require('./todosRoute')

const authenticate = require('../middlewares/authenticate')

router.use('/users', usersRoute)
router.use('/todos', authenticate, todosRoute)

module.exports = router