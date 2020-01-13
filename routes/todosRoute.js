const router = require('express').Router()

const TodoController = require('../controllers/todoController')

const authorizeTodo = require('../middlewares/authorization-Todo')

// router.get('/', TodoController.getAllTodos)
router.post('/', TodoController.createTodo)
router.put('/', authorizeTodo, TodoController.updateTodo)
router.patch('/', authorizeTodo, TodoController.toggleDone)
router.delete('/', authorizeTodo, TodoController.removeTodo)

module.exports = router