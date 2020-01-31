const express = require('express');
const router = express.Router();
const TodoController = require('../controllers/TodoController');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

router.use(authentication);
router.get('/showTodos', TodoController.showAll);
router.post('/addTodo', TodoController.addTodo);
router.put('/:id', authorization, TodoController.updateTodo);
router.delete('/:id', authorization, TodoController.deleteTodo);

module.exports = router;