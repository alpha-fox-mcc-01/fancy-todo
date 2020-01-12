const express = require('express');
const router = express.Router();
const TodoController = require('../controllers/TodoController');
const authentication = require('../middlewares/authentication');

router.use(authentication);
router.get('/showTodos', TodoController.showAll);
router.post('/addTodo', TodoController.addTodo);

module.exports = router;