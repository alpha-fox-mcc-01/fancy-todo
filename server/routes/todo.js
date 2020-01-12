const express = require('express')
const router = express.Router()
const todoController = require('../controllers/todoController')
const authentication = require('../middleware/authentication')

router.use(authentication)
router.get('/all', todoController.getList)
router.post('/', todoController.addTodo)
router.get('/:id', todoController.getTodoUser)
router.delete('/:id', todoController.deleteTodo)
router.patch('/:id', todoController.updateStatus)

module.exports = router