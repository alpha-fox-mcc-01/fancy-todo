const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const todoSchema = new mongoose.Schema(
	{
		title: String,
		description: String,
		priority: {
			min: 1,
			max: 5
		},
		created: {
			type: Date,
			default: Date.now
		},
		isDone: Boolean
	}
)

const Todo = mongoose.model('Todo', todoSchema)
module.exports = Todo