const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema(
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
		},
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'User'
		}
	}
)

const Todo = mongoose.model('Todo', todoSchema)
module.exports = Todo