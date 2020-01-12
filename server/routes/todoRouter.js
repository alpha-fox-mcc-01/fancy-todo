const express = require('express')
const todoRouter = express.Router()
const todoController = require('../controllers/todoController')
const authenticated = require('../middlewares/authentication')
const authorized = require('../middlewares/authorization')

todoRouter.get('/', authenticated, todoController.find)
todoRouter.post('/', authenticated, todoController.add)
todoRouter.get('/:todoName', todoController.findOne)
todoRouter.delete('/:id', authorized, todoController.deleteOne)
todoRouter.put('/:id', authorized, todoController.updateOne)

module.exports = todoRouter