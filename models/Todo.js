const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const todoSchema = new mongoose.Schema(
	{
		title: String,
		description: String,
		priority: {
			type: Number,
			min: 1,
			max: 3
		},
		created: {
			type: Date,
			default: Date.now
		},
		isDone: Boolean,
		tags: [ {
			type: String
		} ],
		category: String,
		isShoppingList: {
			type: Boolean
		}
	}
)

const Todo = mongoose.model('Todo', todoSchema)
module.exports = Todo