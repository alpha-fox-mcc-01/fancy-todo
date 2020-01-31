const Todo = require('../models/todo');
const User = require('../models/user');

class TodoController {
  static addTodo(req, res, next) {
    const {name, description, status, due_date} = req.body;
    console.log(req.currentUserId)
    const userId = req.currentUserId
    let createdTodo
    Todo.create({
      name,
      description,
      status,
      due_date,
      userId
    })
      .then(todo => {
        createdTodo = todo;
        console.log(todo)
        return Todo.find({
          userId
        })
      })
      .then(todos => {
        res.status(201).json({createdTodo, todos});
      })
      .catch(next)
  }

  static showAll(req, res, next) {
    Todo.find({
      userId: req.body.userId
    })
      .then(todos => {
        console.log(todos)
      })
      .catch(next)
  }

  static updateTodo(req, res, next) {
    const { name, description, status, due_date } = req.body;
    const userId = req.currentUserId;
    const { id } = req.params;
    Todo.findByIdAndUpdate(id, {
      name,
      description,
      status,
      due_date,
      userId
    }, { runValidators: true })
      .then(todo => {
        res.status(201).json(todo);
      })
      .catch(next);
  }

  static updateTodoDesc(req, res, next) {

  }

  static deleteTodo(req, res, next) {
    Todo.findByIdAndDelete(req.params.id)
      .then(result => {
        if(result) {
          res.status(200).json(result);
        } else {
          next({
            name: 'Not Found',
            errors: [ 'Todo not found' ],
            status: 404
          });
        }
      })
      .catch(next);
  }
};

module.exports = TodoController;