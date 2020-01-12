const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
  name: String,
  description: String,
  status: Boolean,
  due_date: Date,
  UserId: { type: Schema.Types.ObjectId, ref: 'User' }
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = {
  add(todo, UserId) {
    // add(todo) { // sementara ga pake req.activeUserId
    const { name, description, status, due_date } = todo
    // const { name, description, status, due_date, UserId } = todo
    return Todo.create({ name, description, status, due_date, UserId })
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