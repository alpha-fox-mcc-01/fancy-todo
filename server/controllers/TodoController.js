const Todo = require('../models/todo');
const User = require('../models/user');

class TodoController {
  static addTodo(req, res, next) {
    const {name, description, status, due_date, userId} = req.body;
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
        return User.findOneAndUpdate({
          _id: todo.userId
        }, {
          $push: {
            todoIds: ObjectId(todo._id)
          }
        }, {
          upsert: true
        })
      })
      .then(user => {
        console.log(user)
        res.status(201).json({createdTodo, user});
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

  }

  static updateTodoDesc(req, res, next) {

  }

  static deleteTodo(req, res, next) {

  }
}

module.exports = TodoController;