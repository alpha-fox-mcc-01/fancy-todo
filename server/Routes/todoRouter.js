const router = require('express').Router()
const Todo = require('../Controllers/todoController')

//CRUD BELUM
router.get('/', Todo.getAll)
router.post('/', Todo.addTodo)
router.delete('/', Todo.deleteTodo)
router.put('/', Todo.editTodo)

module.exports = router