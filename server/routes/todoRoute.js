const express = require('express')
const router = express.Router()

const controller = require('../controllers/todoController')

const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.use(authentication)

router.get('/', controller.getTodos)

router.post('/', controller.createTodo)

router.get('/:id', controller.getOneTodo)

router.put('/:id',authorization, controller.updateTodo)

router.delete('/:id', authorization, controller.removeTodo)

module.exports = router