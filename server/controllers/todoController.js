const jwt = require('jsonwebtoken')
const Todo = require('../models/todo');

class TodoController {
  static createTodo(req, res) {
    let checkUser = jwt.verify(req.headers.token, process.env.SECRET_KEY)

    Todo.create({
      set_date: new Date(req.body.set_date),
      due_date: new Date(req.body.due_date),
      classification: req.body.classification, //Personal, Work, Shopping
      priority: req.body.priority, //Urgent, Important, Standard
      task: req.body.task,
      description: req.body.description,
      userId: checkUser.id
    })

      .then(newTodo => {
        res
          .status(200)
          .json({
            message : "Todo has been successfully created",
            data : newTodo
          })
      })

      .catch(err => {
        res
          .status(400)
          .json(err)
      })
  }

  static showTodo (req, res) {
    let checkUser = jwt.verify(req.headers.token, process.env.SECRET_KEY)

    Todo.find({
      userId : checkUser.id
    })

      .then(showAllTodo => {
        res
          .status(200)
          .json({
            message : "Showing all todos",
            data : showAllTodo
          })
      })

      .catch(err => {
        res
          .status(400)
          .json(err)
      })
  }

  static editTodo (req, res) {
    Todo
    .where({
      _id: req.params.id
    })
    .update({ 
      $set : req.body 
    })

      .then(editData => {
        res
          .status(200)
          .json({
            message : "Todo has been successfully edited",
            data : editData
          })
        })
  }

  static deleteTodo (req, res) {
    Todo.remove({
      _id: req.params.id
    }, err => {
      if (err) {
        res
          .status(500)
          .json("Internal Server Error")
      }
      else {
        res
          .status(200)
          .json("Todo has been successfully deleted")
      }
    })
  }
}

module.exports = TodoController