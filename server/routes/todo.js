const express = require('express')
const router = express.Router()
const todoController = require('../controllers/todoController')
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')
router.use(authentication)
router.get('/all', todoController.getList)

router.post('/', todoController.addTodo)
router.get('/:id', todoController.getTodoUser)
router.delete('/:id', authorization, todoController.deleteTodo)
router.patch('/:id', authorization, todoController.updateStatus)

module.exports = router