const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
  name : String,
  description : String,
  status : {
    type : Boolean,
    default : false
  },
  start_date : Date,
  due_date : Date,
  userId : String
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo