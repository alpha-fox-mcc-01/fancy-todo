const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
    name: {
        type: String,
        minlength: 3
    },
    description: String,
    status: {
        type: String,
        enum: ['Done', 'Pending', 'On Progress', 'To Do']
    },
    budget_needed: {
        type: Number,
        default: 0
    },
    created_date: Date,
    due_date: Date,
    completed_date: Date,
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo