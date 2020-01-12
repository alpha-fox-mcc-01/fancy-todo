const router = require('express').Router();
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')
const todoController = require('../controllers/todoController')

router.post('/', authentication, todoController.createTodo)
router.get('/', authentication, todoController.showTodo)
router.put('/:id', authentication, authorization, todoController.editTodo)
router.delete('/:id', authentication, authorization, todoController.deleteTodo)

module.exports = router