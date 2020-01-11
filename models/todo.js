const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
  name: String,
  description: String,
  status: Boolean,
  due_date: Date,
  UserId: Number
})

const Todo = mongoose.model('Todo', todoSchema)
module.exports = {
  add(todo) {
    const { name, description, status, due_date } = todo
    return Todo.create({ name, description, status, due_date })
  },

  find() {
    return Todo.find({})
  },

  findOne(params) {
    if (params.todoName) {
      return Todo.findOne({ name: params.todoName })
    }
    else if (params.id) return Todo.findOne({ _id: params.id })
  },

  deleteOne(id) {
    return Todo.deleteOne({ _id: id })
  },

  updateOne(id, todo) {
    const { name, description, status, due_date } = todo
    return Todo.updateOne({ _id: id }, { $set: { name, description, status, due_date } })
  }
}