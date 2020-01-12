const express = require('express');
const router = express.Router();
const TodoController = require('../controllers/TodoController');

router.get('/showTodos', TodoController.showAll);
router.post('/addTodo', TodoController.addTodo);

module.exports = router;