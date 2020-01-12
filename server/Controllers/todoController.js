const Todo = require('../Models/todoModel')
const jwt = require('jsonwebtoken')


class TodoController{

  static addTodo(req, res){
    let token =  req.body.token
    let userId = jwt.verify(token, process.env.SECRET)
    let data = {
      name : req.body.name,
      description : req.body.description,
      start_date : new Date(),
      due_date : req.body.due_date,
      userId : userId.id
    }
    
    Todo
      .create(data)
      .then( todo => {
        res.status(200).json(todo)
      })
      .catch( err => {
        console.log(err);
        res.status(500).json(err)
      })
  }

  static getAll(req, res){
    let token = req.headers.token
    let userId = jwt.verify(token, process.env.SECRET)
    Todo
      .find({
        userId : userId.id
      })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err)
      })
  }

  static deleteTodo(req, res){
    let todoId = req.body.todoId
      Todo
        .remove({
          _id : todoId
        })
        .then(data =>{
          res.status(200).json(data)
        })
        .catch(err =>{
          console.log(err);
          res.status(500).json(err)
        })
  }

  //belum selesai
  static editTodo(req, res){
    let todoId = req.body.todoId
    Todo
      .findByIdAndUpdate({
        _id : todoId
      })
  }
}
module.exports = TodoController