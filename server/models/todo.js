const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var todoSchema = new mongoose.Schema({
  name: String,
  description: String,
  status: String,
  due_date: Date,
  userId: {
    type: Schema.Types.ObjectId, ref: 'User'
  }
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;