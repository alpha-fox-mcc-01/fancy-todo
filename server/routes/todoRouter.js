const express = require('express')
const todoRouter = express.Router()
const todoController = require('../controllers/todoController')
const authenticated = require('../middlewares/authentication')
const authorized = require('../middlewares/authorization')

todoRouter.get('/', authenticated, todoController.find)
todoRouter.post('/', authenticated, todoController.add)
todoRouter.get('/:todoName', authenticated, authorized, todoController.findOne)
todoRouter.delete('/:id', authenticated, authorized, todoController.deleteOne)
todoRouter.put('/:id', authenticated, authorized, todoController.updateOne)

module.exports = todoRouter