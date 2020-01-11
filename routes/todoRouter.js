const express = require('express')
const todoRouter = express.Router()
const todoController = require('../controllers/todoController')
const authenticated = require('../middlewares/authentication')

todoRouter.get('/', authenticated, todoController.find)
todoRouter.post('/', todoController.add)
todoRouter.get('/:todoName', todoController.findOne)
todoRouter.delete('/:id', todoController.deleteOne)
todoRouter.put('/:id', todoController.updateOne)

module.exports = todoRouter