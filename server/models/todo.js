const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
    task: String,
    description: String,
    due_date: Date,
    UserId: Schema.Types.ObjectId
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo